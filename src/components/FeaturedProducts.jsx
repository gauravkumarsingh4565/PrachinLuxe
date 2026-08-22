"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = ['Earrings', 'Necklaces', 'Sets', 'Najarbattu', 'Hairpin'];

const ProductCard = ({ product }) => {
  const id = product._id || product.id;
  
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
    href={`/product/${id}`}
    // Fixed width aur snap classes hata di hain, ab ye grid cell me fit hoga
    className="group relative bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col font-cormorant shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-sand-200/50 hover:border-gold-300/50"
  >
    <div className="relative aspect-square overflow-hidden bg-sand-50">
      <Image
        src={imageUrl}
        alt={product.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
        <span className="font-bold text-gray-800">{product.rating || "4.9"}</span>
        <span className="text-gray-500">({product.reviews || "128"})</span>
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
)};

const FeaturedProducts = ({ dbProducts = [] }) => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Earrings');

  // Helper to match categories robustly (handles "Najar Battu" vs "Najarbattu", "Hair Pins" vs "Hairpin")
  const isCategoryMatch = (cat1, cat2) => {
    if (!cat1 || !cat2) return false;
    const normalize = (c) => c.toLowerCase().replace(/[^a-z]/g, '').replace(/s$/, '');
    return normalize(cat1) === normalize(cat2);
  };

  // Filter DB products exclusively
  let filteredProducts = dbProducts.filter(product => isCategoryMatch(product.category, activeCategory));

  // Fir .slice(0, 5) use karke exactly 5 products restrict kar diye
  const displayProducts = filteredProducts.slice(0, 5);

  return (
    <section className="bg-sand-100 py-6 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">

          {/* Categories */}
          <div className="flex items-center gap-6 sm:gap-12 mb-6 overflow-x-auto scrollbar-hide pb-2 flex-nowrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 font-cormorant text-2xl sm:text-3xl transition-all duration-500 pb-1 relative group ${activeCategory === category
                  ? 'text-royal-blue-900 font-bold'
                  : 'text-gray-400 hover:text-gold-600'
                  }`}
              >
                {category}
                <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-gold-600 transition-transform duration-300 origin-left ${activeCategory === category ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
              </button>
            ))}
          </div>

          {/* Grid Layout - Scroll hata diya gaya hai, lg screens pe 5 items exact fit aayenge */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pb-6">
            {displayProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>

          {displayProducts.length === 0 && (
            <div className="text-center py-20 font-cormorant text-2xl text-royal-blue-800/50">
              No products found in this category.
            </div>
          )}
        </div>

        <div className="flex justify-center ">
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

export default FeaturedProducts;