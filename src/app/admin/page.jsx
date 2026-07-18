"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '₹ 4,52,000', change: '+12.5%' },
    { label: 'Active Orders', value: '34', change: '+5.2%' },
    { label: 'Total Customers', value: '1,205', change: '+18.1%' },
    { label: 'Products', value: '142', change: '0%' },
  ];

  return (
    <div className="min-h-screen bg-sand-100 font-cormorant pb-12">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-royal-blue-950 text-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="text-xs text-gold-400 font-semibold tracking-wide uppercase mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white">ADMIN PANEL</span>
          </nav>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider uppercase">Royal Administration</h1>
          <p className="text-sand-200/80 mt-2 font-sans text-sm max-w-xl">
            Manage your boutique's inventory, orders, and elite clientele from this central command center.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="bg-white rounded-2xl shadow-gold border border-gold-500/20 p-4 flex flex-col gap-2">
            {[
              { id: 'overview', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
              { id: 'orders', label: 'Order Management', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
              { id: 'products', label: 'Jewelry Catalog', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
              { id: 'customers', label: 'Elite Clients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { id: 'settings', label: 'Boutique Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-cinzel text-sm font-bold tracking-wide uppercase ${
                  activeTab === tab.id 
                    ? 'bg-royal-blue-900 text-gold-400 shadow-md' 
                    : 'text-royal-blue-900 hover:bg-sand-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-gold-500/20 shadow-sm p-5 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gold-100 to-transparent opacity-50 rounded-bl-full" />
                  <p className="text-gray-500 font-sans text-xs uppercase font-bold tracking-wider mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="font-cinzel text-2xl font-black text-royal-blue-950">{stat.value}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity / Content Box */}
            <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gold-100 flex justify-between items-center bg-sand-50/50">
                <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider">
                  {activeTab === 'overview' ? 'Recent Transactions' : `Manage ${activeTab}`}
                </h2>
                <button className="text-xs font-bold font-sans text-gold-600 hover:text-gold-700 uppercase tracking-wider">
                  View All
                </button>
              </div>
              
              <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center min-h-[300px]">
                <svg className="w-12 h-12 text-gold-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="font-cinzel text-lg text-royal-blue-900 mb-2">No Data Available Yet</p>
                <p className="font-sans text-sm max-w-md mx-auto">
                  The {activeTab} module is currently empty or under development. Check back later when live data is connected.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
