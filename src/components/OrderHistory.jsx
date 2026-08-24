"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, selectOrders, setOrders as setOrdersAction } from '@/redux/slices/authSlice';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const STATUS_CONFIG = {
  'Pending Approval': {
    bg: 'bg-amber-50 text-amber-800 border-amber-300',
    dot: 'bg-amber-500',
    label: 'Awaiting Admin Confirmation',
    stepIndex: 0,
  },
  'Confirmed': {
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    dot: 'bg-emerald-500',
    label: 'Order Confirmed',
    stepIndex: 1,
  },
  'Processing': {
    bg: 'bg-blue-50 text-blue-800 border-blue-300',
    dot: 'bg-blue-500',
    label: 'Crafting & Packaging',
    stepIndex: 2,
  },
  'Shipped': {
    bg: 'bg-indigo-50 text-indigo-800 border-indigo-300',
    dot: 'bg-indigo-500',
    label: 'In Transit with Sequel Logistics',
    stepIndex: 3,
  },
  'Delivered': {
    bg: 'bg-purple-50 text-purple-800 border-purple-300',
    dot: 'bg-purple-500',
    label: 'Delivered',
    stepIndex: 4,
  },
  'Cancelled': {
    bg: 'bg-rose-50 text-rose-800 border-rose-300',
    dot: 'bg-rose-500',
    label: 'Cancelled',
    stepIndex: -1,
  },
};

export default function OrderHistory() {
  const dispatch = useDispatch();
  const phoneUser = useSelector(selectUser);
  const reduxOrders = useSelector(selectOrders);
  const { data: session } = useSession();
  const currentUser = phoneUser || session?.user;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [selectedOrderTracking, setSelectedOrderTracking] = useState(null);
  const [selectedOrderHistory, setSelectedOrderHistory] = useState(null);

  const fetchUserOrders = useCallback(async () => {
    if (!currentUser?.email && !currentUser?.id && !currentUser?._id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const email = currentUser?.email || '';
      const userId = currentUser?.id || currentUser?._id || '';
      const params = new URLSearchParams();
      if (email) params.set('email', email);
      if (userId) params.set('userId', userId);

      const res = await fetch(`/api/user/orders?${params.toString()}`);
      const data = await res.json();
      if (data.success && data.orders) {
        dispatch(setOrdersAction(data.orders));
      }
    } catch (err) {
      console.error('Error fetching user orders:', err);
    } finally {
      setLoading(false);
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gold-500/10 p-12 text-center shadow-sm font-cormorant max-w-[750px] mx-auto space-y-4">
        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="font-cinzel text-sm font-bold text-royal-blue-900 tracking-wider">
          Retrieving Your Heritage Acquisitions...
        </p>
      </div>
    );
  }

  if (!reduxOrders || reduxOrders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gold-500/10 p-8 sm:p-16 text-center shadow-sm font-cormorant max-w-[650px] mx-auto">
        <div className="w-20 h-20 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h2 className="font-cinzel text-2xl font-bold text-royal-blue-950 tracking-wider mb-3">No Orders Found</h2>
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm mx-auto">
          You haven't purchased any royal curations yet. Explore our Payals, Earrings, or Necklaces collections.
        </p>
        <Link 
          href="/handmade"
          className="inline-block px-8 py-3.5 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 font-cormorant">
      {/* Title */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-1">
            My Acquisitions ({reduxOrders.length})
          </h2>
          <p className="text-xs text-gray-500">Live order status, tracking, and purchase receipts from our vault.</p>
        </div>
        <button
          onClick={fetchUserOrders}
          className="text-xs font-cinzel font-bold text-gold-700 hover:text-royal-blue-900 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      <div className="h-px bg-gold-200/50 w-full" />

      {/* Orders List */}
      <div className="space-y-6">
        {reduxOrders.map((order) => {
          const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Pending Approval'];
          const items = order.items || [];

          return (
            <div key={order.id || order._id} className="bg-white rounded-2xl border border-gold-500/10 shadow-sm overflow-hidden flex flex-col">
              {/* Order Header Summary */}
              <div className="p-4 sm:p-6 bg-stone-50/70 border-b border-gold-500/10 flex flex-wrap items-center justify-between gap-4 font-sans text-xs font-semibold text-gray-500">
                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400">Order ID</span>
                  <span className="text-royal-blue-950 font-bold font-mono text-sm tracking-wider">{order.id}</span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400">Date Placed</span>
                  <span className="text-royal-blue-900 font-bold text-sm">{order.date}</span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400">Payment</span>
                  <span className="text-royal-blue-900 font-bold text-sm font-mono">
                    {order.paymentId ? `Razorpay (${order.paymentId.slice(-6)})` : 'Paid Online'}
                  </span>
                </div>

                <div className="space-y-1 sm:text-right">
                  <span className="block text-[10px] uppercase tracking-wider text-gray-400">Total Paid</span>
                  <span className="text-royal-blue-900 font-black text-sm sm:text-base font-cinzel">
                    Rs. {Number(order.total).toLocaleString('en-IN')}
                  </span>
                </div>

                <div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${cfg.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items Details */}
              <div className="divide-y divide-gray-100 px-4 sm:px-6 flex-grow">
                {items.map((item, idx) => (
                  <div key={idx} className="py-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div 
                        onClick={() => item.product?.id && router.push(`/product/${item.product.id}`)}
                        className="relative w-16 h-16 bg-sand-50 rounded-lg overflow-hidden border border-gold-500/10 p-1 cursor-pointer flex-shrink-0"
                      >
                        {item.product?.img && (
                          <Image 
                            src={item.product.img} 
                            alt={item.product?.name || 'Piece'} 
                            fill 
                            sizes="64px"
                            className="object-cover rounded" 
                          />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest block">
                          {item.product?.category}
                        </span>
                        <h4 
                          onClick={() => item.product?.id && router.push(`/product/${item.product.id}`)}
                          className="font-cinzel text-sm sm:text-base font-bold text-royal-blue-950 hover:text-gold-600 cursor-pointer transition-colors leading-tight line-clamp-1"
                        >
                          {item.product?.name}
                        </h4>
                        <p className="text-xs text-gray-400 font-semibold uppercase font-mono">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-royal-blue-900 font-bold font-sans text-sm sm:text-base">
                      Rs. {parseFloat(String(item.product?.price || 0).replace(/,/g, '')).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Progress / Shipment Tracker */}
              {selectedOrderTracking === order.id && (
                <div className="p-5 sm:p-6 bg-sand-50 border-t border-gold-500/15 flex flex-col gap-4 font-sans text-xs animate-fade-in">
                  <span className="font-cinzel font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest block mb-2">
                    Heritage Order Timeline
                  </span>

                  <div className="flex justify-between items-center relative w-full max-w-[550px] mx-auto py-2">
                    {/* Progress Bar Background */}
                    <div className="absolute top-1/2 left-0 h-0.5 bg-gold-200 w-full -translate-y-1/2" />
                    <div 
                      className="absolute top-1/2 left-0 h-0.5 bg-gold-500 -translate-y-1/2 transition-all duration-1000" 
                      style={{ 
                        width: order.status === 'Delivered' 
                          ? '100%' 
                          : order.status === 'Shipped' 
                          ? '75%' 
                          : order.status === 'Processing' 
                          ? '50%' 
                          : order.status === 'Confirmed' 
                          ? '25%' 
                          : '5%' 
                      }} 
                    />

                    {/* Step Indicators */}
                    {[
                      { label: 'Placed', done: true },
                      { label: 'Confirmed', done: ['Confirmed', 'Processing', 'Shipped', 'Delivered'].includes(order.status) },
                      { label: 'Crafting', done: ['Processing', 'Shipped', 'Delivered'].includes(order.status) },
                      { label: 'Shipped', done: ['Shipped', 'Delivered'].includes(order.status) },
                      { label: 'Delivered', done: order.status === 'Delivered' },
                    ].map((step, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 relative z-10">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black ${
                          step.done 
                            ? 'bg-gold-500 border-gold-600 text-royal-blue-950 font-bold' 
                            : 'bg-white border-gold-200 text-gray-400'
                        }`}>
                          {step.done ? '✓' : idx + 1}
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${step.done ? 'text-gold-700' : 'text-gray-400'}`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-gold-500/10 text-center font-sans text-[11px] text-gray-600 mt-2">
                    {order.status === 'Pending Approval' ? (
                      <span>⏳ Your payment was received. Our master curator is currently verifying your order details for dispatch preparation.</span>
                    ) : order.status === 'Confirmed' ? (
                      <span>✓ Order confirmed by curator. Items are entering our specialized polishing and hallmark inspection.</span>
                    ) : order.status === 'Shipped' ? (
                      <span>🚚 Insured Express Shipment via <span className="font-bold text-royal-blue-950">Sequel Logistics</span>. Signature required upon delivery.</span>
                    ) : (
                      <span>✨ Delivered to your registered shipping destination.</span>
                    )}
                  </div>
                </div>
              )}

              {/* Status Audit History Accordion */}
              {selectedOrderHistory === order.id && order.statusHistory && order.statusHistory.length > 0 && (
                <div className="p-5 sm:p-6 bg-stone-50 border-t border-gold-500/15 space-y-3 font-sans text-xs animate-fade-in">
                  <span className="font-cinzel font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest block">
                    Curator Activity & Verification Log
                  </span>
                  <div className="space-y-2">
                    {order.statusHistory.map((hist, hIdx) => (
                      <div key={hIdx} className="flex items-start justify-between bg-white p-3 rounded-lg border border-gold-500/10 text-gray-600">
                        <div>
                          <p className="font-semibold text-royal-blue-950 font-cinzel text-xs">
                            {hist.status}
                          </p>
                          {hist.comment && (
                            <p className="text-[11px] text-gray-500 italic mt-0.5">"{hist.comment}"</p>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {new Date(hist.timestamp).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Triggers */}
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-stone-50/50 flex flex-wrap gap-3 justify-end">
                {order.statusHistory && order.statusHistory.length > 0 && (
                  <button 
                    onClick={() => setSelectedOrderHistory(selectedOrderHistory === order.id ? null : order.id)}
                    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-cinzel text-[10px] font-bold tracking-widest hover:bg-gray-50 transition-all uppercase"
                  >
                    {selectedOrderHistory === order.id ? 'Hide Log' : 'Status Log'}
                  </button>
                )}
                <button 
                  onClick={() => setSelectedOrderTracking(selectedOrderTracking === order.id ? null : order.id)}
                  className="px-5 py-2 bg-white text-royal-blue-900 border border-royal-blue-900 rounded-lg font-cinzel text-[10px] font-bold tracking-widest hover:bg-royal-blue-50 transition-all uppercase"
                >
                  {selectedOrderTracking === order.id ? 'Hide Details' : 'Track Order'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
