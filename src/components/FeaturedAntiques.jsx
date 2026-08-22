"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import bannerImg from '../assets/images/antique2.png';


const ProductCard = ({ product }) => {
  const getImageUrl = () => {
    if (product.images?.front?.url) return product.images.front.url;
    if (typeof product.images?.front === 'string') return product.images.front;
    if (product.images?.left?.url) return product.images.left.url;
    if (product.img) return product.img;
    if (Array.isArray(product.images) && product.images[0]) return product.images[0];
    return '/placeholder.png';
  };
  const imageUrl = getImageUrl();
  
  return (
  <Link
    href={`/product/${product._id || product.id}`}
    className="group relative bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col font-cormorant shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-sand-200/50 hover:border-gold-300/50"
  >
    <div className="relative aspect-square overflow-hidden bg-sand-50">
      <Image
        src={imageUrl}
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


const FeaturedAntiques = ({ dbProducts = [] }) => {
  const router = useRouter();

  // Helper to match categories robustly
  const isCategoryMatch = (cat1, cat2) => {
    if (!cat1 || !cat2) return false;
    const normalize = (c) => c.toLowerCase().replace(/[^a-z]/g, '').replace(/s$/, '');
    return normalize(cat1) === normalize(cat2);
  };

  // Filter products by category 'Antique'
  const antiqueProducts = dbProducts.filter(product => isCategoryMatch(product.category, 'Antique'));

  return (
    <section className="bg-sand-50 py-6 px-4 border-t border-gold-500/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">
          {/* Banner Section */}
          <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden mb-4 shadow-xl group">
            <Image
              src={bannerImg}
              alt="Antique Treasures"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Image is styled with beautiful built-in text */}
          </div>


          <div className="text-center flex flex-col items-center my-2">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-black">
              Antique Products
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pb-6">
            {antiqueProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => router.push('/handmade')}
            className="px-10 py-3.5 bg-royal-blue-900 text-white font-cinzel-decorative text-sm tracking-[0.2em] hover:bg-gold-600 transition-colors duration-500 shadow-md rounded-sm"
          >
            VIEW FULL COLLECTION
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAntiques;
