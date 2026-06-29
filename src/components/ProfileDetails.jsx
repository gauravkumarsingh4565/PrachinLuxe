"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProfileDetails() {
  const { user, orders, addresses, updateProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim()) {
      setError('Name field cannot be left blank.');
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (phone.replace(/\D/g, '').length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    try {
      updateProfile({ name, email, phone });
      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setError('');
    setIsEditing(false);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start font-cormorant">
      
      {/* Left Column: Profile Card & Loyalty Tier */}
      <div className="bg-white rounded-2xl border border-gold-500/20 shadow-gold p-6 text-center space-y-6">
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gold-500 shadow-md">
          <img 
            src={user?.profilePic || 'https://i.pravatar.cc/150'} 
            alt={user?.name || 'User'} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h2 className="font-cinzel text-xl font-bold text-royal-blue-950 tracking-wider leading-tight">
            {user?.name || 'Valued Guest'}
          </h2>
          <p className="text-gold-700 font-cinzel text-[10px] tracking-widest uppercase mt-1">
            Royal Heritage Club
          </p>
        </div>

        <div className="h-px bg-gold-200/50 w-full" />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4 text-center font-sans text-xs">
          <div className="p-3 bg-sand-50 rounded-xl border border-gold-500/10">
            <span className="block text-xl font-black text-royal-blue-900 font-cinzel mb-0.5">
              {orders?.length || 0}
            </span>
            <span className="font-bold text-gray-500 uppercase tracking-wider text-[9px]">
              Orders Placed
            </span>
          </div>
          <div className="p-3 bg-sand-50 rounded-xl border border-gold-500/10">
            <span className="block text-xl font-black text-royal-blue-900 font-cinzel mb-0.5">
              {addresses?.length || 0}
            </span>
            <span className="font-bold text-gray-500 uppercase tracking-wider text-[9px]">
              Saved Addresses
            </span>
          </div>
        </div>

        {/* Loyalty Tier Status Card */}
        <div className="p-4 bg-royal-blue-950 text-white rounded-xl border border-gold-400/20 text-left space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-cinzel text-[10px] font-bold text-gold-400 tracking-wider">MEMBER LEVEL</span>
            <span className="bg-gold-500 text-royal-blue-950 text-[8px] font-bold px-2 py-0.5 rounded font-sans uppercase">Gold</span>
          </div>
          <p className="font-cinzel text-sm font-bold text-white tracking-wide">Elite Royal Patron</p>
          <p className="text-[11px] text-sand-200/70 font-sans leading-normal">
            You enjoy 3% reward points back on Payals and complimentary express shipping.
          </p>
        </div>
      </div>

      {/* Right Column: Account Details Editing Form */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gold-500/10 shadow-sm p-6 md:p-8 space-y-6">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-1">Personal Details</h2>
          <p className="text-xs text-gray-500">Edit your profile credentials and account parameters.</p>
          <div className="h-px bg-gold-200/50 w-full mt-4" />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-sans font-semibold text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-sans font-semibold text-center animate-fade-in">
            Profile changes successfully saved!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5 font-sans text-sm">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Full Name</label>
            <input 
              type="text" 
              required
              disabled={!isEditing}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium text-gray-800 disabled:opacity-60"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Email Address</label>
            <input 
              type="email" 
              required
              disabled={!isEditing}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium text-gray-800 disabled:opacity-60"
            />
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Mobile Number</label>
            <div className="flex rounded-lg overflow-hidden border border-gold-500/30 bg-sand-50/50 focus-within:border-gold-500">
              <span className="px-3.5 bg-sand-100 flex items-center border-r border-gold-500/20 font-bold text-royal-blue-900 text-xs disabled:opacity-60">
                +91
              </span>
              <input 
                type="tel" 
                required
                maxLength={10}
                disabled={!isEditing}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="flex-grow px-4 py-3 focus:outline-none bg-transparent font-medium text-gray-800 tracking-wider disabled:opacity-60"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-4">
            {!isEditing ? (
              <button 
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-8 py-3.5 bg-royal-blue-900 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-gold-600 hover:shadow-lg transition-all duration-300 uppercase"
              >
                Edit Information
              </button>
            ) : (
              <>
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-white text-royal-blue-900 border border-royal-blue-900 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-50 transition-all duration-300 uppercase"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase"
                >
                  Save Information
                </button>
              </>
            )}
          </div>
        </form>
      </div>

    </div>
  );
}
