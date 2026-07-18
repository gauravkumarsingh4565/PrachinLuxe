"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSession } from 'next-auth/react';

export default function ProfileDetails() {
  const { user: phoneUser, orders, addresses, updateProfile } = useAuth();
  const { data: session, update } = useSession();

  // ── Unified user object from Google session OR phone auth ──
  const sessionUser = session?.user;

  const user = phoneUser || (sessionUser ? {
    name: sessionUser.name,
    email: sessionUser.email,
    phone: sessionUser.phoneNumber || '',
    profilePic: sessionUser.image,
    role: sessionUser.role || 'NORMALUSER',
    isOnboarded: sessionUser.isOnboarded,
  } : null);

  const isGoogleUser = !!sessionUser && !phoneUser;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync form state when user data loads
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      // Strip +91 prefix if present for display
      const rawPhone = user.phone || user.phoneNumber || '';
      setPhone(rawPhone.replace(/^\+91/, '').trim());
    }
  }, [user?.name, user?.email, user?.phone, user?.phoneNumber]);

  const handleSave = async (e) => {
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

    setIsSaving(true);

    try {
      if (isGoogleUser) {
        // For Google users → update via onboarding API
        const res = await fetch('/api/user/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name.trim(), phoneNumber: phone }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to update profile.');

        // Refresh NextAuth Session so the UI updates immediately
        await update({
          name: name.trim(),
          phoneNumber: phone
        });

        console.log('✅ Profile Updated in DB & Session:', data.user);
      } else {
        // For phone auth users → use local context
        updateProfile({ name, email, phone });
      }

      setSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    const rawPhone = (user?.phone || user?.phoneNumber || '').replace(/^\+91/, '').trim();
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(rawPhone);
    setError('');
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start font-cormorant">

      {/* ── Left Column: Profile Card ── */}
      <div className="bg-white rounded-2xl border border-gold-500/20 shadow-gold p-6 text-center space-y-6">

        {/* Avatar */}
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-gold-500 shadow-md">
          <img
            src={user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'U')}&background=1f4265&color=fff`}
            alt={user?.name || 'User'}
            className="w-full h-full object-cover"
          />
          {isGoogleUser && (
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow border border-gray-100">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
            </div>
          )}
        </div>

        {/* Name & Subtitle */}
        <div>
          <h2 className="font-cinzel text-xl font-bold text-royal-blue-950 tracking-wider leading-tight">
            {user?.name || 'Valued Guest'}
          </h2>
          <p className="text-gold-700 font-cinzel text-[10px] tracking-widest uppercase mt-1">
            {isGoogleUser ? 'Google Account' : 'Royal Heritage Club'}
          </p>
        </div>

        <div className="h-px bg-gold-200/50 w-full" />

        {/* Contact info strip */}
        <div className="text-left space-y-3 font-sans text-xs">
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate font-medium">{user?.email || '—'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <svg className="w-3.5 h-3.5 flex-shrink-0 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium">
              {(user?.phone || user?.phoneNumber)
                ? `+91 ${(user?.phone || user?.phoneNumber || '').replace(/^\+91/, '').trim()}`
                : 'Not set'}
            </span>
          </div>
        </div>

        <div className="h-px bg-gold-200/50 w-full" />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 text-center font-sans text-xs">
          <div className="p-3 bg-sand-50 rounded-xl border border-gold-500/10">
            <span className="block text-xl font-black text-royal-blue-900 font-cinzel mb-0.5">
              {orders?.length || 0}
            </span>
            <span className="font-bold text-gray-500 uppercase tracking-wider text-[9px]">Orders</span>
          </div>
          <div className="p-3 bg-sand-50 rounded-xl border border-gold-500/10">
            <span className="block text-xl font-black text-royal-blue-900 font-cinzel mb-0.5">
              {addresses?.length || 0}
            </span>
            <span className="font-bold text-gray-500 uppercase tracking-wider text-[9px]">Addresses</span>
          </div>
        </div>

        {/* Loyalty Card */}
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

      {/* ── Right Column: Edit Form ── */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gold-500/10 shadow-sm p-6 md:p-8 space-y-6">
        <div>
          <h2 className="font-cinzel text-lg font-bold text-royal-blue-900 tracking-wider mb-1">Personal Details</h2>
          <p className="text-xs text-gray-500">Your account information and credentials.</p>
          <div className="h-px bg-gold-200/50 w-full mt-4" />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-sans font-semibold text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-sans font-semibold text-center animate-fade-in">
            ✅ Profile changes successfully saved!
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

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">
              Email Address
              {isGoogleUser && (
                <span className="ml-2 text-[9px] text-gold-600 normal-case font-sans tracking-normal">
                  (Linked to Google)
                </span>
              )}
            </label>
            <input
              type="email"
              required
              disabled={!isEditing || isGoogleUser}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`px-4 py-3 rounded-lg border border-gold-500/30 focus:outline-none focus:border-gold-500 bg-sand-50/50 font-medium text-gray-800 disabled:opacity-60 ${isGoogleUser ? 'cursor-not-allowed' : ''}`}
            />
            {isGoogleUser && (
              <p className="text-[10px] text-gray-400 font-sans">Email cannot be changed for Google accounts.</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Mobile Number</label>
            <div className="flex rounded-lg overflow-hidden border border-gold-500/30 bg-sand-50/50 focus-within:border-gold-500">
              <span className="px-3.5 bg-sand-100 flex items-center border-r border-gold-500/20 font-bold text-royal-blue-900 text-xs">
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

          {/* Account Type Badge */}
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel">Account Type</label>
            <div className="px-4 py-3 rounded-lg border border-gold-500/20 bg-sand-50/50 flex items-center gap-2">
              {isGoogleUser ? (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span className="text-gray-700 font-medium text-sm">Google Account</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700 font-medium text-sm">Phone Account</span>
                </>
              )}
              <span className="ml-auto text-[9px] font-bold uppercase tracking-wider bg-gold-100 text-gold-700 px-2 py-0.5 rounded font-cinzel">
                {user?.role || 'NORMALUSER'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
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
                  disabled={isSaving}
                  className="px-6 py-3 bg-white text-royal-blue-900 border border-royal-blue-900 rounded-lg font-cinzel text-xs font-bold tracking-widest hover:bg-royal-blue-50 transition-all duration-300 uppercase disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-3 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase disabled:opacity-60 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : 'Save Information'}
                </button>
              </>
            )}
          </div>
        </form>
      </div>

    </div>
  );
}
