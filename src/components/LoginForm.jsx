"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn('google', { callbackUrl });
    // Note: setIsLoading(false) nahi chahiye kyunki Google redirect ho jaayega
  };

  return (
    <div className="w-full max-w-[420px] flex flex-col justify-center font-cormorant animate-fade-in-up">

      {/* Brand Header */}
      <div className="text-center mb-10 flex flex-col items-center">
        <span className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-[0.2em] text-royal-blue-950 uppercase leading-none">
          PRACHIN
        </span>
        <div className="flex items-center gap-3 w-44 mt-2">
          <div className="h-[0.5px] bg-gold-500/40 flex-grow" />
          <span className="text-[10px] font-bold tracking-[0.35em] text-gold-600 uppercase">
            LUXE
          </span>
          <div className="h-[0.5px] bg-gold-500/40 flex-grow" />
        </div>
        <p className="text-gray-400 font-sans text-[9px] tracking-[0.18em] uppercase mt-3">
          The Ancient Riches
        </p>
      </div>

      {/* Welcome Text */}
      <div className="text-center mb-8">
        <h2 className="font-cinzel text-xl font-bold text-royal-blue-950 uppercase tracking-widest mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          Sign in to explore heritage jewelry &amp; antiques<br />curated for the royal in you.
        </p>
      </div>

      {/* Ornamental Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
        <span className="text-gold-500 text-lg">✦</span>
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      </div>

      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="group relative w-full flex items-center justify-center gap-4 py-4 px-6 bg-white hover:bg-sand-50 border border-gold-400/30 hover:border-gold-500/60 rounded-xl shadow-sm hover:shadow-gold transition-all duration-400 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {/* Google Icon */}
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-royal-blue-900 border-t-transparent rounded-full animate-spin flex-shrink-0" />
        ) : (
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
        )}

        <div className="flex flex-col items-start">
          <span className="font-cinzel text-xs font-bold tracking-[0.15em] text-royal-blue-950 uppercase leading-none">
            {isLoading ? 'Redirecting...' : 'Continue with Google'}
          </span>
          <span className="font-sans text-[10px] text-gray-400 font-medium mt-0.5">
            {isLoading ? 'Please wait' : 'Secure sign-in via Google'}
          </span>
        </div>

        {/* Arrow indicator */}
        {!isLoading && (
          <svg
            className="w-4 h-4 text-gray-300 group-hover:text-gold-500 transition-colors duration-300 ml-auto flex-shrink-0"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {/* Trust Badges */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-1.5 text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="font-sans text-[9px] uppercase tracking-wider font-semibold">Secured</span>
        </div>
        <div className="w-px h-3 bg-gray-200" />
        <div className="flex items-center gap-1.5 text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="font-sans text-[9px] uppercase tracking-wider font-semibold">Private</span>
        </div>
        <div className="w-px h-3 bg-gray-200" />
        <div className="flex items-center gap-1.5 text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="font-sans text-[9px] uppercase tracking-wider font-semibold">Instant</span>
        </div>
      </div>

      {/* Bottom Note */}
      <p className="text-center font-sans text-[10px] text-gray-400 leading-relaxed mt-6 px-2">
        By continuing, you agree to our{' '}
        <span className="text-royal-blue-800 font-semibold cursor-pointer hover:text-gold-700 transition-colors">Terms of Service</span>
        {' '}&amp;{' '}
        <span className="text-royal-blue-800 font-semibold cursor-pointer hover:text-gold-700 transition-colors">Privacy Policy</span>.
      </p>

    </div>
  );
}
