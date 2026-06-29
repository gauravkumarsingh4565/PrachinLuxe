"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProductById, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductPage({ params }) {
  // Safe param unwrapping for Next.js 15+
  const { id } = React.use(params);
  const router = useRouter();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('story');
  const [isAdded, setIsAdded] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const found = getProductById(id);
      if (found) {
        setProduct(found);
        setQuantity(1); // Reset quantity on page change
        setActiveImgIndex(0); // Reset active image index
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="w-full min-h-screen bg-sand-100 flex flex-col items-center justify-center font-cormorant">
        <p className="text-2xl text-royal-blue-900 mb-4">Finding product details...</p>
        <Link href="/" className="px-6 py-2 bg-royal-blue-900 text-white rounded font-cinzel text-xs tracking-widest hover:bg-gold-600 transition-colors">
          RETURN TO HOME
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (type) => {
    if (type === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'inc') {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/cart');
  };

  const related = getRelatedProducts(product, 4);

  return (
    <div className="w-full bg-sand-100 py-8 px-4 font-cormorant min-h-screen">
      <div className="max-w-[1300px] mx-auto"> {/* Thoda container width badhaya for large images */}

        {/* Breadcrumbs */}
        <nav className="text-xs sm:text-sm text-gray-500 mb-8 font-semibold tracking-wide uppercase">
          <Link href="/" className="hover:text-gold-600 transition-colors">HOME</Link>
          <span className="mx-2 text-gold-400">/</span>
          <span className="hover:text-gold-600 transition-colors">{product.category}</span>
          <span className="mx-2 text-gold-400">/</span>
          <span className="text-royal-blue-900 font-bold">{product.name}</span>
        </nav>

        {/* 2-Column Product Layout - Changed gap for breathing room */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 bg-white rounded-2xl p-6 md:p-10 border border-gold-500/10 shadow-sm mb-16">

          {/* ================= LEFT COLUMN: LARGE IMAGE GALLERY ================= */}
          <div className="flex flex-col items-center justify-start gap-5 w-full">

            {/* Main display image - Removed max-width restriction */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-sand-100 border border-gold-500/25 p-1 shadow-md hover:shadow-xl transition-shadow duration-500 group">
              <img
                src={product.images ? product.images[activeImgIndex] : product.img}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110 cursor-zoom-in"
              />
              <div className="absolute inset-4 border border-gold-500/20 pointer-events-none rounded-lg" />
            </div>

            {/* Gallery Thumbnails (4 Sections) */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full">
                {product.images.slice(0, 4).map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    onMouseEnter={() => setActiveImgIndex(idx)}
                    className={`relative w-full aspect-square rounded-lg overflow-hidden bg-sand-50 border-2 transition-all duration-300 ${idx === activeImgIndex
                      ? 'border-gold-500 scale-105 shadow-md shadow-gold-500/20'
                      : 'border-gold-500/10 hover:border-gold-500/40'
                      }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`Angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            {/* ================= SHIFTED TRUST BANNER ================= */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 mb-4 mt-4 text-gray-500 text-[11px] sm:text-xs tracking-wide uppercase font-bold bg-gray-50/50 p-3 rounded-lg border border-gray-100">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#34A853]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                100% Certified
              </span>
              <span className="hidden sm:block h-4 w-px bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#4285F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7.463 8.2l.718-4.308a2 2 0 011.968-1.673h12.55a2 2 0 011.968 1.673l.718 4.308a2 2 0 01-1.968 2.327H6.505a2 2 0 01-1.968-2.327z" /></svg>
                Insured Shipping
              </span>
            </div>
          </div>
          {/* ================= END LEFT COLUMN ================= */}



          {/* ================= RIGHT COLUMN: INFO & CHECKOUT ================= */}
          <div className="flex flex-col w-full pt-2">
            <span className="text-xs sm:text-sm font-semibold text-gold-600 tracking-widest uppercase mb-1">
              {product.category} {product.subcategory ? `> ${product.subcategory}` : ''}
            </span>
            <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-royal-blue-900 font-bold leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-amber-400 text-sm">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-xs text-gray-500 font-semibold">({product.reviews} customer reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6 p-4 rounded-xl bg-sand-50 border border-gold-500/10">
              <span className="text-3xl sm:text-4xl font-bold text-royal-blue-900">Rs. {product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-sm sm:text-base text-gray-400 line-through ml-2">Rs. {product.originalPrice}</span>
                  <span className="ml-auto text-[10px] sm:text-xs px-3 py-1.5 rounded-full bg-[#34A853]/10 text-[#34A853] font-bold tracking-wider uppercase border border-[#34A853]/20">
                    SAVE NOW
                  </span>
                </>
              )}
            </div>

            {/* Product short description */}
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 italic border-l-2 border-gold-400 pl-4">
              "{product.description}"
            </p>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-2 mb-6">
              <span className="text-xs font-bold text-royal-blue-900 uppercase tracking-wider">Quantity</span>
              <div className="flex items-center">
                <div className="flex items-center border border-gold-500/30 rounded-lg overflow-hidden bg-white shadow-sm w-fit">
                  <button
                    onClick={() => handleQuantityChange('dec')}
                    className="px-4 py-2 hover:bg-gold-50 text-royal-blue-900 font-bold transition-colors text-lg"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 text-royal-blue-900 font-bold text-sm min-w-[50px] text-center border-l border-r border-gold-500/20">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('inc')}
                    className="px-4 py-2 hover:bg-gold-50 text-royal-blue-900 font-bold transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className={`flex-grow py-4 rounded-lg font-cinzel text-xs sm:text-sm font-bold tracking-widest transition-all duration-300 border-2 ${isAdded
                  ? 'bg-green-600 border-green-600 text-white'
                  : 'bg-royal-blue-900 border-royal-blue-900 text-white hover:bg-white hover:text-royal-blue-900 hover:shadow-lg'
                  }`}
              >
                {isAdded ? 'ADDED TO BAG ✓' : 'ADD TO BAG'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-grow py-4 rounded-lg font-cinzel text-xs sm:text-sm font-bold tracking-widest bg-white text-gold-700 border-2 border-gold-500 hover:bg-gold-500 hover:text-white transition-all duration-300 hover:shadow-lg"
              >
                BUY NOW
              </button>
            </div>



            {/* Details tabs / accordion */}
            <div className="border border-gold-500/25 rounded-xl overflow-hidden bg-stone-50">
              <div className="flex border-b border-gold-500/25 text-center font-cinzel text-xs sm:text-sm tracking-wider uppercase bg-white">
                <button
                  onClick={() => setActiveTab('story')}
                  className={`flex-1 py-3 transition-colors ${activeTab === 'story'
                    ? 'bg-gold-500 text-white font-bold'
                    : 'text-royal-blue-900 hover:bg-gold-500/10'
                    }`}
                >
                  The Story
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`flex-1 py-3 transition-colors ${activeTab === 'materials'
                    ? 'bg-gold-500 text-white font-bold'
                    : 'text-royal-blue-900 hover:bg-gold-500/10'
                    }`}
                >
                  Materials & Specs
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`flex-1 py-3 transition-colors ${activeTab === 'care'
                    ? 'bg-gold-500 text-white font-bold'
                    : 'text-royal-blue-900 hover:bg-gold-500/10'
                    }`}
                >
                  Care & Terms
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-5 font-cormorant text-[15px] sm:text-[16px] text-gray-700 leading-relaxed bg-white min-h-[200px]">
                {activeTab === 'story' && (
                  <div className="space-y-4">
                    <p className="font-semibold text-royal-blue-900 uppercase text-xs tracking-wider font-cinzel">Artisanal Craftsmanship</p>
                    <p>{product.craftsmanship}</p>
                    <p className="italic text-gray-500">Every item is handmade with love. Minor variations are a sign of authentic human touch and structural uniqueness.</p>
                  </div>
                )}
                {activeTab === 'materials' && (
                  <div className="space-y-4">
                    <p className="font-semibold text-royal-blue-900 uppercase text-xs tracking-wider font-cinzel">Ingredients List</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.materials.map((mat, i) => (
                        <li key={i} className="font-semibold">{mat}</li>
                      ))}
                    </ul>
                    <p className="font-semibold text-royal-blue-900 uppercase text-xs tracking-wider font-cinzel mt-4">Specifications</p>
                    <table className="w-full text-sm mt-2 border-t border-gray-100">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, val]) => (
                          <tr key={key} className="border-b border-gray-100">
                            <td className="py-2.5 font-bold text-royal-blue-900 uppercase text-[11px] tracking-wider w-[40%]">{key}</td>
                            <td className="py-2.5 text-gray-600 font-semibold">{val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === 'care' && (
                  <div className="space-y-4">
                    <p className="font-semibold text-royal-blue-900 uppercase text-xs tracking-wider font-cinzel">Care Instructions</p>
                    <p>Keep dry and store in our custom soft-padded box. Clean with a soft, dry cotton cloth after each use. Avoid direct contact with perfumes, sprays, and water.</p>
                    <p className="font-semibold text-royal-blue-900 uppercase text-xs tracking-wider font-cinzel">Shipping Details</p>
                    <p>Insured shipping across India. Requires a signature upon delivery. Shipped within 3-5 business days.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
          {/* ================= END RIGHT COLUMN ================= */}
        </div>

        {/* Mock Reviews Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gold-500/10 shadow-sm mb-16">
          <h3 className="font-cinzel text-xl sm:text-2xl text-royal-blue-900 font-bold mb-6 tracking-wide border-b border-gray-100 pb-4">
            Customer Reviews
          </h3>
          <div className="space-y-6">
            <div className="border-b border-gray-50 pb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-royal-blue-900 font-sans">Rhea Sharma</p>
                <div className="text-amber-400 text-sm">★★★★★</div>
              </div>
              <p className="text-gray-400 text-xs mb-3 font-sans">2 weeks ago</p>
              <p className="text-gray-600 leading-relaxed italic">"Breathtaking quality. The polish and weight feel extremely premium. It completed my festive outfit perfectly. Will buy again!"</p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-royal-blue-900 font-sans">Vikram Malhotra</p>
                <div className="text-amber-400 text-sm">★★★★☆</div>
              </div>
              <p className="text-gray-400 text-xs mb-3 font-sans">1 month ago</p>
              <p className="text-gray-600 leading-relaxed italic">"Bought it as a anniversary gift. The presentation box is beautifully styled. She loved the craftsmanship and details."</p>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {related.length > 0 && (
          <section className="w-full mb-8">
            <h3 className="font-cinzel text-2xl sm:text-3xl text-royal-blue-900 font-bold mb-8 tracking-wide text-center">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {related.map((rel, index) => (
                <div
                  key={index}
                  onClick={() => router.push(`/product/${rel.id}`)}
                  className="group relative bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col font-cormorant shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-sand-200/50 hover:border-gold-300/50"
                >
                  <div className="relative aspect-square overflow-hidden bg-sand-50 p-2">
                    <img
                      src={rel.img}
                      alt={rel.name}
                      className="w-full h-full object-cover rounded-lg transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-royal-blue-900 tracking-wider uppercase shadow-sm">
                      {rel.category}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="font-semibold text-sm sm:text-base leading-snug text-royal-blue-900 mb-2 flex-grow line-clamp-2">
                      {rel.name}
                    </h4>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-base sm:text-lg text-royal-blue-900">
                        Rs. {rel.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}