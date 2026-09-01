"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser as signupUserAction } from '@/redux/slices/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import logoimage from '@/assets/images/newLogo.png';
import { useAuthModal } from '@/context/AuthModalContext';

export default function SignupForm({ isModal = false, onCloseModal }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { triggerSparkle } = useAuthModal();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [referral, setReferral] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, update } = useSession();

  // Pre-fill phone from URL param if redirected from OTP verification
  useEffect(() => {
    const phoneParam = searchParams?.get('phone');
    if (phoneParam) {
      setPhone(phoneParam);
    }
  }, [searchParams]);

  // Pre-fill name and email from Google session if available
  useEffect(() => {
    if (session?.user) {
      if (session.user.name && !name) setName(session.user.name);
      if (session.user.email && !email) setEmail(session.user.email);
    }
  }, [session, name, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreed) {
      setError('You must agree to the terms and privacy conditions.');
      return;
    }

    if (phone.replace(/\D/g, '').length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phoneNumber: phone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete onboarding');
      }

      // Update NextAuth Session
      await update({
        isOnboarded: true,
        phoneNumber: phone,
        name: name,
      });

      // Keep Redux synced locally
      dispatch(signupUserAction({ name, email, phone }));

      // Trigger royal signup sparkle celebration (canvas-confetti)
      if (triggerSparkle) {
        triggerSparkle();
      }
      
      if (onCloseModal) {
        onCloseModal();
      }
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full max-w-[500px] ${isModal ? 'p-2' : 'bg-white rounded-2xl border border-gold-500/20 shadow-gold-lg p-6 sm:p-10'} font-cormorant flex flex-col justify-center animate-fade-in-up`}>
      {/* Brand Header with Luxury Jewelry Animation */}
      <div className="text-center mb-6 flex flex-col items-center relative">
        {/* Animated Golden Sparkles & Floating Jewels */}
        <div className="relative group flex items-center justify-center py-2">
          {/* Ambient Glowing Halo around Logo */}
          <div className="absolute inset-0 bg-gold-400/25 rounded-full blur-xl animate-pulse" />
          
          {/* Sparkling Orbit Jewels */}
          <span className="absolute -top-1 -left-4 text-gold-500 text-xs animate-bounce delay-100 opacity-80">✦</span>
          <span className="absolute -bottom-1 -right-3 text-gold-400 text-sm animate-pulse delay-300 opacity-90">✨</span>
          <span className="absolute top-2 -right-5 text-gold-600 text-[10px] animate-bounce delay-500 opacity-70">✦</span>
          
          {/* Logo Image */}
          <img
            src={logoimage.src || logoimage}
            alt="Prachin Luxy"
            className="h-16 sm:h-20 w-auto object-contain relative z-10 drop-shadow-md transition-transform duration-500 hover:scale-105"
          />
        </div>

        <p className="text-gold-700/80 font-cinzel text-[10px] tracking-[0.25em] uppercase mt-2 font-semibold">
          Handcrafted Jewelry & Antiques
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-center space-y-1">
          <h2 className="font-cinzel text-lg sm:text-xl font-bold text-royal-blue-950 uppercase tracking-wide">Create An Account</h2>
          <p className="text-xs text-gray-500 font-medium">Join us to explore ancient riches and heritage treasures.</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-sans font-semibold text-center animate-fade-in">
            {error}
          </div>
        )}

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
            className="w-full px-4 py-3 rounded-xl border border-gold-500/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 focus:outline-none bg-sand-50/50 font-sans text-sm font-medium text-gray-800 transition-all duration-300"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel block">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!!session?.user?.email}
            className={`w-full px-4 py-3 rounded-xl border border-gold-500/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 focus:outline-none bg-sand-50/50 font-sans text-sm font-medium transition-all duration-300 ${session?.user?.email ? 'text-gray-500 cursor-not-allowed bg-sand-100/50' : 'text-gray-800'}`}
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel block">
            Mobile Number
          </label>
          <div className="flex rounded-xl overflow-hidden border border-gold-500/30 focus-within:border-gold-500 focus-within:ring-2 focus-within:ring-gold-400/20 bg-sand-50/50 font-sans text-sm transition-all duration-300">
            <span className="px-3.5 bg-sand-100 flex items-center border-r border-gold-500/20 font-bold text-royal-blue-900 text-xs">
              +91
            </span>
            <input
              type="tel"
              required
              maxLength={10}
              placeholder="10-digit number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              className="flex-grow px-4 py-3.5 focus:outline-none bg-transparent font-medium text-gray-800 tracking-wider disabled:text-gray-400"
              disabled={!!searchParams?.get('phone')}
            />
          </div>
        </div>

        {/* Referral Code (Optional) */}
        <div className="space-y-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel block">
            Referral Code (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter code for special discount"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gold-500/30 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/20 focus:outline-none bg-sand-50/50 font-sans text-sm font-medium text-gray-800 transition-all duration-300"
          />
        </div>

        {/* Terms Agreement Checkbox */}
        <div className="flex items-start gap-2.5 pt-2">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gold-500/30 text-royal-blue-900 focus:ring-royal-blue-900 focus:ring-opacity-25"
          />
          <label htmlFor="terms" className="text-xs text-gray-500 leading-normal font-sans">
            I agree to the <span className="text-royal-blue-900 font-bold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-royal-blue-900 font-bold hover:underline cursor-pointer">Privacy Policy</span> of Prachin Luxy.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-royal-blue-950 via-royal-blue-900 to-royal-blue-950 hover:from-gold-600 hover:to-gold-700 text-white rounded-xl font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-gold-lg uppercase flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </>
          ) : 'Register & Log In'}
        </button>
      </form>

      {/* Redirect back to Login */}
      <div className="mt-8 border-t border-gold-200/30 pt-6 text-center text-xs">
        <span className="text-gray-500 font-medium">Already have an account? </span>
        <Link
          href="/login"
          className="text-royal-blue-800 font-bold hover:text-gold-700 underline font-cinzel tracking-wider"
        >
          Log In Here
        </Link>
      </div>
    </div>
  );
}
