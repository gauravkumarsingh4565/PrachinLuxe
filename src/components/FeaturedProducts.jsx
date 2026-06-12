import React from 'react';
import productChandbaliImg from '../assets/images/earrings2.png';
import productTempleNecklaceImg from '../assets/images/neckless.jpg';
import productKundanSetImg from '../assets/images/hero_banner.png';
import productGoldPayalImg from '../assets/images/product_gold_payal.png';
import productAntiqueBoxImg from '../assets/images/product_antique_box.png';
import productMeenakariBangleImg from '../assets/images/product_meenakari_bangle.png';
import antiqueImg from '../assets/images/antique.png';

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

const antiqueProducts = [
  {
    name: 'Mughal Peacock Box - Heritage Artifact',
    category: 'Antique',
    price: '15,999.00',
    originalPrice: '18,500.00',
    rating: '4.9',
    reviews: '89',
    img: productAntiqueBoxImg,
  },
  {
    name: 'Meenakari Royal Bangles - Jaipur Enamel Work',
    category: 'Bangles',
    price: '18,999.00',
    originalPrice: '22,000.00',
    rating: '4.8',
    reviews: '412',
    img: productMeenakariBangleImg,
  },
  {
    name: 'Vintage Brass Ganesha Idol - 19th Century Style',
    category: 'Antique',
    price: '24,500.00',
    originalPrice: '28,000.00',
    rating: '4.9',
    reviews: '124',
    img: antiqueImg,
  },
  {
    name: 'Royal Rajputana Dagger with Scabbard (Replica)',
    category: 'Antique',
    price: '32,999.00',
    originalPrice: '35,000.00',
    rating: '4.7',
    reviews: '56',
    img: productAntiqueBoxImg, // Reusing the high-quality antique box image as placeholder
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

const FeaturedProducts = () => {
  return (
    <section className="bg-sand-100 py-20 px-4">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Handmade Jewelry Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 sm:w-20 bg-gold-600/40" />
              <span className="text-gold-600 text-sm">◆</span>
              <div className="h-px w-12 sm:w-20 bg-gold-600/40" />
            </div>
            <h2 className="font-cinzel-decorative text-3xl lg:text-4xl text-royal-blue-900 mb-3">
              Handmade Jewelry
            </h2>
            <p className="font-cormorant text-lg text-royal-blue-600/70">
              Discover timeless pieces crafted by master artisans
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {handmadeProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        {/* Antique Items Section */}
        <div>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 sm:w-20 bg-gold-600/40" />
              <span className="text-gold-600 text-sm">◆</span>
              <div className="h-px w-12 sm:w-20 bg-gold-600/40" />
            </div>
            <h2 className="font-cinzel-decorative text-3xl lg:text-4xl text-royal-blue-900 mb-3">
              Antique Treasures
            </h2>
            <p className="font-cormorant text-lg text-royal-blue-600/70">
              Authentic heritage artifacts and royal collectibles
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {antiqueProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="px-10 py-3 rounded bg-royal-blue-900 text-white font-medium text-[16px] hover:bg-royal-blue-950 transition-colors duration-300">
            View All Collections
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
