"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import jewelrySetImg from '@/assets/images/jewelry_set_premium.png';
import earringsImg from '@/assets/images/earrings_premium.png';
import necklacesImg from '@/assets/images/necklace_premium.png';
import najarbattuImg from '@/assets/images/najarbattu_premium.png';
import hairpinImg from '@/assets/images/hairpin_premium.png';
import newArrivalsImg from '@/assets/images/product_kundan_set.png';

const categories = [
  { name: 'New Arrivals', img: newArrivalsImg, path: '/category/new-arrivals' },
  { name: 'Sets', img: jewelrySetImg, path: '/category/sets' },
  { name: 'Earrings', img: earringsImg, path: '/category/earrings' },
  { name: 'Necklaces', img: necklacesImg, path: '/category/necklaces' },
  { name: 'Najar Battu', img: najarbattuImg, path: '/category/najar-battu' },
  { name: 'Hair Pins', img: hairpinImg, path: '/category/hair-pins' },

];

export default function CategoryCircles() {
  const router = useRouter();

  return (
    <section className="w-full bg-sand-100 py-6 sm:py-8 border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Horizontal scrollable wrapper */}
        <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center flex-nowrap">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => router.push(cat.path)}
              className="flex flex-col items-center group flex-shrink-0 transition-transform duration-300 focus:outline-none"
            >
              {/* Outer Shadow Ring */}
              <div className="relative p-0.5 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-gray-100 transition-all duration-500 group-hover:shadow-[0_8px_25px_rgba(201,168,76,0.3)] group-hover:scale-105">
                {/* Circular image frame */}
                <div className="w-[85px] h-[85px] sm:w-[95px] sm:h-[95px] lg:w-[105px] lg:h-[105px] rounded-full overflow-hidden border-2 border-white relative">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 85px, (max-width: 1024px) 95px, 105px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Subtle Inner Gold Shadow on Hover */}
                  <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-gold-500/20 transition-all duration-300 pointer-events-none" />
                </div>
              </div>

              {/* Category Name */}
              <span className="font-cormorant text-[13px] sm:text-[14px] font-bold text-royal-blue-900 mt-3 tracking-wide uppercase transition-colors duration-300 group-hover:text-gold-600">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
