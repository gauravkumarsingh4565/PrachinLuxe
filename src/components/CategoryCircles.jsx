"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

import { jewelryType } from '@/data/constant';

export default function CategoryCircles() {
  const router = useRouter();
  const pathname = usePathname();

  // Hide category circles on policy, auth, and admin pages
  const hiddenPaths = [
    '/terms-conditions',
    '/privacy-policy',
    '/shipping-policy',
    '/cancellation-return',
    '/login',
    '/signup',
    '/onboarding',
    '/admin',
    '/profile',
    '/orders',
    '/addresses',
    '/cart',
    '/product'
  ];

  if (hiddenPaths.some(path => pathname?.startsWith(path))) {
    return null;
  }

  return (
    <section id="categories" className="w-full bg-sand-50 py-16 sm:py-24 border-b border-gold-500/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading (Optional but adds to premium feel) */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="font-cinzel text-2xl sm:text-3xl text-royal-blue-900 font-bold uppercase tracking-widest">
            Shop by Category
          </h2>
          <div className="w-24 h-0.5 bg-gold-400 mx-auto mt-4" />
        </div>

        {/* Horizontal scrollable wrapper */}
        <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto pb-10 scrollbar-hide justify-start md:justify-center flex-nowrap px-4 mt-8">
          {jewelryType.map((cat, index) => (
            <button
              key={cat.id || index}
              onClick={() => router.push(cat.path)}
              className="group relative flex-shrink-0 w-[180px] h-[250px] sm:w-[220px] sm:h-[300px] lg:w-[280px] lg:h-[380px] rounded-md overflow-hidden shadow-xl hover:shadow-[0_15px_40px_rgba(201,168,76,0.35)] transition-all duration-700 focus:outline-none hover:-translate-y-2"
            >
              {/* Background Image */}
              <Image
                src={cat.image.url}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 280px"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-blue-950/90 via-royal-blue-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Inner Gold Frame Effect on Hover */}
              <div className="absolute inset-4 border border-gold-400/0 group-hover:border-gold-400/60 transition-colors duration-700 pointer-events-none rounded-sm" />

              {/* Category Title Overlay */}
              <div className="absolute bottom-8 left-0 w-full text-center px-4">
                <span className="font-cinzel text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-white tracking-[0.2em] uppercase drop-shadow-lg group-hover:text-gold-300 transition-colors duration-500 block transform group-hover:-translate-y-2">
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
