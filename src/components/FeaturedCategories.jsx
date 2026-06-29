import React from 'react';
import earringsImg from '../assets/images/earrings.png';
import necklaceImg from '../assets/images/neckless.jpg';
import payalImg from '../assets/images/payal.png';
import antiqueImg from '../assets/images/antique.png';
import exploreButtonImg from '../assets/images/explore_button.png';

// SVG path for the ornate motifs, modeled after image_1.png
const ornateMotifPath = "M64.6 31.8c-1.3 2.1-1 5.3.6 7 1.6 1.7 5.1 2.3 7 1.1s2.3-5.1 1.1-7-5.1-2.3-7-1.1c-1.7 1.1-2.7 0-3.3-1.6-.6-1.6-.6-2.9 0-3.9 1-1.6 3.9-1.3 5.3-.3s1.6 3.9.6 5.3c-1.1 1.7-.3 3 1.1 3.3s3-.3 3.3-1.1l1 2.1c1 2.1 3 3.3 5.3 3.3 2.6 0 4.9-1.6 5.6-4.2s0-5.1-1.6-7.3l-2.1 1c-1 2.1-3.3 3.3-5.3 3.3s-3.9-1-5.3-3c-1.3-1.9-2.1-4.2-2.1-6.7 0-2.6 1.3-4.9 3.3-6.6l1 2.1c1.3 1.9 3 3 5.3 3s4.2-.6 5.6-2.1c1.3-1.3 2.1-3 2.1-4.9s-1-3.9-3-5.3l-2.1 1c2.1 1 3.3 3.3 3.3 5.3s-1 3.9-3 5.3c-1.6 1.1-3.9 1-5.3 0-1.6-1.1-2.6-3.3-2.6-5.3s.6-3.9 2-5.3c1.6-1.6 3.9-1.6 5.3-.6l1 2.1c-1.1-.3-2.6.3-3.6 1.6s-.3 3.6 1.3 4.6 3.6.3 4.6-1.3l-2.1-1c-1.3 1.3-1.6 3.3-.6 4.9 1 1.6 3.3 2.6 5.3 2.6 2.1 0 4.2-1 5.6-3 1.6-2.1 1.6-4.9.3-7l-1 2.1c1 2.1 0 4.2-1.6 5.6s-3.9 1-5.6-1c-1.7-2.1-1-4.6 1-6.3L64.6 31.8c-1.6-.6-3 0-3.9 1s-1 2.6-.6 3.9 1.6 2.6 3.6 2.6h3.6l1 2.1c1.3 1.1 2.6.6 3.3-.6.6-1 0-2.3-1.3-3.6s-3.3-1.6-5.3-1.6-3.9 1.3-5.3 3.3L64.6 31.8z";

const collections = [
  {
    name: 'Brass Jewelry',
    description: 'Experience the timeless beauty of hand-carved, traditional indian brass. Each piece is a masterpiece of artisan skill and filigree work.',
    buttonText: 'Explore Brass',
    img: earringsImg
  },
  {
    name: 'Antique Collection',
    description: 'Curated with rare, authentic vintage and heirloom jewelry, showcasing centuries of craftsmanship and unique history.',
    buttonText: 'Discover Antiques',
    img: antiqueImg
  },
];

const FeaturedCategories = () => {
  return (
    // TOP PADDING KAM KI: py-10 ki jagah pt-4 pb-10 use kiya hai (sirf upar se gap kam karne ke liye)
    <section className="bg-sand-100 from-sand-50 via-sand-100 to-sand-50 pt-4 pb-6 px-2">
      <div className="max-w-7xl mx-auto overflow-visible">

        {/* TOP MARGIN KAM KI: Yahan pehlay mb-16 tha jo extra gap de raha tha. Maine isko mb-4 kar diya hai */}
        <div className="text-center mb-2">
          {/* Header content commented out as per your original code */}
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 overflow-visible">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="group relative overflow-visible h-[240px] md:h-[300px] flex items-center justify-center rounded-sm transition-transform duration-500 hover:scale-[1.02]"
            >
              {/* Background Image */}
              <img
                src={collection.img}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />

              {/* Dark Overlay for text readability */}
              <div className="absolute inset-0 bg-black/65 z-10" />

              {/* Elegant Inner Gold Border */}
              <div className="absolute inset-3 sm:inset-4 border border-gold-500/50 pointer-events-none z-30" />

              {/* Centered Content */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 sm:px-12 w-full">
                <h3 className="font-cinzel text-2xl md:text-3xl text-gold-400 mb-2 tracking-wide">
                  {collection.name}
                </h3>
                <p className="font-cormorant text-gray-200 text-[15px] mb-6 max-w-md leading-relaxed hidden sm:block">
                  {collection.description}
                </p>

                {/* Image Button */}
                <button className="relative flex items-center justify-center p-0 transition-transform duration-300 hover:scale-105 overflow-visible mt-2 group">
                  <img
                    src={exploreButtonImg}
                    alt={collection.buttonText}
                    className="h-10 md:h-12 w-auto object-contain drop-shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;