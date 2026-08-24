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
  const [selectedOrderForHistory, setSelectedOrderForHistory] = useState(null);
  const [actionError, setActionError] = useState(null);

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

  const handleUpdateStatus = async (orderId, newStatus, comment = '') => {
    setUpdatingOrderId(orderId);
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, comment }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((ord) => (ord._id === orderId || ord.orderId === orderId ? data.order : ord))
        );
        if (selectedOrderForHistory && (selectedOrderForHistory._id === orderId || selectedOrderForHistory.orderId === orderId)) {
          setSelectedOrderForHistory(data.order);
        }
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

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-6">
        <div>
          <h1 className="font-cinzel text-2xl font-bold text-royal-blue-950 uppercase tracking-wider">
            Order Management & Verification
          </h1>
          <p className="text-gray-500 text-sm">
            Review customer transactions, approve pending acquisitions, and track status audit history.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-sand-50 hover:bg-sand-100 text-royal-blue-900 border border-gold-500/30 rounded-lg font-cinzel text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Orders
        </button>
      </div>

      {actionError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-sans flex items-center justify-between">
          <span>{actionError}</span>
          <button onClick={() => setActionError(null)} className="text-red-500 font-bold">✕</button>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 text-xs font-cinzel font-bold">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'Pending Approval', label: 'Pending Approval' },
            { id: 'Confirmed', label: 'Confirmed' },
            { id: 'Processing', label: 'Processing' },
            { id: 'Shipped', label: 'Shipped' },
            { id: 'Delivered', label: 'Delivered' },
            { id: 'Cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveStatus(tab.id)}
              className={`px-3 py-2 rounded-lg border transition-all ${
                activeStatus === tab.id
                  ? 'bg-royal-blue-900 text-gold-400 border-royal-blue-900 shadow-sm'
                  : 'bg-white text-gray-600 border-gold-500/20 hover:bg-sand-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <input
            type="text"
            placeholder="Search by Order ID, customer, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gold-500/30 text-xs font-sans focus:outline-none focus:border-gold-600 bg-sand-50/50"
          />
          <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Orders List / Table */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="font-cinzel text-xs font-bold text-royal-blue-900 tracking-wider">Loading Orders Catalog...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="py-16 text-center bg-sand-50/50 rounded-xl border border-dashed border-gold-500/30">
          <svg className="w-12 h-12 text-gold-600/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="font-cinzel text-base font-bold text-royal-blue-950">No orders found</p>
          <p className="text-xs text-gray-500 mt-1">There are no orders matching your current filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const badge = STATUS_BADGES[order.orderStatus] || STATUS_BADGES['Pending Approval'];
            const isUpdating = updatingOrderId === order._id || updatingOrderId === order.orderId;

            return (
              <div
                key={order._id || order.orderId}
                className="bg-white rounded-xl border border-gold-500/20 p-5 shadow-2xs hover:shadow-sm transition-all space-y-4 font-sans"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-cinzel font-bold text-base text-royal-blue-950">
                      #{order.orderId}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badge.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>
                      {new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700">
                  {/* Customer Info */}
                  <div className="space-y-1 bg-sand-50/50 p-3 rounded-lg border border-gold-500/10">
                    <p className="font-cinzel font-bold text-royal-blue-900 uppercase tracking-wider text-[10px]">
                      Customer & Delivery
                    </p>
                    <p className="font-semibold text-gray-900">{order.shippingAddress?.name || 'Guest'}</p>
                    <p className="text-gray-500">{order.userEmail || order.shippingAddress?.email}</p>
                    <p className="text-gray-500">{order.userPhone || order.shippingAddress?.phone}</p>
                    <p className="text-gray-600 mt-1">
                      {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zip}
                    </p>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-1 bg-sand-50/50 p-3 rounded-lg border border-gold-500/10">
                    <p className="font-cinzel font-bold text-royal-blue-900 uppercase tracking-wider text-[10px]">
                      Payment & Total
                    </p>
                    <div className="text-base font-cinzel font-bold text-royal-blue-950">
                      Rs. {Number(order.total).toLocaleString('en-IN')}
                    </div>
                    <p className="text-gray-600">
                      Status: <span className="font-bold text-emerald-700">{order.paymentInfo?.paymentStatus || 'Paid'}</span>
                    </p>
                    <p className="text-gray-500 font-mono text-[10px] break-all">
                      Razorpay ID: {order.paymentInfo?.razorpayPaymentId || 'N/A'}
                    </p>
                    <p className="text-gray-500 font-mono text-[10px] break-all">
                      Order ID: {order.paymentInfo?.razorpayOrderId || 'N/A'}
                    </p>
                  </div>

                  {/* Items Summary */}
                  <div className="space-y-2 bg-sand-50/50 p-3 rounded-lg border border-gold-500/10">
                    <p className="font-cinzel font-bold text-royal-blue-900 uppercase tracking-wider text-[10px]">
                      Ordered Items ({order.items?.length || 0})
                    </p>
                    <div className="max-h-24 overflow-y-auto space-y-1.5 pr-1 divide-y divide-gray-100">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 pt-1 first:pt-0">
                          {item.img && (
                            <div className="relative w-7 h-7 flex-shrink-0 rounded border border-gold-500/20 overflow-hidden">
                              <Image src={item.img} alt={item.name} fill className="object-cover" />
                            </div>
                          )}
                          <div className="flex-grow min-w-0">
                            <p className="truncate font-medium text-gray-800 text-[11px]">{item.name}</p>
                            <p className="text-gray-400 text-[10px]">Qty: {item.quantity} × Rs. {item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions & Status Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-gray-100">
                  {/* View Status Audit History */}
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForHistory(order)}
                    className="text-xs text-gold-700 hover:text-royal-blue-900 font-cinzel font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Audit History ({order.statusHistory?.length || 0})
                  </button>

                  {/* Status Action Buttons */}
                  <div className="flex items-center gap-2">
                    {order.orderStatus === 'Pending Approval' && (
                      <button
                        onClick={() => handleUpdateStatus(order.orderId || order._id, 'Confirmed', 'Admin verified and confirmed order')}
                        disabled={isUpdating}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-cinzel text-xs font-bold tracking-wider uppercase transition-all shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {isUpdating ? 'Updating...' : '✓ Confirm Order'}
                      </button>
                    )}

                    <select
                      value={order.orderStatus}
                      disabled={isUpdating}
                      onChange={(e) => handleUpdateStatus(order.orderId || order._id, e.target.value)}
                      className="px-3 py-1.5 bg-white border border-gold-500/30 rounded-lg text-xs font-cinzel font-bold text-royal-blue-900 focus:outline-none focus:border-gold-600 uppercase tracking-wide cursor-pointer disabled:opacity-50"
                    >
                      <option value="Pending Approval">Pending Approval</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Audit History Timeline Modal */}
      {selectedOrderForHistory && (
        <div className="fixed inset-0 z-50 bg-royal-blue-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gold-500/20 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-scale-in max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-start border-b border-gold-500/10 pb-4">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-royal-blue-950">
                  Status Audit Trail
                </h3>
                <p className="text-xs text-gray-500">
                  Order #{selectedOrderForHistory.orderId} • Log of who changed status and when
                </p>
              </div>
              <button
                onClick={() => setSelectedOrderForHistory(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Timeline */}
            <div className="overflow-y-auto flex-grow space-y-4 pr-1">
              {(!selectedOrderForHistory.statusHistory || selectedOrderForHistory.statusHistory.length === 0) ? (
                <p className="text-xs text-gray-400 italic text-center py-6">No status transitions recorded yet.</p>
              ) : (
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gold-200">
                  {selectedOrderForHistory.statusHistory.map((entry, idx) => (
                    <div key={idx} className="relative space-y-1">
                      {/* Timeline Node */}
                      <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-gold-500 border-2 border-white shadow-xs" />
                      
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel text-xs font-bold text-royal-blue-950 tracking-wide uppercase">
                          {entry.status}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(entry.timestamp).toLocaleString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <p className="text-[11px] text-gray-600 font-sans">
                        Changed by: <span className="font-semibold text-royal-blue-900">{entry.changedBy?.name || 'Administrator'}</span>
                        {entry.changedBy?.email && <span className="text-gray-400"> ({entry.changedBy.email})</span>}
                        {entry.changedBy?.role && <span className="ml-1.5 text-[9px] bg-royal-blue-50 text-royal-blue-900 px-1.5 py-0.5 rounded uppercase font-bold">{entry.changedBy.role}</span>}
                      </p>

                      {entry.comment && (
                        <p className="text-[11px] bg-sand-50 p-2 rounded border border-gold-500/10 text-gray-600 italic">
                          "{entry.comment}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedOrderForHistory(null)}
                className="px-6 py-2 bg-royal-blue-900 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest uppercase hover:bg-gold-600 transition-colors"
              >
                Close Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
