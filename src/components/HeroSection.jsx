import React, { useState, useEffect } from 'react';
import heroBanner from '../assets/images/hero_banner.jpg';
import img1 from '../assets/images/antique1.png';
import img2 from '../assets/images/antique2.png';
import img3 from '../assets/images/antique3.png';

const carouselImages = [heroBanner, img1, img2, img3];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full overflow-hidden bg-sand-50">
      {/* Carousel Container */}
      <div className="relative w-full h-[40vh] sm:h-[60vh] lg:h-[85vh] flex items-center justify-center overflow-hidden">
        
        {/* Images */}
        {carouselImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={img}
              alt={`Prachin Luxe Collection ${index + 1}`}
              className="absolute inset-0 w-full h-full  sm:object-cover object-center"
            />
            {/* Dark overlay just at the very bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-royal-blue-950/40 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-sand-50/20 hover:bg-sand-50/50 backdrop-blur-sm text-white/90 hover:text-royal-blue-900 transition-all duration-300 focus:outline-none"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-sand-50/20 hover:bg-sand-50/50 backdrop-blur-sm text-white/90 hover:text-royal-blue-900 transition-all duration-300 focus:outline-none"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicators */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full focus:outline-none ${
                index === currentSlide
                  ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-gold-500'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
