import React from 'react';
import bannerImg from '../assets/images/hero_banner.jpg';
import productChandbaliImg from '../assets/images/earrings2.png';
import productTempleNecklaceImg from '../assets/images/neckless.jpg';
import productKundanSetImg from '../assets/images/product_kundan_set.png';
import productGoldPayalImg from '../assets/images/product_gold_payal.png';

const handmadeProducts = [
  {
    name: 'Chandbali Heritage Earrings - Handcrafted 22k Gold',
    category: 'Earrings',
    price: '12,999.00',
    originalPrice: '15,999.00',
    rating: '4.8',
    reviews: '845',
    img: productChandbaliImg,
  },
  {
    name: 'Temple Lakshmi Necklace - Antique Finish - Prachin',
    category: 'Necklaces',
    price: '45,999.00',
    originalPrice: '49,999.00',
    rating: '4.9',
    reviews: '1,204',
    img: productTempleNecklaceImg,
  },
  {
    name: 'Royal Kundan Bridal Set - Heavy Polki Design',
    category: 'Bridal Sets',
    price: '89,999.00',
    originalPrice: '99,999.00',
    rating: '5.0',
    reviews: '342',
    img: productKundanSetImg,
  },
  {
    name: 'Golden Ghungroo Payal - Traditional Anklets',
    category: 'Payals',
    price: '8,499.00',
    originalPrice: '10,999.00',
    rating: '4.7',
    reviews: '654',
    img: productGoldPayalImg,
  },
];

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-md overflow-hidden hover:shadow-xl shadow-sm transition-shadow duration-300 cursor-pointer flex flex-col font-sans">
    <div className="relative aspect-[4/5] overflow-hidden bg-sand-50">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
      />
    </div>
    <div className="p-4 sm:p-5 flex flex-col flex-grow">
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-extrabold text-[18px] sm:text-[20px] text-royal-blue-900 tracking-tight">
          Rs. {product.price}
        </span>
        <span className="text-[13px] sm:text-[14px] text-gray-500 font-medium line-through">
          Rs. {product.originalPrice}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mb-3 text-[13px] sm:text-[14px] text-gray-600">
        <span className="text-[#f59e0b] text-base leading-none mt-[-2px]">★</span>
        <span className="font-bold text-gray-800">{product.rating}</span>
        <span>({product.reviews})</span>
      </div>
      <h3 className="font-semibold text-[14px] sm:text-[15px] leading-snug text-royal-blue-900 mb-5 flex-grow">
        {product.name}
      </h3>
      <button className="w-full py-2.5 rounded bg-royal-blue-900 text-white font-medium text-[14px] hover:bg-royal-blue-950 transition-colors duration-300">
        Add to cart
      </button>
    </div>
  </div>
);

const HandmadeJewelryItem = () => {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={bannerImg}
          alt="Handmade Jewelry Collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-royal-blue-950/20"></div>
      </div>

      <section className="bg-sand-100 min-h-screen py-5 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 sm:w-20 bg-gold-600/40" />
              <span className="text-gold-600 text-sm">◆</span>
              <div className="h-px w-12 sm:w-20 bg-gold-600/40" />
            </div>
            <h1 className="font-cinzel-decorative text-4xl lg:text-5xl text-royal-blue-900 mb-4">
              Handmade Jewelry
            </h1>
            <p className="font-cormorant text-xl text-royal-blue-600/70 max-w-2xl mx-auto">
              Discover our exclusive collection of authentic, handcrafted jewelry pieces. Every item is a masterpiece of traditional Indian artisanship.
            </p>
          </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {handmadeProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        </div>
      </section>
    </div>
  );
};

export default HandmadeJewelryItem;
