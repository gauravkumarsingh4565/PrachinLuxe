import React from 'react';
import productChandbaliImg from '../assets/images/earrings2.png';
import productTempleNecklaceImg from '../assets/images/neckless.jpg';
import productKundanSetImg from '../assets/images/product_kundan_set.png';
import productGoldPayalImg from '../assets/images/product_gold_payal.png';
import productAntiqueBoxImg from '../assets/images/product_antique_box.png';
import productMeenakariBangleImg from '../assets/images/product_meenakari_bangle.png';

const products = [
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
];

const FeaturedProducts = () => {
  return (
    <section className="bg-sand-100 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 sm:w-24 bg-gold-600/40" />
            <span className="text-gold-600 text-lg">◆</span>
            <div className="h-px w-16 sm:w-24 bg-gold-600/40" />
          </div>
          <h2 className="font-cinzel-decorative text-4xl lg:text-5xl text-royal-blue-900 mb-4">
            Handpicked Masterpieces
          </h2>
          <p className="font-cormorant text-xl text-royal-blue-600/70">
            Discover timeless pieces crafted by master artisans
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-md overflow-hidden hover:shadow-xl shadow-sm transition-shadow duration-300 cursor-pointer flex flex-col font-sans"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-sand-50">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                {/* Price Section */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-extrabold text-[22px] text-royal-blue-900 tracking-tight">
                    Rs. {product.price}
                  </span>
                  <span className="text-[15px] text-gray-500 font-medium line-through">
                    Rs. {product.originalPrice}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3 text-[15px] text-gray-600">
                  <span className="text-[#f59e0b] text-lg leading-none mt-[-2px]">★</span>
                  <span className="font-bold text-gray-800">{product.rating}</span>
                  <span>({product.reviews})</span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[16px] leading-snug text-royal-blue-900 mb-6 flex-grow">
                  {product.name}
                </h3>

                {/* Button */}
                <button className="w-full py-3 rounded bg-royal-blue-900 text-white font-medium text-[15px] hover:bg-royal-blue-950 transition-colors duration-300">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
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
