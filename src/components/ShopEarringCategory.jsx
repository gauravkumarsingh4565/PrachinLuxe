import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import catDisc from '../assets/images/cat_disc.png';
import catSignature from '../assets/images/cat_signature.png';
import catEvilEye from '../assets/images/cat_evil_eye.png';
import catJhumka from '../assets/images/cat_jhumka.png';
import catStud from '../assets/images/cat_stud.png';
import catFestive from '../assets/images/cat_festive.png';
import catJhumki from '../assets/images/cat_jhumki.png';
import catLoopsHoops from '../assets/images/cat_loops_hoops.png';

const earringCategories = [
  { name: 'Disc', image: catDisc },
  { name: 'Signature', image: catSignature },
  { name: 'Evil Eye', image: catEvilEye },
  { name: 'Jhumka', image: catJhumka },
  { name: 'Stud', image: catStud },
  { name: 'Festive', image: catFestive },
  { name: 'Jhumki', image: catJhumki },
  { name: 'Loops & Hoops', image: catLoopsHoops },
];

const ShopEarringCategory = () => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.65;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/jewelry/earrings?category=${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  return (
    // Yahan maine py-6 sm:py-8 ko change karke py-2 sm:py-4 kar diya hai
    <section className="bg-sand-50 py-2 sm:py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

        {/* Section Header */}
        {/* Title aur slider ke beech ka space kam karne ke liye mb-8 sm:mb-10 ko mb-4 sm:mb-6 kar diya hai */}
        <div className="text-center mb-4 sm:mb-6">
          {/* Decorative top element */}
          <div className="flex items-center justify-center gap-3 mb-2 sm:mb-3">
            <span className="block w-10 sm:w-16 h-px bg-gradient-to-r from-transparent to-gold-400" />
            <span className="text-gold-500 text-xs tracking-[0.35em] font-cormorant uppercase">
              Explore
            </span>
            <span className="block w-10 sm:w-16 h-px bg-gradient-to-l from-transparent to-gold-400" />
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-sand-950 tracking-wide">
            Shop Earring Category
          </h2>

          {/* Decorative bottom divider */}
          <div className="flex items-center justify-center gap-2 mt-2 sm:mt-3">
            <span className="block w-8 sm:w-12 h-px bg-gold-300/60" />
            <span className="text-gold-500 text-sm">◆</span>
            <span className="block w-8 sm:w-12 h-px bg-gold-300/60" />
          </div>
        </div>

        {/* Scrollable Container with Arrows */}
        <div className="relative group/container">

          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-gold-200 text-gold-700 shadow-gold transition-all duration-300 hover:bg-gold-50 hover:border-gold-400 hover:shadow-gold-lg -translate-x-1 sm:-translate-x-3 ${
              canScrollLeft
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll categories left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm border border-gold-200 text-gold-700 shadow-gold transition-all duration-300 hover:bg-gold-50 hover:border-gold-400 hover:shadow-gold-lg translate-x-1 sm:translate-x-3 ${
              canScrollRight
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll categories right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Fade Edges */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-sand-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-sand-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto pb-2 px-1 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {earringCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="group flex-shrink-0 flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 rounded-xl"
                aria-label={`Shop ${cat.name} earrings`}
              >
                {/* Image Card */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl overflow-hidden bg-sand-100 border border-sand-200/60 shadow-sm transition-all duration-500 group-hover:shadow-gold group-hover:border-gold-300/60 group-hover:-translate-y-1.5">
                  
                  <img
                    src={cat.image}
                    alt={`${cat.name} earrings`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Hover Gold Shimmer Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gold-500/15 via-transparent to-gold-300/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Subtle corner accent */}
                  <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-gold-400/0 group-hover:border-gold-400/50 transition-all duration-500 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-gold-400/0 group-hover:border-gold-400/50 transition-all duration-500 rounded-br-xl" />
                </div>

                {/* Category Name */}
                <span className="mt-2.5 sm:mt-3 font-cormorant text-sm sm:text-base text-sand-800 tracking-wide group-hover:text-gold-700 transition-colors duration-300 font-semibold">
                  {cat.name}
                </span>

                {/* Hover underline accent */}
                <span className="block w-0 group-hover:w-full h-px bg-gold-400/60 transition-all duration-500 mt-0.5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopEarringCategory;