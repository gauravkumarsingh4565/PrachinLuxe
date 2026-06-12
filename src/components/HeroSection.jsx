import React from 'react';
import heroBanner from '../assets/images/hero_banner.jpg';

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-width Banner Image */}
      <div className="relative w-full min-h-[60vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src={heroBanner}
          alt="Prachin Luxe - Handmade Jewelry & Antiques"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay just at the very bottom to ensure badges are visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-royal-blue-950/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Removed the dark full-screen overlay so the background image is clearly visible */}
        
        {/* Text Overlay has been removed as per user request to keep the image clean */}

        {/* Bottom gradient to blend into next section smoothly without darkening the whole image */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-sand-50 via-sand-50/80 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Feature badges - mobile overlay / desktop: part of the banner */}
    

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
        <svg
          className="w-5 h-8 text-gold-600/50"
          viewBox="0 0 24 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="1" y="1" width="22" height="38" rx="11" />
          <circle cx="12" cy="12" r="3" fill="currentColor" className="animate-pulse" />
        </svg>
      </div> */}

      {/* Keyframes */}
      {/* <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}
    </section>
  );
};

export default HeroSection;
