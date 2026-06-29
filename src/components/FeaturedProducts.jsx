"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { products } from '@/data/products';

// Categories array same as before
const categories = ['Earrings', 'Necklaces', 'Sets', 'Bracelets', 'Rings', 'Najarbattu', 'Hairpin'];

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
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
        <button className="w-full py-2 rounded-lg bg-white/95 backdrop-blur-sm text-royal-blue-900 font-semibold text-xs tracking-wide hover:bg-gold-500 hover:text-white transition-colors duration-300 shadow-md" aria-label={`View ${product.name} details`}>
          VIEW DETAILS
        </button>
      </div>
    </div>
    <div className="p-3 sm:p-4 flex flex-col flex-grow">
      {/* Price — sabse upar, bada aur bold */}
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
      {/* Product Name — sabse neeche, bold */}
      <h3 className="font-bold text-[13px] sm:text-[14px] leading-snug text-royal-blue-900 line-clamp-2 mt-auto">
        {product.name}
      </h3>
    </div>
  </Link>
);

const FeaturedProducts = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Earrings');

  // Filter products by active category (excluding general Antiques from this grid or including sets/jewelry items only)
  const filteredProducts = products.filter(product => product.category === activeCategory);

  return (
    <section className="bg-sand-100 py-6 px-4">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-6">

          <div className="flex flex-wrap justify-start items-center gap-6 sm:gap-12 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-cormorant text-2xl sm:text-3xl transition-all duration-500 pb-1 relative group ${activeCategory === category
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

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 transition-all duration-500">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 font-cormorant text-2xl text-royal-blue-800/50">
              No products found in this category.
            </div>
          )}
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

export default FeaturedProducts;