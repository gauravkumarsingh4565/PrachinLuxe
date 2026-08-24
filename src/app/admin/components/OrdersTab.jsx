"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const STATUS_BADGES = {
  'Pending Approval': {
    bg: 'bg-amber-50 text-amber-800 border-amber-300',
    dot: 'bg-amber-500',
  },
  'Confirmed': {
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    dot: 'bg-emerald-500',
  },
  'Processing': {
    bg: 'bg-blue-50 text-blue-800 border-blue-300',
    dot: 'bg-blue-500',
  },
  'Shipped': {
    bg: 'bg-indigo-50 text-indigo-800 border-indigo-300',
    dot: 'bg-indigo-500',
  },
  'Delivered': {
    bg: 'bg-purple-50 text-purple-800 border-purple-300',
    dot: 'bg-purple-500',
  },
  'Cancelled': {
    bg: 'bg-rose-50 text-rose-800 border-rose-300',
    dot: 'bg-rose-500',
  },
};

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [actionError, setActionError] = useState(null);
  const [statusComment, setStatusComment] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setActionError(null);
    try {
      const url = activeStatus === 'all' 
        ? '/api/admin/orders' 
        : `/api/admin/orders?status=${encodeURIComponent(activeStatus)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setActionError(data.error || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
      setActionError('Network error while retrieving orders');
    } finally {
      setLoading(false);
    }
  }, [activeStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setSelectedStatus(order.orderStatus);
    setStatusComment('');
    setSaveSuccessMessage(null);
    setActionError(null);
  };

  const handleUpdateStatus = async (orderId, newStatus, customComment = '') => {
    setUpdatingOrderId(orderId);
    setActionError(null);
    setSaveSuccessMessage(null);
    const commentToSend = (customComment && customComment.trim()) 
      ? customComment.trim() 
      : (statusComment && statusComment.trim()) 
      ? statusComment.trim() 
      : `Status updated to ${newStatus} by Administrator`;

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, comment: commentToSend }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((ord) => (ord._id === orderId || ord.orderId === orderId ? data.order : ord))
        );
        if (selectedOrder && (selectedOrder._id === orderId || selectedOrder.orderId === orderId)) {
          setSelectedOrder(data.order);
          setSelectedStatus(data.order.orderStatus);
        }
        setStatusComment('');
        setSaveSuccessMessage(`Status updated to '${newStatus}' successfully!`);
      } else {
        setActionError(data.error || 'Failed to update order status');
      }
    } catch (err) {
      console.error('Status update failed:', err);
      setActionError('Failed to change status. Please check your connection.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleSaveModalStatus = () => {
    if (!selectedOrder) return;
    const orderId = selectedOrder.orderId || selectedOrder._id;
    const finalComment = statusComment.trim() ? statusComment.trim() : `Status updated to ${selectedStatus} by Administrator`;
    handleUpdateStatus(orderId, selectedStatus, finalComment);
  };

  const filteredOrders = orders.filter((order) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const orderIdMatch = order.orderId?.toLowerCase().includes(q);
    const nameMatch = order.shippingAddress?.name?.toLowerCase().includes(q);
    const emailMatch = (order.userEmail || order.shippingAddress?.email)?.toLowerCase().includes(q);
    const phoneMatch = (order.userPhone || order.shippingAddress?.phone)?.toLowerCase().includes(q);
    const paymentIdMatch = order.paymentInfo?.razorpayPaymentId?.toLowerCase().includes(q);
    return orderIdMatch || nameMatch || emailMatch || phoneMatch || paymentIdMatch;
  });

  const getStatusCount = (status) => {
    if (status === 'all') return orders.length;
    return orders.filter(o => o.orderStatus === status).length;
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-6">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-royal-blue-950 uppercase tracking-wider">
            Order Master & Verification
          </h1>
          <p className="text-gray-500 text-sm">
            Review customer transactions in real-time, approve pending orders, and inspect audit trails.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-sand-50 hover:bg-sand-100 text-royal-blue-900 border border-gold-500/30 rounded-lg font-cinzel text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Data
        </button>
      </div>

      {actionError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-sans flex items-center justify-between animate-fade-in">
          <span>{actionError}</span>
          <button onClick={() => setActionError(null)} className="text-red-500 font-bold">✕</button>
        </div>
      )}

      {/* Filter Dropdown & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-cinzel font-bold text-royal-blue-950 uppercase tracking-wider flex-shrink-0">
            Filter Status:
          </label>
          <div className="relative min-w-[220px]">
            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="w-full appearance-none px-4 py-2.5 pr-9 bg-white border border-gold-500/30 rounded-lg text-xs font-cinzel font-bold text-royal-blue-900 focus:outline-none focus:border-gold-600 uppercase tracking-wide cursor-pointer shadow-2xs"
            >
              {[
                { id: 'all', label: 'All Orders' },
                { id: 'Pending Approval', label: 'Pending Approval' },
                { id: 'Confirmed', label: 'Confirmed' },
                { id: 'Processing', label: 'Processing' },
                { id: 'Shipped', label: 'Shipped' },
                { id: 'Delivered', label: 'Delivered' },
                { id: 'Cancelled', label: 'Cancelled' },
              ].map((opt) => {
                const count = getStatusCount(opt.id);
                return (
                  <option key={opt.id} value={opt.id}>
                    {opt.label} ({count})
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Field */}
        <div className="relative min-w-[280px]">
          <input
            type="text"
            placeholder="Search by Order ID, customer, payment ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gold-500/30 text-xs font-sans focus:outline-none focus:border-gold-600 bg-sand-50/50"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="py-20 text-center bg-white rounded-xl border border-gold-500/10">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="font-cinzel text-xs font-bold text-royal-blue-900 tracking-wider">
            Loading Orders Database...
          </p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="py-20 text-center bg-sand-50/50 rounded-xl border border-dashed border-gold-500/30">
          <svg className="w-12 h-12 text-gold-600/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="font-cinzel text-base font-bold text-royal-blue-950">No orders found</p>
          <p className="text-xs text-gray-500 mt-1">No transactions match your current status or search filter.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gold-500/20 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs">
              <thead>
                <tr className="bg-stone-50/90 border-b border-gold-500/15 text-royal-blue-950 font-cinzel uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-bold">Order ID</th>
                  <th className="py-3 px-4 font-bold">Date & Time</th>
                  <th className="py-3 px-4 font-bold">Customer</th>
                  <th className="py-3 px-4 font-bold">Location</th>
                  <th className="py-3 px-4 font-bold">Items</th>
                  <th className="py-3 px-4 font-bold">Total Amount</th>
                  <th className="py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const badge = STATUS_BADGES[order.orderStatus] || STATUS_BADGES['Pending Approval'];
                  const isUpdating = updatingOrderId === order._id || updatingOrderId === order.orderId;
                  const items = order.items || [];
                  const totalUnits = items.reduce((sum, i) => sum + (i.quantity || 1), 0);

                  return (
                    <tr
                      key={order._id || order.orderId}
                      onClick={() => handleOpenOrder(order)}
                      className="hover:bg-sand-50/60 transition-colors cursor-pointer"
                    >
                      {/* Order ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-royal-blue-950 text-[12px]">
                        #{order.orderId}
                      </td>

                      {/* Date & Time */}
                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                        {new Date(order.createdAt || Date.now()).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-gray-900">
                          {order.shippingAddress?.name || 'Customer'}
                        </div>
                        <div className="text-gray-400 text-[11px] font-mono">
                          {order.userPhone || order.shippingAddress?.phone || order.userEmail || ''}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                        {order.shippingAddress?.city ? `${order.shippingAddress.city}, ${order.shippingAddress.state}` : '—'}
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4 text-gray-700 whitespace-nowrap">
                        <span className="font-semibold">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
                        <span className="text-gray-400 text-[11px]"> ({totalUnits} pcs)</span>
                      </td>

                      {/* Total Amount */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-cinzel font-bold text-royal-blue-950 text-sm">
                          Rs. {Number(order.total).toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-semibold uppercase">
                          {order.paymentInfo?.paymentStatus || 'Paid'}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {order.orderStatus === 'Pending Approval' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateStatus(order.orderId || order._id, 'Confirmed')}
                              disabled={isUpdating}
                              className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-cinzel text-[10px] font-bold tracking-wider uppercase transition-all disabled:opacity-50"
                            >
                              {isUpdating ? '...' : '✓ Confirm'}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleOpenOrder(order)}
                            className="px-2.5 py-1 bg-white hover:bg-sand-100 text-royal-blue-900 border border-gold-500/30 rounded font-cinzel text-[10px] font-bold tracking-wider uppercase transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= ORDER DETAILS POPUP MODAL ================= */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-royal-blue-950/65 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gold-500/25 shadow-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 animate-scale-in max-h-[90vh] flex flex-col font-sans">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-gold-500/20 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-cinzel text-xl font-bold text-royal-blue-950">
                    Order #{selectedOrder.orderId}
                  </h2>
                  {(() => {
                    const badge = STATUS_BADGES[selectedOrder.orderStatus] || STATUS_BADGES['Pending Approval'];
                    return (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                        {selectedOrder.orderStatus}
                      </span>
                    );
                  })()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Placed on {new Date(selectedOrder.createdAt || Date.now()).toLocaleString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1 leading-none"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="overflow-y-auto flex-grow space-y-6 pr-1 divide-y divide-gray-100">
              
              {/* Status Update Control Section with Save Button */}
              <div className="bg-sand-50/80 p-4 rounded-xl border border-gold-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-cinzel font-bold text-royal-blue-950 text-xs uppercase tracking-wider">
                    Update Order Status
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">Changes apply on clicking Save</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1 flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase font-cinzel">Select Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      disabled={updatingOrderId === (selectedOrder._id || selectedOrder.orderId)}
                      className="px-3 py-2 bg-white border border-gold-500/30 rounded-lg text-xs font-cinzel font-bold text-royal-blue-900 focus:outline-none focus:border-gold-600 uppercase tracking-wide cursor-pointer"
                    >
                      <option value="Pending Approval">Pending Approval</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase font-cinzel">
                      Custom Note / Reason (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder={`e.g. Verified crafting & packaging`}
                      value={statusComment}
                      onChange={(e) => setStatusComment(e.target.value)}
                      className="px-3 py-2 bg-white border border-gold-500/30 rounded-lg text-xs focus:outline-none focus:border-gold-600 font-sans"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-gold-500/10">
                  <div>
                    {saveSuccessMessage ? (
                      <span className="text-emerald-700 font-semibold text-xs animate-fade-in flex items-center gap-1">
                        ✓ {saveSuccessMessage}
                      </span>
                    ) : (
                      <p className="text-[10px] text-gray-400 italic">
                        {statusComment.trim() 
                          ? `Will save with note: "${statusComment.trim()}"` 
                          : `Default note: "Status updated to ${selectedStatus || selectedOrder.orderStatus} by Administrator"`}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveModalStatus}
                    disabled={updatingOrderId === (selectedOrder._id || selectedOrder.orderId)}
                    className="px-5 py-2 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest uppercase transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-50 self-end sm:self-auto"
                  >
                    {updatingOrderId === (selectedOrder._id || selectedOrder.orderId) ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Status Change'
                    )}
                  </button>
                </div>
              </div>

              {/* Customer Account & Shipping & Payment 3-Column / 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {/* Registered User Profile Info */}
                <div className="bg-sand-50/50 p-4 rounded-xl border border-gold-500/15 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-gold-500/10 pb-1.5">
                    <h3 className="font-cinzel font-bold text-royal-blue-900 uppercase tracking-wider text-[11px]">
                      Registered User Profile
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      selectedOrder.userId 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedOrder.userId ? 'Registered User' : 'Direct / Guest'}
                    </span>
                  </div>

                  {selectedOrder.userId ? (
                    <div className="space-y-1.5 pt-0.5">
                      <div className="flex items-center gap-2">
                        {selectedOrder.userId.image && (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold-500/30 flex-shrink-0">
                            <Image src={selectedOrder.userId.image} alt={selectedOrder.userId.name || 'User'} fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 text-[13px]">{selectedOrder.userId.name || 'Prachin Member'}</p>
                          <span className="text-[10px] text-gold-700 uppercase font-bold">{selectedOrder.userId.role || 'NORMALUSER'}</span>
                        </div>
                      </div>
                      <p className="text-gray-600"><span className="text-gray-400">Account Email:</span> {selectedOrder.userId.email}</p>
                      {selectedOrder.userId.phoneNumber && (
                        <p className="text-gray-600"><span className="text-gray-400">Account Phone:</span> {selectedOrder.userId.phoneNumber}</p>
                      )}
                      <p className="text-gray-400 text-[10px] font-mono">
                        User ID: {selectedOrder.userId._id || selectedOrder.userId}
                      </p>
                      {selectedOrder.userId.createdAt && (
                        <p className="text-gray-400 text-[10px]">
                          Member Since: {new Date(selectedOrder.userId.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1 pt-1 text-gray-500">
                      <p className="font-semibold text-gray-800">{selectedOrder.shippingAddress?.name || 'Customer'}</p>
                      <p><span className="text-gray-400">Email:</span> {selectedOrder.userEmail || selectedOrder.shippingAddress?.email || 'N/A'}</p>
                      <p><span className="text-gray-400">Phone:</span> {selectedOrder.userPhone || selectedOrder.shippingAddress?.phone || 'N/A'}</p>
                      <p className="text-[10px] text-gray-400 italic mt-1">Direct checkout (no registered userId linked).</p>
                    </div>
                  )}
                </div>

                {/* Shipping Destination */}
                <div className="bg-sand-50/50 p-4 rounded-xl border border-gold-500/15 space-y-1.5 text-xs">
                  <div className="border-b border-gold-500/10 pb-1.5">
                    <h3 className="font-cinzel font-bold text-royal-blue-900 uppercase tracking-wider text-[11px]">
                      Shipping & Delivery Destination
                    </h3>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">{selectedOrder.shippingAddress?.name || 'Customer'}</p>
                  <p className="text-gray-600"><span className="text-gray-400">Contact:</span> {selectedOrder.shippingAddress?.phone}</p>
                  <p className="text-gray-600"><span className="text-gray-400">Email:</span> {selectedOrder.shippingAddress?.email}</p>
                  <p className="text-gray-700 mt-1.5 bg-white p-2.5 rounded border border-gold-500/10 leading-relaxed text-[11px]">
                    {selectedOrder.shippingAddress?.street},<br />
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.zip}
                  </p>
                </div>

                {/* Razorpay Financials */}
                <div className="bg-sand-50/50 p-4 rounded-xl border border-gold-500/15 space-y-2 text-xs md:col-span-2">
                  <div className="flex items-center justify-between border-b border-gold-500/10 pb-1.5">
                    <h3 className="font-cinzel font-bold text-royal-blue-900 uppercase tracking-wider text-[11px]">
                      Payment & Razorpay Settlement
                    </h3>
                    <span className="font-cinzel font-bold text-royal-blue-950 text-base">
                      Total: Rs. {Number(selectedOrder.total).toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="bg-white p-2.5 rounded border border-gold-500/10">
                      <span className="text-[10px] text-gray-400 block uppercase">Payment Status</span>
                      <span className="font-bold text-emerald-700 uppercase text-xs">
                        {selectedOrder.paymentInfo?.paymentStatus || 'Paid'} (Online)
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded border border-gold-500/10 sm:col-span-2">
                      <span className="text-[10px] text-gray-400 block uppercase">Razorpay Transaction ID</span>
                      <span className="font-mono text-gray-800 text-[11px] font-medium break-all">
                        {selectedOrder.paymentInfo?.razorpayPaymentId || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items List Breakdown */}
              <div className="pt-4 space-y-3">
                <h3 className="font-cinzel font-bold text-royal-blue-900 uppercase tracking-wider text-xs">
                  Purchased Pieces ({selectedOrder.items?.length || 0})
                </h3>
                <div className="divide-y divide-gray-100 border border-gold-500/10 rounded-xl overflow-hidden bg-white">
                  {selectedOrder.items?.map((item, idx) => {
                    const priceNum = typeof item.price === 'number' ? item.price : parseFloat(String(item.price || 0).replace(/,/g, ''));
                    const itemTotal = priceNum * (item.quantity || 1);
                    return (
                      <div key={idx} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          {item.img && (
                            <div className="relative w-12 h-12 rounded-lg border border-gold-500/20 overflow-hidden flex-shrink-0 bg-sand-50">
                              <Image src={item.img} alt={item.name} fill className="object-cover" />
                            </div>
                          )}
                          <div>
                            <span className="text-[9px] font-bold text-gold-600 uppercase tracking-widest block">
                              {item.category}
                            </span>
                            <p className="font-cinzel font-bold text-royal-blue-950 text-sm">{item.name}</p>
                            <p className="text-gray-400 font-mono text-[10px]">ID: {item.productId || 'N/A'} • Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-cinzel font-bold text-royal-blue-900 text-sm">
                            Rs. {itemTotal.toLocaleString('en-IN')}
                          </span>
                          <span className="text-gray-400 text-[10px] block">
                            (Rs. {priceNum.toLocaleString('en-IN')} each)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Audit Trail & Status History */}
              <div className="pt-4 space-y-3">
                <h3 className="font-cinzel font-bold text-royal-blue-900 uppercase tracking-wider text-xs">
                  Status Transition Audit Trail ({selectedOrder.statusHistory?.length || 0})
                </h3>
                
                {(!selectedOrder.statusHistory || selectedOrder.statusHistory.length === 0) ? (
                  <p className="text-xs text-gray-400 italic bg-sand-50 p-3 rounded-lg text-center">
                    No status history recorded yet.
                  </p>
                ) : (
                  <div className="bg-sand-50/50 p-4 rounded-xl border border-gold-500/10 space-y-3">
                    <div className="relative pl-5 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gold-300">
                      {selectedOrder.statusHistory.map((entry, idx) => (
                        <div key={idx} className="relative space-y-0.5 text-xs">
                          <div className="absolute -left-5 top-1 w-3 h-3 rounded-full bg-gold-600 border-2 border-white shadow-2xs" />
                          <div className="flex items-center justify-between">
                            <span className="font-cinzel font-bold text-royal-blue-950 tracking-wide uppercase text-[11px]">
                              {entry.status}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {new Date(entry.timestamp).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-600">
                            By: <span className="font-semibold text-royal-blue-900">{entry.changedBy?.name || 'Admin'}</span>
                            {entry.changedBy?.email && <span className="text-gray-400"> ({entry.changedBy.email})</span>}
                            {entry.changedBy?.role && (
                              <span className="ml-1.5 text-[9px] bg-royal-blue-50 text-royal-blue-900 px-1.5 py-0.2 rounded font-bold uppercase">
                                {entry.changedBy.role}
                              </span>
                            )}
                          </p>
                          {entry.comment && (
                            <p className="text-[11px] text-gray-500 italic bg-white p-2 rounded border border-gold-500/10 mt-1">
                              "{entry.comment}"
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-[11px] text-gray-400 font-mono">
                DB Reference: {selectedOrder._id}
              </span>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-6 py-2.5 bg-royal-blue-900 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest uppercase hover:bg-gold-600 transition-colors shadow-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
