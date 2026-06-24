"use client";

import React, { useEffect } from 'react';
import bannerImg from '../../assets/images/hero_banner 2.png';
import necklace1 from '../../assets/images/necklace_premium.png';
import necklace2 from '../../assets/images/necklace_2_premium.png';
import necklace3 from '../../assets/images/product_temple_necklace.png';
import necklace4 from '../../assets/images/necklace.png';

const products = [
  {
    name: 'Temple Lakshmi Necklace',
    category: 'Necklaces',
    price: '45,999.00',
    originalPrice: '49,999.00',
    rating: '4.9',
    reviews: '1,204',
    img: necklace1,
  },
  {
    name: 'Emerald Choker Masterpiece',
    category: 'Necklaces',
    price: '75,000.00',
    originalPrice: '82,000.00',
    rating: '5.0',
    reviews: '67',
    img: necklace2,
  },
  {
    name: 'Antique Gold Harram',
    category: 'Necklaces',
    price: '55,500.00',
    originalPrice: '60,000.00',
    rating: '4.8',
    reviews: '312',
    img: necklace3,
  },
  {
    name: 'Classic Kundan Necklace',
    category: 'Necklaces',
    price: '38,999.00',
    originalPrice: '42,999.00',
    rating: '4.7',
    reviews: '189',
    img: necklace4,
  },
];

const ProductCard = ({ product }) => (
  <div className="group relative bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col font-cormorant shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-sand-200/50 hover:border-gold-300/50">
    <div className="relative aspect-square overflow-hidden bg-sand-50">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
        <button className="w-full py-2 rounded-lg bg-white/95 backdrop-blur-sm text-royal-blue-900 font-semibold text-xs tracking-wide hover:bg-gold-500 hover:text-white transition-colors duration-300 shadow-md" aria-label={`Add ${product.name} to cart`}>
          ADD TO CART
        </button>
      </div>
    </div>
    <div className="p-3 sm:p-3.5 flex flex-col flex-grow">
      <h3 className="font-semibold text-[13px] sm:text-[14px] leading-snug text-royal-blue-900 mb-2 flex-grow line-clamp-2">
        {product.name}
      </h3>
      <div className="flex items-center gap-1 mb-2 text-[12px] text-gray-500">
        <span className="text-amber-400 text-[13px] leading-none">★</span>
        <span className="font-bold text-gray-700">{product.rating}</span>
        <span>({product.reviews})</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-bold text-[15px] sm:text-[16px] text-royal-blue-900">
          Rs. {product.price}
        </span>
        <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">
          Rs. {product.originalPrice}
        </span>
      </div>
    </div>
  </div>
);

const NecklaceItem = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={bannerImg}
          alt="Handmade Necklaces Collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-royal-blue-950/30"></div>
      </div>

      <section className="bg-sand-100 min-h-screen py-16 px-4 border-t border-gold-500/20">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 sm:w-20 bg-gold-600/40" />
              <span className="text-gold-600 text-sm">◆</span>
              <div className="h-px w-12 sm:w-20 bg-gold-600/40" />
            </div>
            <h1 className="font-cinzel-decorative text-4xl lg:text-5xl text-royal-blue-900 mb-4 tracking-wide">
              Royal Necklaces
            </h1>
            <p className="font-cormorant text-xl text-royal-blue-600/70 max-w-2xl mx-auto italic">
              Grace your neckline with our majestic handcrafted necklaces, inspired by the grandeur of Indian royalty.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NecklaceItem;
