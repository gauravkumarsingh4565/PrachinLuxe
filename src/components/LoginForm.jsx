"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      {/* Brand Header */}
      <div className="text-center mb-8">
        <span className="font-cinzel-decorative text-xl sm:text-2xl font-bold tracking-widest text-royal-blue-900">
          PRACHIN LUXE
        </span>
        <p className="text-gold-700 font-cinzel text-[9px] tracking-[0.2em] uppercase mt-1">
          Handcrafted Jewelry & Antiques
        </p>
        <div className="h-px bg-gold-200/50 w-24 mx-auto mt-4" />
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
