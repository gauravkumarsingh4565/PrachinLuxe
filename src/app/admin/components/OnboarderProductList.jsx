"use client";

import React from 'react';
import Link from 'next/link';

export default function OnboarderProductList({ products, setDeleteModal }) {
  const getProductImageUrl = (product) => {
    if (!product?.images) return null;
    if (typeof product.images === 'string') return product.images;
    if (typeof product.images.front === 'string' && product.images.front) return product.images.front;
    if (product.images.front?.url) return product.images.front.url;
    if (product.images.left?.url) return product.images.left.url;
    if (product.images.right?.url) return product.images.right.url;
    if (product.images.back?.url) return product.images.back.url;
    return null;
  };

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const imgUrl = getProductImageUrl(product);
        return (
          <div
            key={product._id}
            className="bg-white rounded-lg border border-gold-500/20 p-3 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
          >
            {/* Product Info & Thumbnail */}
            <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md border border-gold-200 overflow-hidden bg-sand-100 shrink-0 flex items-center justify-center relative">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={product.name || 'Product'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <svg className="w-6 h-6 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                )}
              </div>

              <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-royal-blue-950 truncate">
                    {product.name}
                  </h3>
                  <span className={`text-[9px] font-bold font-sans px-1.5 py-0.5 rounded-full ${product.inStock !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                    {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-sans text-gray-500 flex-wrap">
                  {product.category && (
                    <span className="font-semibold uppercase text-royal-blue-900">
                      {product.category}
                    </span>
                  )}
                  {product.subcategory && (
                    <span className="text-gold-700 font-medium">
                      • {product.subcategory}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-cinzel text-sm sm:text-base font-black text-royal-blue-900">
                    ₹ {product.price ? Number(product.price).toLocaleString('en-IN') : 0}
                  </span>
                  {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                    <span className="font-sans text-[10px] text-gray-400 line-through">
                      ₹ {Number(product.originalPrice).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons: Edit & Delete */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-sand-200 shrink-0">
              <Link
                href={`/admin/products/${product._id}/edit`}
                className="p-2 sm:px-3 sm:py-1.5 rounded-md border border-royal-blue-900/30 text-royal-blue-900 hover:bg-royal-blue-900 hover:text-white transition-all text-[10px] sm:text-xs font-cinzel font-bold tracking-wider uppercase flex items-center gap-1 shadow-2xs"
                title="Edit"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="hidden sm:inline">Edit</span>
              </Link>

              <button
                onClick={() => setDeleteModal({ isOpen: true, product, isDeleting: false })}
                className="p-2 sm:px-3 sm:py-1.5 rounded-md border border-rose-300 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all text-[10px] sm:text-xs font-cinzel font-bold tracking-wider uppercase flex items-center gap-1 shadow-2xs"
                title="Delete"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span className="hidden sm:inline">Delete</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
