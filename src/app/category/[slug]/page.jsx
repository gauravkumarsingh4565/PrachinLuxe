"use client";

import React, { useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/constant';

import bannerImg from '@/assets/images/hero_banner 2.png';

const ProductCard = ({ product }) => (
  <Link
    href={`/product/${product.id}`}
    className="group relative bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col font-cormorant shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-sand-200/50 hover:border-gold-300/50"
  >
    <div className="relative aspect-square overflow-hidden bg-sand-50">
      <Image
        src={product.img}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-royal-blue-900 tracking-wider uppercase shadow-sm">
        {product.category}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>

    {/* Content Area */}
    <div className="p-3 sm:p-4 flex flex-col flex-grow">
      {/* Price */}
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

      {/* Rating */}
      <div className="flex items-center gap-1.5 mb-2.5 text-[13px]">
        <span className="text-amber-400 text-[16px] leading-none">★</span>
        <span className="font-bold text-gray-800">{product.rating}</span>
        <span className="text-gray-500">({product.reviews})</span>
      </div>

      {/* Product Name */}
      <h3 className="font-bold text-[13px] sm:text-[14px] leading-snug text-royal-blue-900 line-clamp-2 mb-4">
        {product.name}
      </h3>

      {/* VIEW DETAILS Button */}
      <div
        className="mt-auto w-full py-2.5 rounded-lg bg-royal-blue-900 text-white text-center font-semibold text-xs tracking-wide group-hover:bg-gold-500 transition-colors duration-300 shadow-md"
      >
        VIEW DETAILS
      </div>
    </div>
  </Link>
);


export default function CategoryPage({ params }) {
  // Use `use` hook to unwrap params since it's a promise in Next.js 15
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
    // Map slug to actual category name in products.js
  const categoryMap = {
    'sets': 'Sets',
    'earrings': 'Earrings',
    'necklaces': 'Necklaces',
    'najar-battu': 'Najarbattu',
    'hair-pins': 'Hairpin',
    'new-arrivals': 'New Arrivals'
  };

  const currentCategoryName = categoryMap[slug] || 'Products';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Filter products based on category
  let displayProducts = [];
  if (slug === 'new-arrivals') {
    // For new arrivals, just take the first 8 products for now
    displayProducts = products.slice(0, 8);
  } else {
    displayProducts = products.filter(p => p.category === currentCategoryName);
  }

  const filteredProducts = displayProducts;

  // Format title for display
  const displayTitle = currentCategoryName.replace(/([A-Z])/g, ' $1').trim();

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative w-full h-[30vh] sm:h-[40vh] lg:h-[50vh] flex items-center justify-center overflow-hidden">
        <Image
          src={bannerImg}
          alt={displayTitle}
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-royal-blue-950/40"></div>
        {/* Banner Text Overlay */}
        <div className="relative z-10 text-center px-4">
          <p className="font-cinzel text-[11px] tracking-[0.35em] uppercase text-gold-300 mb-2">Prachin Luxe Collection</p>
          <h1 className="font-cinzel-decorative text-4xl sm:text-5xl lg:text-6xl text-white font-bold drop-shadow-lg tracking-wide capitalize">
            {displayTitle}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gold-400/60" />
            <span className="text-gold-400 text-sm">◆</span>
            <div className="h-px w-16 bg-gold-400/60" />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="bg-sand-50 min-h-[50vh] py-12 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="font-cormorant text-[15px] text-gray-500">
              Showing <span className="font-bold text-royal-blue-900">{filteredProducts.length}</span> items
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 font-cormorant text-2xl text-royal-blue-800/50">
              No items found in this category yet. We are crafting new pieces!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
