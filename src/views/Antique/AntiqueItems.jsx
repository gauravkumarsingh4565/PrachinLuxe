"use client";

import React from 'react';
import Link from 'next/link';
import bannerImg from '../../assets/images/antique2.png';
import { products } from '@/data/products';

const antiqueProducts = products.filter(p => p.category === 'Antique');

const ProductCard = ({ product }) => (
  <Link
    href={`/product/${product.id}`}
    className="group relative bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col font-cormorant shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-sand-200/50 hover:border-gold-300/50"
  >
    <div className="relative aspect-square overflow-hidden bg-sand-50">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-royal-blue-900 tracking-wider uppercase shadow-sm">
        {product.category}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>

    {/* Content Area */}
    <div className="p-3 sm:p-4 flex flex-col flex-grow">
      {/* Price — sabse upar */}
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="font-bold text-[17px] sm:text-[19px] text-royal-blue-900 leading-tight">
          Rs. {product.price}
        </span>
        {product.originalPrice && (
          <span className="text-[12px] sm:text-[13px] text-gray-400 line-through">
            Rs. {product.originalPrice}
          </span>
        )}
      </div>

      {/* Rating — beech mein */}
      <div className="flex items-center gap-1.5 mb-2.5 text-[13px]">
        <span className="text-amber-400 text-[16px] leading-none">★</span>
        <span className="font-bold text-gray-800">{product.rating}</span>
        <span className="text-gray-500">({product.reviews})</span>
      </div>

      {/* Product Name */}
      <h3 className="font-bold text-[13px] sm:text-[14px] leading-snug text-royal-blue-900 line-clamp-2 mb-4">
        {product.name}
      </h3>

      {/* VIEW DETAILS Button — Sabse neeche */}
      <div
        className="mt-auto w-full py-2.5 rounded-lg bg-royal-blue-900 text-white text-center font-semibold text-xs tracking-wide group-hover:bg-gold-500 transition-colors duration-300 shadow-md"
      >
        VIEW DETAILS
      </div>
    </div>
  </Link>
);


const AntiqueItems = ({ isHome = false }) => {
  return (
    <div className={`w-full bg-[#0a0705] relative overflow-hidden ${!isHome ? 'min-h-screen' : ''}`}>
      {/* Background Texture/Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a1a10] via-[#0a0705] to-black opacity-80 pointer-events-none"></div>

      {/* Hero Banner - hidden if on home page */}
      {!isHome && (
        <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] flex items-center justify-center overflow-hidden border-b-2 border-gold-900/60">
          <img
            src={bannerImg}
            alt="Antique Treasures Collection"
            className="absolute inset-0 w-full h-full object-cover object-center sepia-[.30]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0705]/80 via-[#1c120c]/60 to-[#0a0705]"></div>
        </div>
      )}

      <section className="relative z-10 py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center mb-24">
            {/* Ancient Header Decor */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-gold-600 to-transparent" />
              <svg className="w-8 h-8 text-gold-500 animate-pulse-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="h-[2px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-gold-600 to-transparent" />
            </div>
            
            <h1 className="font-cinzel-decorative text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-gold-200 via-gold-400 to-gold-700 mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-widest">
              Ancient Relics
            </h1>
            
            <p className="font-cormorant text-2xl text-gold-200/70 max-w-3xl mx-auto leading-relaxed italic">
              "Step into the shadows of history. Each artifact holds the whispers of kings, the secrets of dynasties, and the undeniable magic of a forgotten era."
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pb-6">
            {antiqueProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default AntiqueItems;
