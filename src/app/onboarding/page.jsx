'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referral, setReferral] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill name from Google session
  useEffect(() => {
    if (session?.user?.name && !name) {
      setName(session.user.name);
    }
  }, [session]);

  // Redirect logic
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && session?.user?.isOnboarded) {
      router.push('/');
    }
  }, [status, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('Please agree to our Terms of Service and Privacy Policy to continue.');
      return;
    }

    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setError('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setLoading(true);

    try {
      // ======= BROWSER CONSOLE LOG (DevTools me dikhega) =======
      console.log('\n╔════════════════════════════════════╗');
      console.log('║        SIGNUP FORM SUBMITTED       ║');
      console.log('╚════════════════════════════════════╝');
      console.log('📋 Form Data:', {
        name: name.trim(),
        phone: '+91' + phoneNumber,
        email: session?.user?.email,
        referral: referral || '(none)',
      });

      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, name: name.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ API Error:', data.error);
        throw new Error(data.error || 'Failed to complete registration.');
      }

      console.log('\n✅ DATABASE UPDATED SUCCESSFULLY!');
      console.log('📂 Saved User Data in DB:', {
        id: data.user?.id,
        name: data.user?.name,
        email: data.user?.email,
        phone: data.user?.phoneNumber,
        isOnboarded: data.user?.isOnboarded,
        role: data.user?.role,
      });

      // Update NextAuth JWT session
      const updatedSession = await update({
        isOnboarded: true,
        phoneNumber: data.user?.phoneNumber || phoneNumber,
        name: data.user?.name || name.trim(),
      });

      console.log('🔐 Session Updated:', {
        isOnboarded: updatedSession?.user?.isOnboarded,
        email: updatedSession?.user?.email,
      });
      console.log('🏠 Redirecting to Homepage...\n');

      window.location.href = '/';
    } catch (err) {
      console.error('[ONBOARDING] Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-cinzel text-royal-blue-900 tracking-widest text-sm uppercase">Verifying Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-sand-100 flex items-center justify-center font-cormorant relative overflow-hidden py-8">

      {/* Background Subtle Motifs */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Split Layout */}
      <div className="max-w-[1000px] w-full mx-4 grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-gold border border-gold-500/10 z-10">

        {/* Left Side: Dark Editorial Panel */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-royal-blue-950 relative overflow-hidden text-white min-h-[620px]">

          {/* BG Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('/src/assets/images/explore_all_jewelry.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-blue-950 via-royal-blue-950/75 to-royal-blue-950/30" />

          {/* Top Logo */}
          <div className="relative z-10 flex flex-col items-start">
            <span className="font-cinzel text-[14px] tracking-[0.2em] font-black text-white uppercase leading-none">
              PRACHIN
            </span>
            <div className="flex items-center gap-1.5 w-20 mt-1">
              <div className="h-[0.5px] bg-gold-400/40 flex-grow" />
              <span className="text-[7.5px] font-bold tracking-[0.2em] text-gold-400 uppercase">
                LUXE
              </span>
              <div className="h-[0.5px] bg-gold-400/40 flex-grow" />
            </div>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 space-y-5">
            {/* Welcome message */}
            {session?.user && (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <img
                  src={session.user.image || 'https://i.pravatar.cc/40'}
                  alt={session.user.name}
                  className="w-10 h-10 rounded-full border border-gold-400/40 object-cover"
                />
                <div>
                  <p className="text-[11px] text-gold-400 font-cinzel tracking-widest uppercase">Verified via Google</p>
                  <p className="font-cormorant text-white text-sm font-semibold">{session.user.email}</p>
                </div>
              </div>
            )}

            <div>
              <h1 className="font-cinzel text-3xl font-bold tracking-wide leading-snug">
                Begin Your <br />
                <span className="text-gold-300">Royal Journey</span>
              </h1>
              <p className="text-sm text-sand-200/80 font-sans leading-relaxed mt-3">
                One last step! Complete your profile to unlock exclusive bridal previews, track orders, and save addresses.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-5 text-[10px] uppercase font-bold text-gold-400 tracking-wider font-cinzel border-t border-white/10">
              <span>★ Exclusive Previews</span>
              <span>★ Order Tracking</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex items-center justify-center p-8 sm:p-12 bg-sand-50/50">
          <div className="w-full max-w-[380px] animate-fade-in-up">

            {/* Brand Header */}
            <div className="text-center mb-8 flex flex-col items-center">
              <span className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-royal-blue-950 uppercase leading-none">
                PRACHIN
              </span>
              <div className="flex items-center gap-3 w-40 mt-2">
                <div className="h-[0.5px] bg-gold-500/40 flex-grow" />
                <span className="text-[10px] font-bold tracking-[0.35em] text-gold-600 uppercase">LUXE</span>
                <div className="h-[0.5px] bg-gold-500/40 flex-grow" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-7">
              <h2 className="font-cinzel text-lg font-bold text-royal-blue-950 uppercase tracking-widest mb-1.5">
                Complete Your Profile
              </h2>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Just a few details and you're all set to explore<br />our heritage collections.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-sans font-semibold text-center animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel block">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:border-gold-500 focus:outline-none bg-white font-sans text-sm font-medium text-gray-800 disabled:opacity-50"
                />
              </div>

              {/* Email — read only from Google */}
              <div className="space-y-1.5">
                <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel block">
                  Email Address
                </label>
                <input
                  type="email"
                  readOnly
                  value={session?.user?.email || ''}
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/20 bg-sand-50 font-sans text-sm font-medium text-gray-500 cursor-not-allowed"
                />
                <p className="text-[10px] text-gray-400 font-sans">Auto-filled from your Google account</p>
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel block">
                  Mobile Number
                </label>
                <div className="flex rounded-lg overflow-hidden border border-gold-500/30 focus-within:border-gold-500 bg-white font-sans text-sm">
                  <span className="px-3.5 bg-sand-100 flex items-center border-r border-gold-500/20 font-bold text-royal-blue-900 text-xs">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    disabled={loading}
                    className="flex-grow px-4 py-3 focus:outline-none bg-transparent font-medium text-gray-800 tracking-wider disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Referral Code */}
              <div className="space-y-1.5">
                <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel block">
                  Referral Code <span className="text-gray-400 font-normal normal-case">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter code for a special discount"
                  value={referral}
                  onChange={(e) => setReferral(e.target.value)}
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:border-gold-500 focus:outline-none bg-white font-sans text-sm font-medium text-gray-800 disabled:opacity-50"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  disabled={loading}
                  className="mt-1 h-4 w-4 rounded border-gold-500/30 text-royal-blue-900 focus:ring-royal-blue-900 focus:ring-opacity-25"
                />
                <label htmlFor="terms" className="text-xs text-gray-500 leading-normal font-sans">
                  I agree to the{' '}
                  <span className="text-royal-blue-900 font-bold hover:underline cursor-pointer">Terms of Service</span>
                  {' '}and{' '}
                  <span className="text-royal-blue-900 font-bold hover:underline cursor-pointer">Privacy Policy</span>
                  {' '}of Prachin Luxy.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Completing Registration...
                  </>
                ) : 'Complete Registration'}
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
