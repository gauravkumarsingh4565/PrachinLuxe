"use client";

import React, { Suspense } from 'react';
import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
  return (
    <div className="w-full min-h-screen bg-sand-100 flex items-center justify-center font-cormorant relative overflow-hidden">
      {/* Background Subtle Motifs */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Split Layout Container */}
      <div className="max-w-[1000px] w-full mx-4 grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-gold border border-gold-500/10">
        
        {/* Left Side: Editorial Banner */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-royal-blue-950 relative overflow-hidden text-white min-h-[550px]">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transition-transform duration-10000 hover:scale-100"
            style={{ backgroundImage: "url('/src/assets/images/explore_all_jewelry.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-blue-950 via-royal-blue-950/70 to-transparent" />
          
          {/* Logo */}
          <div className="relative z-10">
            <span className="font-cinzel text-xs tracking-[0.25em] font-bold text-gold-400">
              PRACHIN LUXE
            </span>
          </div>

          {/* Bottom Section details */}
          <div className="relative z-10 space-y-4">
            <h1 className="font-cinzel text-3xl font-bold tracking-wide leading-snug">
              Begin Your <br />
              <span className="text-gold-300">Royal Journey</span>
            </h1>
            <p className="text-sm text-sand-200/80 font-sans leading-relaxed">
              Create an account to gain exclusive access to bridal previews, dynamic collections, and custom orders. Save addresses and track your orders.
            </p>
            <div className="pt-4 flex items-center gap-6 text-[10px] uppercase font-bold text-gold-400 tracking-wider font-cinzel">
              <span>★ Exclusive Previews</span>
              <span>★ Personal Concierge</span>
            </div>
          </div>
        </div>

        {/* Right Side: SignupForm Component with Suspense Boundary */}
        <div className="flex items-center justify-center p-6 sm:p-12 bg-sand-50/50">
          <Suspense fallback={
            <div className="text-center font-sans text-sm text-gray-500 flex flex-col items-center justify-center gap-3">
              <div className="w-10 h-10 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
              Loading registration details...
            </div>
          }>
            <SignupForm />
          </Suspense>
        </div>

      </div>
    </div>
  );
}
