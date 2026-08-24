"use client";

import React from 'react';

export default function CheckoutForm({
  addressData,
  setAddressData,
  onSubmit,
  isCheckingOut,
  onBack,
  error,
  onClearError,
}) {
  const handleChange = (field, value) => {
    if (error && onClearError) onClearError();
    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-gold-500/10 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-1">
            Shipping & Delivery Coordinates
          </h2>
          <p className="text-xs text-gray-500">
            Please verify your destination address for insured heritage delivery.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-sand-50 border border-gold-500/20 px-3 py-1.5 rounded-full w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-cinzel text-[10px] font-bold text-royal-blue-900 tracking-wider uppercase">
            Razorpay Secure Checkout
          </span>
        </div>
      </div>

      <div className="h-px bg-gold-200/50 w-full" />

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-sans flex items-start justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
          {onClearError && (
            <button type="button" onClick={onClearError} className="text-red-400 hover:text-red-600 font-bold">
              ✕
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans text-sm">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">
            Full Name
          </label>
          <input
            type="text"
            required
            value={addressData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
            placeholder="e.g. Maharani Gayatri"
          />
        </div>

        {/* Contact Number */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">
            Contact Number (Mobile)
          </label>
          <input
            type="tel"
            required
            value={addressData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
            placeholder="+91 98765 43210"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">
            Email Address (for Order Confirmation & Invoicing)
          </label>
          <input
            type="email"
            required
            value={addressData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
            placeholder="e.g. gaurav@example.com"
          />
        </div>

        {/* Street Address */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">
            Street Address / Suite / House No.
          </label>
          <input
            type="text"
            required
            value={addressData.street || ''}
            onChange={(e) => handleChange('street', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
            placeholder="12, Heritage Palace Road"
          />
        </div>

        {/* City */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">
            City
          </label>
          <input
            type="text"
            required
            value={addressData.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
            placeholder="Jaipur"
          />
        </div>

        {/* State */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">
            State
          </label>
          <input
            type="text"
            required
            value={addressData.state || ''}
            onChange={(e) => handleChange('state', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
            placeholder="Rajasthan"
          />
        </div>

        {/* Postal / Zip Code */}
        <div className="flex flex-col gap-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">
            Postal / PIN Code
          </label>
          <input
            type="text"
            required
            value={addressData.zip || ''}
            onChange={(e) => handleChange('zip', e.target.value)}
            className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium"
            placeholder="302001"
          />
        </div>
      </div>

      {/* Payment Methods Supported */}
      <div className="bg-sand-50/70 p-4 rounded-xl border border-gold-500/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-royal-blue-950 font-cinzel uppercase tracking-wider">
            Supported Instant Payment Methods
          </span>
          <span className="text-[10px] text-gold-700 font-semibold uppercase tracking-wider">
            100% Encrypted & Safe
          </span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-gray-600 font-medium">
          <span className="bg-white px-2.5 py-1 rounded-md border border-gold-500/20 shadow-2xs font-semibold text-royal-blue-900">
            UPI (GPay / PhonePe / Paytm)
          </span>
          <span className="bg-white px-2.5 py-1 rounded-md border border-gold-500/20 shadow-2xs font-semibold text-royal-blue-900">
            Credit & Debit Cards (Visa / Mastercard / RuPay)
          </span>
          <span className="bg-white px-2.5 py-1 rounded-md border border-gold-500/20 shadow-2xs font-semibold text-royal-blue-900">
            Net Banking
          </span>
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isCheckingOut}
          className="px-6 py-3.5 bg-white text-royal-blue-900 border border-royal-blue-900 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-50 transition-all duration-300 uppercase disabled:opacity-50"
        >
          Back To Bag
        </button>
        <button
          type="submit"
          disabled={isCheckingOut}
          className="flex-grow py-3.5 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase disabled:opacity-60 flex items-center justify-center gap-2.5 shadow-md"
        >
          {isCheckingOut ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Securing Transaction with Razorpay...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Pay & Complete Order</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
