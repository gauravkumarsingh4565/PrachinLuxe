"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SignupForm() {
  const { signupUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [referral, setReferral] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill phone from URL param if redirected from OTP verification
  useEffect(() => {
    const phoneParam = searchParams.get('phone');
    if (phoneParam) {
      setPhone(phoneParam);
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
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
    
    setTimeout(() => {
      setIsSubmitting(false);
      try {
        signupUser({ name, email, phone });
        router.push('/');
      } catch (err) {
        setError('Signup failed. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-[500px] bg-white rounded-2xl border border-gold-500/20 shadow-gold-lg p-6 sm:p-10 font-cormorant flex flex-col justify-center animate-fade-in-up">
      <div className="text-center mb-8 flex flex-col items-center">
        <span className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-[0.18em] text-royal-blue-950 uppercase leading-none pl-[0.18em]">
          PRACHIN
        </span>
        <div className="flex items-center gap-3 w-40 mt-1">
          <div className="h-[1px] bg-gold-500/30 flex-grow" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-gold-600 uppercase">
            LUXE
          </span>
          <div className="h-[1px] bg-gold-500/30 flex-grow" />
        </div>
        <p className="text-gray-400 font-sans text-[8px] tracking-[0.15em] uppercase mt-2.5">
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
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:border-gold-500 focus:outline-none bg-sand-50/50 font-sans text-sm font-medium text-gray-800"
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
            className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:border-gold-500 focus:outline-none bg-sand-50/50 font-sans text-sm font-medium text-gray-800"
          />
        </div>

        {/* Mobile Number */}
        <div className="space-y-1.5">
          <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel block">
            Mobile Number
          </label>
          <div className="flex rounded-lg overflow-hidden border border-gold-500/30 focus-within:border-gold-500 bg-sand-50/50 font-sans text-sm">
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
              disabled={!!searchParams.get('phone')}
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
            className="w-full px-4 py-3 rounded-lg border border-gold-500/30 focus:border-gold-500 focus:outline-none bg-sand-50/50 font-sans text-sm font-medium text-gray-800"
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
            I agree to the <span className="text-royal-blue-900 font-bold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-royal-blue-900 font-bold hover:underline cursor-pointer">Privacy Policy</span> of Prachin Luxe.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase flex items-center justify-center gap-2"
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
