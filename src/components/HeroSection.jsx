"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const handleScrollToCategories = () => {
    const categorySection = document.getElementById('categories');
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      onClick={handleScrollToCategories}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center cursor-pointer"
    >
      {/* 3D Image Background */}
      <div className="absolute inset-0 w-full h-full z-0 transform scale-105 animate-float origin-center">
        <Image
          src="/assets/images/hero-ad-jewelry.jpg"
          alt="High-End Jewelry Advertisement Campaign"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Aesthetic Overlay: Darker edges to frame the text, transparent center for the image */}
      <div className="absolute inset-0 bg-royal-blue-950/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-royal-blue-950/60 via-transparent to-royal-blue-950/80 z-10" />

      {/* Premium Editorial Layout Container */}
      <div className="relative z-20 w-full h-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Left Side: Main Title */}
        <div className="absolute top-[30%] sm:top-[35%] left-6 sm:left-10 lg:left-16 max-w-2xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-cinzel font-bold text-white drop-shadow-2xl mb-4 animate-slide-right leading-[1.1]">
            Timeless <br />
            <span className="font-light italic text-gold-200">Elegance</span> <br />
            <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent animate-pulse-gold text-4xl sm:text-5xl lg:text-6xl mt-4 inline-block">
              & Royal Heritage
            </span>
          </h1>
        </div>

        {/* Right Side: Description and CTA (Bottom Right) */}
        <div className="absolute bottom-[10%] sm:bottom-[15%] right-6 sm:right-10 lg:right-16 max-w-lg text-right flex flex-col items-end">
          <p className="text-xl sm:text-2xl text-white/90 font-cormorant italic font-light mb-8 animate-slide-left drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
            Discover meticulously handcrafted antique jewelry that echoes the grandeur of ancient royals.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-left" style={{ animationDelay: '0.4s' }}>
            <Link href="/#about" className="px-8 py-3 bg-transparent border border-white/50 hover:border-gold-400 hover:text-gold-400 text-white font-bold font-cinzel text-sm uppercase tracking-widest transition-all duration-500 rounded-sm backdrop-blur-sm">
              Our Story
            </Link>
            <Link href="/#collections" className="px-8 py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 hover:from-gold-500 hover:via-gold-400 hover:to-gold-500 text-royal-blue-950 font-bold font-cinzel text-sm uppercase tracking-widest transition-all duration-500 rounded-sm shadow-gold-lg">
              Explore
            </Link>
          </div>
        </div>

      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/80 hover:text-gold-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
