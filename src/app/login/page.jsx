"use client";

import React, { useState, useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const { user: phoneUser, isLoaded: isPhoneAuthLoaded } = useAuth();
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const isNextAuthLoaded = status !== 'loading';
  const isLoaded = isPhoneAuthLoaded && isNextAuthLoaded;
  const user = phoneUser || session?.user;

  useEffect(() => {
    if (!isLoaded) return;

    // Phone auth user
    if (phoneUser) {
      router.push(callbackUrl);
      return;
    }

    // Google / NextAuth user
    if (session?.user) {
      console.log('[LOGIN PAGE] User logged in:', {
        email: session.user.email,
        name: session.user.name,
        isOnboarded: session.user.isOnboarded,
      });

      if (session.user.isOnboarded === false) {
        console.log('[LOGIN PAGE] New user detected → Redirecting to /onboarding');
        router.push('/onboarding');
      } else {
        console.log('[LOGIN PAGE] Existing user → Redirecting to', callbackUrl);
        router.push(callbackUrl);
      }
    }
  }, [isLoaded, phoneUser, session, router]);
  
  const carouselItems = [
    {
      img: '/src/assets/images/bridal_collection.png',
      title: 'Bridal Heritage',
      subtitle: 'Handcrafted masterpieces inspired by ancient royal courts'
    },
    {
      img: '/src/assets/images/explore_all_jewelry.png',
      title: 'Heritage Treasures',
      subtitle: 'Consolidated collections of fine payals, sets, and bracelets'
    },
    {
      img: '/src/assets/images/necklace_premium_display.png',
      title: 'Temple Kundan',
      subtitle: 'Divine temple jewelry detailing with gold polish and stones'
    },
    {
      img: '/src/assets/images/artwork_richa.png',
      title: 'Royal Antiques',
      subtitle: 'Rare historical artifacts and vintage jewelry curations'
    }
  ];

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-sand-100 flex items-center justify-center font-cormorant relative overflow-hidden">
      {/* Background Subtle Motifs */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#C9A84C_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Split Layout Container */}
      <div className="max-w-[1000px] w-full mx-4 grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-gold border border-gold-500/10 z-10">
        
        {/* Left Side: Auto-Scrolling Image Slideshow */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-royal-blue-950 relative overflow-hidden text-white min-h-[580px]">
          
          {/* Slideshow Images with Fade & Ken Burns Zoom Effect */}
          {carouselItems.map((item, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === activeImgIndex ? 'opacity-40 z-0' : 'opacity-0 -z-10'
              }`}
            >
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-out ${
                  idx === activeImgIndex ? 'scale-110' : 'scale-100'
                }`}
                style={{ backgroundImage: `url('${item.img}')` }}
              />
            </div>
          ))}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-royal-blue-950 via-royal-blue-950/70 to-transparent z-10" />
          
          {/* Logo / Top Section */}
          <div className="relative z-20 flex flex-col items-start">
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

          {/* Core Branding & Dynamic Slide Text Info */}
          <div className="relative z-20 space-y-4">
            {/* Slide Index Indicators / Dots */}
            <div className="flex gap-2 mb-2">
              {carouselItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === activeImgIndex ? 'w-8 bg-gold-400' : 'w-2 bg-white/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Dynamic Titles */}
            <div className="min-h-[100px] flex flex-col justify-end">
              <h1 className="font-cinzel text-3xl font-bold tracking-wide leading-snug animate-fade-in">
                {carouselItems[activeImgIndex].title}
              </h1>
              <p className="text-sm text-sand-200/90 font-sans leading-relaxed mt-2 transition-all duration-500">
                {carouselItems[activeImgIndex].subtitle}
              </p>
            </div>
            
            <div className="pt-4 flex items-center gap-6 text-[10px] uppercase font-bold text-gold-400 tracking-wider font-cinzel border-t border-white/10">
              <span>★ 100% Certified</span>
              <span>★ Insured Shipping</span>
            </div>
          </div>
        </div>

        {/* Right Side: LoginForm Component */}
        <div className="flex items-center justify-center p-8 sm:p-14 bg-sand-50/50 min-h-[580px]">
          <LoginForm />
        </div>

      </div>
    </div>
  );
}
