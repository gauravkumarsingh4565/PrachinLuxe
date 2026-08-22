"use client";

import React, { useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
          <span className="font-bold text-gray-800">{product.rating || "4.9"}</span>
          <span className="text-gray-500">({product.reviews || "128"})</span>
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
  )
};


export default function CategoryPage({ params }) {
  // Use `use` hook to unwrap params since it's a promise in Next.js 15
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const [dbProducts, setDbProducts] = React.useState([]);

  // Map slug to actual category name in products.js
  const categoryMap = {
    'sets': 'Sets',
    'earrings': 'Earrings',
    'necklaces': 'Necklaces',
    'najar-battu': 'Najarbattu',
    'hair-pins': 'Hairpin',
    'new-arrivals': 'New Arrivals'
  };

  const currentCategoryName = categoryMap[slug] || slug;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success) {
          setDbProducts(data.products);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  // Helper to match categories robustly
  const isCategoryMatch = (cat1, cat2) => {
    if (!cat1 || !cat2) return false;
    const normalize = (c) => c.toLowerCase().replace(/[^a-z]/g, '').replace(/s$/, '');
    return normalize(cat1) === normalize(cat2);
  };

  // Filter products based on category exclusively
  let displayProducts = [];
  if (slug === 'new-arrivals') {
    displayProducts = dbProducts.filter(p => p.isNewArrival);
  } else {
    displayProducts = dbProducts.filter(p => isCategoryMatch(p.category, currentCategoryName));
  }

  const filteredProducts = displayProducts;

  // Format title for display
  const displayTitle = currentCategoryName.replace(/([A-Z])/g, ' $1').trim();

  return (
    <div className="w-full bg-sand-50 min-h-screen">
      {/* Products Section */}
      <section className="min-h-[50vh] py-10 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Top Bar: Count & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 pb-4 border-b border-gold-500/20 gap-4">
            <p className="font-cormorant text-lg text-gray-500 italic">
              Showing <span className="font-bold text-gold-700 not-italic">{filteredProducts.length}</span> exclusive items
            </p>
            {/* Premium Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="font-cinzel text-gray-400 text-[11px] uppercase tracking-widest font-bold">Sort By</span>
              <select className="bg-transparent font-cormorant text-royal-blue-900 font-bold text-lg border-b-2 border-gold-400/50 hover:border-gold-500 focus:border-gold-600 focus:outline-none cursor-pointer pb-1 transition-colors">
                <option>Featured</option>
                <option>Newest Arrivals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pb-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 flex flex-col items-center justify-center">
              <div className="w-20 h-20 mb-6 text-gold-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-royal-blue-900 font-bold mb-3">Collection in Progress</h3>
              <p className="font-cormorant text-xl text-gray-500 max-w-md mx-auto mb-8">
                Our master artisans are currently crafting new pieces for this category. Please check back soon.
              </p>
              <Link href="/#collections" className="px-8 py-3 bg-white border border-gold-400 text-royal-blue-900 font-cinzel font-bold text-xs tracking-[0.2em] hover:bg-gold-50 transition-colors shadow-sm">
                EXPLORE COLLECTIONS
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
