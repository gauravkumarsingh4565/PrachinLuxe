'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect to root if user is already onboarded
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

    // Client-side phone verification check
    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);

    try {
      // 1. Submit request to onboarding API route
      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update phone number.');
      }

      // 2. Trigger NextAuth session update.
      // This sends a signal to NextAuth to trigger the 'jwt' callback with 'update' trigger.
      const updatedSession = await update({
        isOnboarded: true,
        phoneNumber: data.user?.phoneNumber || phoneNumber,
      });

      // 3. Navigate to the root page
      if (updatedSession) {
        router.push('/');
      } else {
        // Fallback redirection in case update returns null
        router.push('/');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-outfit text-amber-900 tracking-wide font-medium">Verifying Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-50 px-4 py-12 select-none">
      <div className="w-full max-w-md bg-white border border-amber-900/10 rounded-2xl shadow-xl p-8 md:p-10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700"></div>
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-50 rounded-full blur-xl opacity-60"></div>
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-amber-50 rounded-full blur-xl opacity-60"></div>

        <div className="text-center mb-8">
          <h1 className="font-cinzel text-3xl font-bold text-amber-900 tracking-wider mb-2">
            WELCOME TO LUXE
          </h1>
          <p className="font-outfit text-sm text-amber-800/70 tracking-wide">
            Please complete your profile to access your royal collections and dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="phone"
              className="block font-outfit text-xs font-semibold uppercase tracking-wider text-amber-900 mb-2"
            >
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-amber-900/40 font-outfit text-sm">
                +91
              </span>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="9876543210"
                className="w-full pl-12 pr-4 py-3 border border-amber-950/20 bg-amber-50/20 rounded-lg text-amber-950 font-outfit placeholder-amber-950/30 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition duration-200"
                required
                disabled={loading}
              />
            </div>
            <p className="mt-1.5 font-outfit text-[11px] text-amber-800/50">
              We require a phone number for ordering verification and secure access.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-lg font-outfit">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-900 hover:bg-amber-950 text-sand-50 font-outfit text-xs font-bold uppercase tracking-widest rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-800 transition duration-200 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                Processing...
              </>
            ) : (
              'Complete Onboarding'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
