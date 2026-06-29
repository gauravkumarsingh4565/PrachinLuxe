"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import bannerImg from '../../assets/images/hero_banner 2.png';
import { products } from '@/data/products';

// Subcategory images
import catDisc from '../../assets/images/cat_disc.png';
import catSignature from '../../assets/images/cat_signature.png';
import catEvilEye from '../../assets/images/cat_evil_eye.png';
import catJhumka from '../../assets/images/cat_jhumka.png';
import catStud from '../../assets/images/cat_stud.png';
import catFestive from '../../assets/images/cat_festive.png';
import catJhumki from '../../assets/images/cat_jhumki.png';
import catLoopsHoops from '../../assets/images/cat_loops_hoops.png';

const subcategories = [
  { name: 'Disc', img: catDisc },
  { name: 'Signature', img: catSignature },
  { name: 'Evil Eye', img: catEvilEye },
  { name: 'Jhumka', img: catJhumka },
  { name: 'Stud', img: catStud },
  { name: 'Festive', img: catFestive },
  { name: 'Jhumki', img: catJhumki },
  { name: 'Loops & Hoops', img: catLoopsHoops },
];

const earringProducts = products.filter(p => p.category === 'Earrings');

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
        {product.subcategory}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
        <button className="w-full py-2 rounded-lg bg-white/95 backdrop-blur-sm text-royal-blue-900 font-semibold text-xs tracking-wide hover:bg-gold-500 hover:text-white transition-colors duration-300 shadow-md" aria-label={`View ${product.name} details`}>
          VIEW DETAILS
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
        {product.originalPrice && (
          <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">
            Rs. {product.originalPrice}
          </span>
        )}
      </div>
    </div>
  </Link>
);

const EarringItem = () => {
  const [activeSubcat, setActiveSubcat] = useState(null);
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (categoryQuery) {
      const matched = subcategories.find(
        (c) => c.name.toLowerCase() === categoryQuery.toLowerCase()
      );
      if (matched) {
        setActiveSubcat(matched.name);
      }
    }
  }, [categoryQuery]);

  const filteredProducts = activeSubcat
    ? earringProducts.filter((p) => p.subcategory === activeSubcat)
    : earringProducts;

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src={bannerImg}
          alt="Handmade Earrings Collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-royal-blue-950/30"></div>
        {/* Banner Text Overlay */}
        <div className="relative z-10 text-center px-4">
          <p className="font-cinzel text-[11px] tracking-[0.35em] uppercase text-white/70 mb-2">Prachin Luxe</p>
          <h1 className="font-cinzel-decorative text-4xl sm:text-5xl lg:text-6xl text-white font-bold drop-shadow-lg tracking-wide">
            Exquisite Earrings
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gold-400/60" />
            <span className="text-gold-400 text-sm">◆</span>
            <div className="h-px w-16 bg-gold-400/60" />
          </div>
        </div>
      </div>

      {/* ── Shop by Category Section ── */}
      <section className="bg-white py-10 px-4 border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-center font-cinzel text-2xl sm:text-3xl text-royal-blue-900 font-bold mb-8 tracking-wide">
            Shop Earring Category
          </h2>

          {/* Scrollable row — same style as reference image */}
          <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto pb-3 scrollbar-hide justify-start sm:justify-center flex-nowrap">
            {subcategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveSubcat(activeSubcat === cat.name ? null : cat.name)}
                className="flex flex-col items-center gap-2 flex-shrink-0 group"
              >
                {/* Square image card with rounded corners, same style as reference */}
                <div
                  className={`w-[100px] sm:w-[112px] lg:w-[120px] aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-105 ${
                    activeSubcat === cat.name
                      ? 'border-gold-500 shadow-gold-300/50 shadow-md scale-105'
                      : 'border-gray-200 group-hover:border-gold-400'
                  }`}
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Label below image */}
                <span
                  className={`font-cormorant text-[14px] sm:text-[15px] font-medium transition-colors duration-200 ${
                    activeSubcat === cat.name
                      ? 'text-gold-600 font-semibold'
                      : 'text-gray-700 group-hover:text-royal-blue-800'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* Active filter chip */}
          {activeSubcat && (
            <div className="flex justify-center mt-5">
              <span className="inline-flex items-center gap-2 bg-sand-100 border border-gold-400/40 text-royal-blue-800 text-sm font-semibold px-4 py-1.5 rounded-full">
                Showing: {activeSubcat}
                <button
                  onClick={() => setActiveSubcat(null)}
                  className="ml-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className="bg-sand-100 min-h-screen py-12 px-4 border-t border-gold-500/10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="font-cormorant text-[15px] text-gray-500">
              Showing <span className="font-bold text-royal-blue-900">{filteredProducts.length}</span> items
              {activeSubcat && <span className="text-gold-600"> in "{activeSubcat}"</span>}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 font-cormorant text-2xl text-royal-blue-800/50">
              No items found in this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default EarringItem;
