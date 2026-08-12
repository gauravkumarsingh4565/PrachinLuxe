"use client";

import React from 'react';

export default function PlaceholderTab({ tabId, title, setActiveTab }) {
  return (
    <>
      <div className="p-6 border-b border-gold-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-sand-50/50">
        <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider flex items-center gap-2">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('products')}
            className="text-xs font-bold font-sans text-gold-600 hover:text-gold-700 uppercase tracking-wider bg-gold-50 px-3 py-1.5 rounded-lg border border-gold-300/40 hover:bg-gold-100 transition-colors"
          >
            View All Products
          </button>
        </div>
      </div>
      
      <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center min-h-[300px]">
        <svg className="w-12 h-12 text-gold-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="font-cinzel text-lg text-royal-blue-900 mb-2 font-bold uppercase">
          {tabId} Module
        </p>
        <p className="font-sans text-sm max-w-md mx-auto mb-6">
          The {tabId} module is currently under development.
        </p>
        <button
          onClick={() => setActiveTab('products')}
          className="px-6 py-3 bg-royal-blue-900 text-gold-400 rounded-xl font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-950 transition-colors uppercase shadow-md"
        >
          View All Products
        </button>
      </div>
    </>
  );
}
