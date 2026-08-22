"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderHistory() {
  const orders = useSelector(selectOrders);
  const router = useRouter();
  const [selectedOrderTracking, setSelectedOrderTracking] = useState(null);

  if (orders.length === 0) {
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
      <div>
        <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-1">My Orders</h2>
        <p className="text-xs text-gray-500">Track and review your heritage acquisitions.</p>
        <div className="h-px bg-gold-200/50 w-full mt-4" />
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-gold-500/10 shadow-sm overflow-hidden flex flex-col">
            
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
                <span className="block text-[10px] uppercase tracking-wider text-gray-400">Payment Mode</span>
                <span className="text-royal-blue-900 font-bold text-sm">{order.paymentMethod || 'Simulated Check'}</span>
              </div>

              <div className="space-y-1 sm:text-right">
                <span className="block text-[10px] uppercase tracking-wider text-gray-400">Total Paid</span>
                <span className="text-royal-blue-900 font-black text-sm sm:text-base font-cinzel">
                  Rs. {order.total.toLocaleString('en-IN')}
                </span>
              </div>

              <div>
                <span className={`inline-block px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                  order.status === 'Delivered' 
                    ? 'bg-[#34A853]/10 text-[#34A853] border-[#34A853]/25' 
                    : 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/25'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items details */}
            <div className="divide-y divide-gray-100 px-4 sm:px-6 flex-grow">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div 
                      onClick={() => router.push(`/product/${item.product.id}`)}
                      className="relative w-16 h-16 bg-sand-50 rounded-lg overflow-hidden border border-gold-500/10 p-1 cursor-pointer flex-shrink-0"
                    >
                      <Image 
                        src={item.product.img} 
                        alt={item.product.name} 
                        fill 
                        sizes="64px"
                        className="object-cover rounded" 
                      />
                    </div>
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-bold text-gold-600 uppercase tracking-widest block">{item.product.category}</span>
                      <h4 
                        onClick={() => router.push(`/product/${item.product.id}`)}
                        className="font-cinzel text-sm sm:text-base font-bold text-royal-blue-950 hover:text-gold-600 cursor-pointer transition-colors leading-tight line-clamp-1"
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-semibold uppercase font-mono">ID: {item.product.id} • Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-royal-blue-900 font-bold font-sans text-sm sm:text-base">
                    Rs. {parseFloat(String(item.product.price || 0).replace(/,/g, '')).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Progress / Shipment Tracker details */}
            {selectedOrderTracking === order.id && (
              <div className="p-5 sm:p-6 bg-sand-50 border-t border-gold-500/15 flex flex-col gap-4 font-sans text-xs animate-fade-in">
                <span className="font-cinzel font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest block mb-2">Insured Delivery Progress</span>
                <div className="flex justify-between items-center relative w-full max-w-[500px] mx-auto py-2">
                  {/* Progress Line */}
                  <div className="absolute top-1/2 left-0 h-0.5 bg-gold-200 w-full -translate-y-1/2" />
                  <div className="absolute top-1/2 left-0 h-0.5 bg-gold-500 -translate-y-1/2 transition-all duration-1000" 
                    style={{ width: order.status === 'Delivered' ? '100%' : '50%' }} 
                  />

                  {/* Step Indicators */}
                  {[
                    { label: 'Confirmed', done: true },
                    { label: 'Shipped', done: true },
                    { label: 'In Transit', done: order.status === 'Delivered' },
                    { label: 'Delivered', done: order.status === 'Delivered' }
                  ].map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5 relative z-10">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black ${
                        step.done 
                          ? 'bg-gold-500 border-gold-600 text-royal-blue-950 font-bold' 
                          : 'bg-white border-gold-200 text-gray-400'
                      }`}>
                        {step.done ? '✓' : idx + 1}
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${step.done ? 'text-gold-700' : 'text-gray-400'}`}>{step.label}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white rounded-lg border border-gold-500/10 text-center font-sans text-[11px] text-gray-500 mt-2">
                  🚚 Insured Express Shipping via <span className="font-bold text-royal-blue-950">Sequel Logistics</span>. Signature is required upon delivery of your luxury items.
                </div>
              </div>
            )}

            {/* Footer triggers */}
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-stone-50/50 flex flex-wrap gap-3 justify-end">
              <button 
                onClick={() => {
                  if (selectedOrderTracking === order.id) {
                    setSelectedOrderTracking(null);
                  } else {
                    setSelectedOrderTracking(order.id);
                  }
                }}
                className="px-5 py-2.5 bg-white text-royal-blue-900 border border-royal-blue-900 rounded-lg font-cinzel text-[10px] font-bold tracking-widest hover:bg-royal-blue-50 transition-all duration-300 uppercase"
              >
                {selectedOrderTracking === order.id ? 'Hide Details' : 'Track Shipment'}
              </button>
              <button 
                onClick={() => alert(`Simulating Invoice download for order ${order.id}...`)}
                className="px-5 py-2.5 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-[10px] font-bold tracking-widest transition-all duration-300 hover:shadow-md uppercase"
              >
                Download Invoice
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
