"use client";

import React, { useState, useEffect } from 'react';
import logoimage from '@/assets/images/newLogo.png';
import { useSession, signOut } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '@/redux/slices/authSlice';

export default function CountdownPage() {
  const { data: session } = useSession();
  const phoneUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const currentUser = phoneUser || session?.user;

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const targetDateStr = process.env.NEXT_PUBLIC_COUNTDOWN_TARGET_DATE || '2026-10-01T00:00:00';

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 600);
  };

  const handleLogout = async () => {
    if (session) {
      await signOut({ redirect: false });
    }
    dispatch(logout());
    window.location.reload();
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-royal-blue-950 text-white flex flex-col justify-between font-cormorant relative select-none">
      {/* Background Subtle Motifs */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-4 flex items-center justify-center sm:justify-start flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
          <span className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
            Exclusive Launch Preview
          </span>
        </div>
      </header>

      {/* Center Main Countdown Container */}
      <main className="relative z-20 max-w-4xl mx-auto px-4 py-2 text-center flex flex-col items-center justify-center my-auto flex-grow">
        
        {/* Prominent Website Logo with Animated Glow */}
        <div className="relative group flex items-center justify-center mb-4 sm:mb-6">
          <div className="absolute inset-0 bg-gold-400/30 rounded-full blur-2xl animate-pulse" />
          
          {/* Sparkling Orbit Jewels */}
          <span className="absolute -top-3 -left-6 text-gold-400 text-base animate-bounce delay-100 opacity-90">✦</span>
          <span className="absolute -bottom-2 -right-6 text-gold-300 text-xl animate-pulse delay-300 opacity-90">✨</span>
          <span className="absolute top-4 -right-8 text-gold-500 text-xs animate-bounce delay-500 opacity-80">✦</span>
          
          <img
            src={logoimage.src || logoimage}
            alt="Prachin Luxy"
            className="h-16 sm:h-24 lg:h-28 w-auto object-contain relative z-10 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-bold tracking-wider uppercase leading-tight mb-3 text-gradient-gold">
          Unveiling The Ancient Riches
        </h1>
        
        <p className="text-sand-200/90 font-sans text-xs sm:text-sm max-w-lg mx-auto leading-relaxed mb-6 sm:mb-8">
          Our handcrafted royal jewelry &amp; historical antique curations are preparing for grand unveiling. Stay tuned for private access.
        </p>

        {/* Live Countdown Timer Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-5 max-w-xl w-full">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md border border-gold-500/30 rounded-2xl p-3 sm:p-5 shadow-2xl flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:border-gold-400"
            >
              <span className="font-cinzel text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gold-400 tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[8px] sm:text-[10px] tracking-[0.2em] text-sand-300 uppercase mt-1.5 font-bold">
                {item.label}
              </span>
            </div>
          ))}
        </div>

      </main>

      {/* Footer Notice */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-4 text-center border-t border-white/10 flex-shrink-0">
        <p className="font-cinzel text-[9px] sm:text-[10px] tracking-[0.2em] text-gold-400/80 uppercase">
          PRACHIN LUXY — Crafting Timeless Royal Heritage
        </p>
      </footer>
    </div>
  );
}
