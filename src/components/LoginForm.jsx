"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const { loginWithPhone, isLoaded } = useAuth();
  const router = useRouter();
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [step, setStep] = useState(1); // 1 = Phone Input, 2 = OTP Verification
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [simulatedOtp, setSimulatedOtp] = useState('');
  
  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Timer for resend OTP
  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate 10-digit Indian phone number
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate sending OTP
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
      setCountdown(30);
      // Generate a simple simulated 4-digit code
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setSimulatedOtp(code);
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    // Only accept numbers
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next field
    if (value !== '' && index < 3) {
      otpRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace handles focusing back
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    setError('');

    if (enteredOtp.length !== 4) {
      setError('Please enter all 4 digits of the verification code.');
      return;
    }

    if (enteredOtp !== simulatedOtp) {
      setError('Invalid OTP code. Please try again.');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      const res = loginWithPhone(phone);
      if (res.success) {
        // User logged in, redirect home
        router.push('/');
      } else if (res.reason === 'unregistered') {
        // User doesn't exist, redirect to signup with pre-filled phone query param
        router.push(`/signup?phone=${encodeURIComponent(phone)}`);
      }
    }, 1200);
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;
    setCountdown(30);
    setOtp(['', '', '', '']);
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedOtp(code);
    setError('');
  };

  return (
    <div className="w-full max-w-[450px] bg-white rounded-2xl border border-gold-500/20 shadow-gold-lg p-6 sm:p-10 font-cormorant flex flex-col justify-center animate-fade-in-up">
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

      {step === 1 ? (
        /* Step 1: Phone Number */
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-royal-blue-950 uppercase tracking-wide">Login / Register</h2>
            <p className="text-xs text-gray-500 font-medium">Verify your identity using a mobile verification code.</p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-sans font-semibold text-center animate-fade-in">
              {error}
            </div>
          )}

          <div className="space-y-2">
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
                placeholder="Enter 10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="flex-grow px-4 py-3.5 focus:outline-none bg-transparent font-medium text-gray-800 tracking-wider"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending Code...
              </>
            ) : 'Get Verification Code'}
          </button>
        </form>
      ) : (
        /* Step 2: OTP Verification */
        <form onSubmit={handleVerifyOtp} className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-cinzel text-lg sm:text-xl font-bold text-royal-blue-950 uppercase tracking-wide">Enter Verification Code</h2>
            <p className="text-xs text-gray-500 font-medium">We sent a 4-digit verification code to <span className="font-bold text-royal-blue-900">+91 {phone}</span></p>
          </div>

          {/* SIMULATED OTP DISPLAY FOR EASY USER TESTING */}
          {simulatedOtp && (
            <div className="p-3 bg-gold-50 text-gold-800 border border-gold-300/40 rounded-lg text-xs font-sans font-bold text-center flex flex-col gap-1 items-center justify-center">
              <span>[SIMULATED SMS OTP]</span>
              <span className="text-lg tracking-widest text-royal-blue-900 font-bold font-mono">{simulatedOtp}</span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-sans font-semibold text-center">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="font-bold text-royal-blue-900 uppercase text-[10px] tracking-widest font-cinzel block text-center mb-3">
              Verification Code
            </label>
            <div className="flex justify-center gap-3 sm:gap-4 font-sans">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  maxLength={1}
                  required
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold text-royal-blue-950 border border-gold-500/30 focus:border-gold-500 focus:outline-none bg-sand-50/50 rounded-lg shadow-inner shadow-black/5"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-royal-blue-900 hover:bg-gold-600 text-white rounded-lg font-cinzel text-xs font-bold tracking-widest transition-all duration-300 hover:shadow-lg uppercase flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : 'Verify & Continue'}
          </button>

          <div className="flex flex-col items-center justify-center gap-2 pt-2 border-t border-gray-100 font-sans text-xs">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={countdown > 0}
              className={`font-semibold tracking-wide uppercase ${countdown > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gold-700 hover:text-gold-900'}`}
            >
              {countdown > 0 ? `Resend Code in ${countdown}s` : 'Resend Verification Code'}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp(['', '', '', '']);
                setError('');
              }}
              className="text-royal-blue-700 font-semibold hover:text-gold-700 uppercase tracking-wide mt-1"
            >
              Change Mobile Number
            </button>
          </div>
        </form>
      )}

      {/* Google Sign In option */}
      <div className="mt-6 flex flex-col gap-4 font-sans text-xs">
        <div className="flex items-center gap-3">
          <div className="h-[1px] bg-gold-500/20 flex-grow" />
          <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Or Login With</span>
          <div className="h-[1px] bg-gold-500/20 flex-grow" />
        </div>

        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full py-3 px-4 border border-gold-500/30 hover:border-gold-500 bg-sand-50/50 hover:bg-gold-50 text-royal-blue-950 font-semibold tracking-wide rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>
      </div>

      {/* Guest checkout links / sign up redirect */}
      <div className="mt-8 border-t border-gold-200/30 pt-6 text-center text-xs">
        <span className="text-gray-500 font-medium">New to Prachin Luxe? </span>
        <Link
          href={`/signup?phone=${encodeURIComponent(phone)}`}
          className="text-royal-blue-800 font-bold hover:text-gold-700 underline font-cinzel tracking-wider"
        >
          Sign Up Here
        </Link>
      </div>
    </div>
  );
}
