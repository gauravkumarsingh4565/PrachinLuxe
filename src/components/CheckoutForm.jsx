"use client";

import React from 'react';

export default function CheckoutForm({
  addressData,
  setAddressData,
  onSubmit,
  isCheckingOut,
  onBack
}) {
  const handleChange = (field, value) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-gold-500/10 shadow-sm p-6 md:p-8 space-y-6">
      <div>
        <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-1">Shipping & Delivery Details</h2>
        <p className="text-xs text-gray-500">Please verify your shipping coordinates to complete this transaction.</p>
        <div className="h-px bg-gold-200/50 w-full mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans text-sm">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Full Name</label>
          <input 
            type="text" 
            required
            value={addressData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
          />
        </div>

        {/* Contact Number */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Contact Number</label>
          <input 
            type="text" 
            required
            value={addressData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Email Address</label>
          <input 
            type="email" 
            required
            value={addressData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
          />
        </div>

        {/* Street Address */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Street Address</label>
          <input 
            type="text" 
            required
            value={addressData.street}
            onChange={(e) => handleChange('street', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">City</label>
          <input 
            type="text" 
            required
            value={addressData.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
          />
        </div>

        {/* State */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">State</label>
          <input 
            type="text" 
            required
            value={addressData.state}
            onChange={(e) => handleChange('state', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
          />
        </div>

        {/* Postal / Zip Code */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Postal / Zip Code</label>
          <input 
            type="text" 
            required
            value={addressData.zip}
            onChange={(e) => handleChange('zip', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          type="button"
          onClick={onBack}
          className="px-6 py-3 bg-white text-royal-blue-900 border border-royal-blue-900 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-50 transition-all duration-300 uppercase"
        >
          Back To Bag
        </button>
        <button 
          type="submit"
          disabled={isCheckingOut}
          className="flex-grow py-3 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isCheckingOut ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Payment...
            </>
          ) : 'Pay & Complete Order'}
        </button>
      </div>
    </form>
  );
}
