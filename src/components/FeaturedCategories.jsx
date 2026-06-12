import React from 'react';
import earringsImg from '../assets/images/earrings2.png';
import necklaceImg from '../assets/images/neckless.jpg';
import payalImg from '../assets/images/payal.png';
import antiqueImg from '../assets/images/antique.png';

const categories = [
  { name: 'Royal Earrings', items: '48 Pieces', img: earringsImg },
  { name: 'Heritage Necklaces', items: '36 Pieces', img: necklaceImg },
  { name: 'Traditional Payals', items: '24 Pieces', img: payalImg },
  { name: 'Antique Treasures', items: '52 Pieces', img: antiqueImg },
];

const FeaturedCategories = () => {
  return (
    <section className="bg-gradient-to-b from-sand-50 via-sand-100 to-sand-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 sm:w-24 bg-gold-600/40" />
            <span className="text-gold-600 text-lg">◆</span>
            <div className="h-px w-16 sm:w-24 bg-gold-600/40" />
          </div>
          <h2 className="font-cinzel-decorative text-4xl lg:text-5xl text-royal-blue-900 mb-4">
            Royal Collections
          </h2>
          <p className="font-cormorant text-xl text-royal-blue-600/70">
            Explore our curated categories of heritage jewelry
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden border border-gold-500/20 hover:border-gold-500/50 transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-blue-950/80 via-royal-blue-950/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-cinzel text-2xl text-sand-50 mb-1">
                  {category.name}
                </h3>
                <p className="font-cormorant text-gold-300/70">
                  {category.items}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
