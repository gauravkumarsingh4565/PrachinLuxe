"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ProductsTab from './components/ProductsTab';
import PlaceholderTab from './components/PlaceholderTab';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductsTab />;
      case 'orders':
        return <PlaceholderTab tabId="orders" title="Order Management" setActiveTab={setActiveTab} />;
      case 'customers':
        return <PlaceholderTab tabId="customers" title="Elite Clients" setActiveTab={setActiveTab} />;
      case 'settings':
        return <PlaceholderTab tabId="settings" title="Boutique Settings" setActiveTab={setActiveTab} />;
      default:
        return <ProductsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-sand-100 font-cormorant pb-12">
      {/* Top Banner / Breadcrumb */}
      <div className="bg-royal-blue-950 text-white pt-8 pb-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <nav className="text-xs text-gold-400 font-semibold tracking-wide uppercase mb-4 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-white">ADMIN PANEL</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="bg-white rounded-2xl shadow-gold border border-gold-500/20 p-4 flex flex-col gap-2 h-fit">
            {[
              { id: 'orders', label: 'Order Management', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
              { id: 'products', label: 'Jewelry Catalog', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
              { id: 'customers', label: 'Elite Clients', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
              { id: 'settings', label: 'Boutique Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-cinzel text-sm font-bold tracking-wide uppercase ${activeTab === tab.id
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
            {/* Content Container */}
            <div className="bg-white rounded-2xl border border-gold-500/20 shadow-sm overflow-hidden">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
