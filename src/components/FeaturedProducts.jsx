import React, { useState } from 'react';

// New generated images
import productNecklaceImg from '../assets/images/necklace_premium.png';
import productEarringsImg from '../assets/images/earrings_premium.png';
import productSetImg from '../assets/images/jewelry_set_premium.png';
import productBraceletImg from '../assets/images/bracelet_premium.png';
import productRingImg from '../assets/images/ring_premium.png';

// New extra generated images
import productNajarbattuImg from '../assets/images/najarbattu_premium.png';
import productHairpinImg from '../assets/images/hairpin_premium.png';
import productNecklace2Img from '../assets/images/necklace_2_premium.png';
import productEarrings2Img from '../assets/images/earrings_2_premium.png';
import productRing2Img from '../assets/images/ring_2_premium.png';

// Kept a few old ones to fill out the grid
import productChandbaliImg from '../assets/images/product_chandbali.png';
import productTempleNecklaceImg from '../assets/images/neckless.jpg';
import productKundanSetImg from '../assets/images/hero_banner.png';

const handmadeProducts = [
  // --- NECKLACES (4 Items) ---
  {
    name: 'Temple Lakshmi Necklace - Antique Finish',
    category: 'Necklaces',
    price: '45,999.00',
    originalPrice: '49,999.00',
    rating: '4.9',
    reviews: '1,204',
    img: productNecklaceImg,
  },
  {
    name: 'Classic Temple Necklace Set',
    category: 'Necklaces',
    price: '35,000.00',
    originalPrice: '38,500.00',
    rating: '4.8',
    reviews: '124',
    img: productTempleNecklaceImg,
  },
  {
    name: 'Emerald & Diamond Choker Necklace',
    category: 'Necklaces',
    price: '65,000.00',
    originalPrice: '72,000.00',
    rating: '5.0',
    reviews: '89',
    img: productNecklace2Img,
  },
  {
    name: 'Antique Jadau Pearl Choker',
    category: 'Necklaces',
    price: '52,500.00',
    originalPrice: '58,000.00',
    rating: '4.7',
    reviews: '412',
    img: productNecklaceImg,
  },
  {
    name: 'Classic Temple Necklace Set',
    category: 'Necklaces',
    price: '35,000.00',
    originalPrice: '38,500.00',
    rating: '4.8',
    reviews: '124',
    img: productTempleNecklaceImg,
  },
  {
    name: 'Emerald & Diamond Choker Necklace',
    category: 'Necklaces',
    price: '65,000.00',
    originalPrice: '72,000.00',
    rating: '5.0',
    reviews: '89',
    img: productNecklace2Img,
  },

  // --- EARRINGS (4 Items) ---
  {
    name: 'Chandbali Heritage Earrings - Handcrafted 22k Gold',
    category: 'Earrings',
    price: '12,999.00',
    originalPrice: '15,999.00',
    rating: '4.8',
    reviews: '845',
    img: productEarringsImg,
  },
  {
    name: 'Kundan Polki Jhumka Earrings',
    category: 'Earrings',
    price: '18,500.00',
    originalPrice: '21,000.00',
    rating: '4.9',
    reviews: '532',
    img: productChandbaliImg,
  },
  {
    name: 'Ruby Temple Jhumka Earrings',
    category: 'Earrings',
    price: '22,500.00',
    originalPrice: '25,000.00',
    rating: '4.7',
    reviews: '320',
    img: productEarrings2Img,
  },
  {
    name: 'Gold Filigree Drop Earrings',
    category: 'Earrings',
    price: '14,000.00',
    originalPrice: '16,500.00',
    rating: '4.6',
    reviews: '210',
    img: productEarringsImg,
  },
 {
    name: 'Kundan Polki Jhumka Earrings',
    category: 'Earrings',
    price: '18,500.00',
    originalPrice: '21,000.00',
    rating: '4.9',
    reviews: '532',
    img: productChandbaliImg,
  },
  {
    name: 'Ruby Temple Jhumka Earrings',
    category: 'Earrings',
    price: '22,500.00',
    originalPrice: '25,000.00',
    rating: '4.7',
    reviews: '320',
    img: productEarrings2Img,
  },
  // --- SETS (4 Items) ---
  {
    name: 'Royal Kundan Bridal Set - Heavy Polki Design',
    category: 'Sets',
    price: '89,999.00',
    originalPrice: '99,999.00',
    rating: '5.0',
    reviews: '342',
    img: productSetImg,
  },
  {
    name: 'Regal Wedding Jewelry Collection',
    category: 'Sets',
    price: '1,25,000.00',
    originalPrice: '1,45,000.00',
    rating: '5.0',
    reviews: '89',
    img: productKundanSetImg,
  },
  {
    name: 'Temple Coin Necklace & Earring Set',
    category: 'Sets',
    price: '75,000.00',
    originalPrice: '82,000.00',
    rating: '4.8',
    reviews: '156',
    img: productSetImg,
  },
  {
    name: 'Antique Jadau Bridal Collection',
    category: 'Sets',
    price: '1,10,000.00',
    originalPrice: '1,30,000.00',
    rating: '4.9',
    reviews: '204',
    img: productKundanSetImg,
  },
  {
    name: 'Regal Wedding Jewelry Collection',
    category: 'Sets',
    price: '1,25,000.00',
    originalPrice: '1,45,000.00',
    rating: '5.0',
    reviews: '89',
    img: productKundanSetImg,
  },
  {
    name: 'Temple Coin Necklace & Earring Set',
    category: 'Sets',
    price: '75,000.00',
    originalPrice: '82,000.00',
    rating: '4.8',
    reviews: '156',
    img: productSetImg,
  },

  // --- BRACELETS (4 Items) ---
  {
    name: 'Meenakari Royal Bracelets - Jaipur Enamel',
    category: 'Bracelets',
    price: '28,499.00',
    originalPrice: '32,999.00',
    rating: '4.7',
    reviews: '654',
    img: productBraceletImg,
  },
  {
    name: 'Kada Gold Bangle Bracelet',
    category: 'Bracelets',
    price: '34,000.00',
    originalPrice: '38,000.00',
    rating: '4.9',
    reviews: '312',
    img: productBraceletImg,
  },
  {
    name: 'Navratna Gemstone Bracelet',
    category: 'Bracelets',
    price: '42,500.00',
    originalPrice: '46,000.00',
    rating: '4.8',
    reviews: '189',
    img: productBraceletImg,
  },
  {
    name: 'Antique Elephant Motif Bangle',
    category: 'Bracelets',
    price: '25,999.00',
    originalPrice: '29,500.00',
    rating: '4.6',
    reviews: '420',
    img: productBraceletImg,
  },
  {
    name: 'Kada Gold Bangle Bracelet',
    category: 'Bracelets',
    price: '34,000.00',
    originalPrice: '38,000.00',
    rating: '4.9',
    reviews: '312',
    img: productBraceletImg,
  },
  {
    name: 'Navratna Gemstone Bracelet',
    category: 'Bracelets',
    price: '42,500.00',
    originalPrice: '46,000.00',
    rating: '4.8',
    reviews: '189',
    img: productBraceletImg,
  },

  // --- RINGS (4 Items) ---
  {
    name: 'Vintage Engraved Gold Ring - 18k Solid',
    category: 'Rings',
    price: '15,500.00',
    originalPrice: '18,000.00',
    rating: '4.9',
    reviews: '210',
    img: productRingImg,
  },
  {
    name: 'Oversized Polki Diamond Statement Ring',
    category: 'Rings',
    price: '34,999.00',
    originalPrice: '38,000.00',
    rating: '4.9',
    reviews: '128',
    img: productRing2Img,
  },
  {
    name: 'Navratna Heritage Ring',
    category: 'Rings',
    price: '21,000.00',
    originalPrice: '24,500.00',
    rating: '4.7',
    reviews: '340',
    img: productRingImg,
  },
  {
    name: 'Kundan Flower Cocktail Ring',
    category: 'Rings',
    price: '28,500.00',
    originalPrice: '32,000.00',
    rating: '4.8',
    reviews: '195',
    img: productRing2Img,
  },
   {
    name: 'Oversized Polki Diamond Statement Ring',
    category: 'Rings',
    price: '34,999.00',
    originalPrice: '38,000.00',
    rating: '4.9',
    reviews: '128',
    img: productRing2Img,
  },
  {
    name: 'Navratna Heritage Ring',
    category: 'Rings',
    price: '21,000.00',
    originalPrice: '24,500.00',
    rating: '4.7',
    reviews: '340',
    img: productRingImg,
  },

  // --- NAJARBATTU (4 Items) ---
  {
    name: 'Traditional Gold Najarbattu with Black Beads',
    category: 'Najarbattu',
    price: '8,500.00',
    originalPrice: '10,000.00',
    rating: '4.8',
    reviews: '412',
    img: productNajarbattuImg,
  },
  {
    name: 'Silver Evil Eye Najarbattu',
    category: 'Najarbattu',
    price: '4,500.00',
    originalPrice: '5,500.00',
    rating: '4.6',
    reviews: '230',
    img: productNajarbattuImg,
  },
  {
    name: 'Premium Gold Beaded Najarbattu',
    category: 'Najarbattu',
    price: '12,000.00',
    originalPrice: '14,500.00',
    rating: '4.9',
    reviews: '180',
    img: productNajarbattuImg,
  },
  {
    name: 'Kundan & Pearl Najarbattu Pendant',
    category: 'Najarbattu',
    price: '9,999.00',
    originalPrice: '11,500.00',
    rating: '4.7',
    reviews: '315',
    img: productNajarbattuImg,
  },
  {
    name: 'Silver Evil Eye Najarbattu',
    category: 'Najarbattu',
    price: '4,500.00',
    originalPrice: '5,500.00',
    rating: '4.6',
    reviews: '230',
    img: productNajarbattuImg,
  },
  {
    name: 'Premium Gold Beaded Najarbattu',
    category: 'Najarbattu',
    price: '12,000.00',
    originalPrice: '14,500.00',
    rating: '4.9',
    reviews: '180',
    img: productNajarbattuImg,
  },

  // --- HAIRPIN (4 Items) ---
  {
    name: 'Bridal Pearl & Gold Juda Hairpin',
    category: 'Hairpin',
    price: '12,999.00',
    originalPrice: '15,500.00',
    rating: '4.9',
    reviews: '156',
    img: productHairpinImg,
  },
  {
    name: 'Antique Gold Temple Hairpin',
    category: 'Hairpin',
    price: '18,500.00',
    originalPrice: '21,000.00',
    rating: '4.8',
    reviews: '98',
    img: productHairpinImg,
  },
  {
    name: 'Ruby Embedded Juda Pin',
    category: 'Hairpin',
    price: '14,000.00',
    originalPrice: '16,000.00',
    rating: '4.7',
    reviews: '210',
    img: productHairpinImg,
  },
  {
    name: 'Floral Polki Hair Accessory',
    category: 'Hairpin',
    price: '22,000.00',
    originalPrice: '25,500.00',
    rating: '4.9',
    reviews: '142',
    img: productHairpinImg,
  },
  {
    name: 'Antique Gold Temple Hairpin',
    category: 'Hairpin',
    price: '18,500.00',
    originalPrice: '21,000.00',
    rating: '4.8',
    reviews: '98',
    img: productHairpinImg,
  },
  {
    name: 'Ruby Embedded Juda Pin',
    category: 'Hairpin',
    price: '14,000.00',
    originalPrice: '16,000.00',
    rating: '4.7',
    reviews: '210',
    img: productHairpinImg,
  },
];

// Categories array same as before
const categories = ['Earrings','Necklaces',  'Sets', 'Bracelets', 'Rings', 'Najarbattu', 'Hairpin'];

const ProductCard = ({ product }) => (
  <div className="group relative bg-white rounded-xl overflow-hidden cursor-pointer flex flex-col font-cormorant shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-sand-200/50 hover:border-gold-300/50">
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
        <button className="w-full py-2 rounded-lg bg-white/95 backdrop-blur-sm text-royal-blue-900 font-semibold text-xs tracking-wide hover:bg-gold-500 hover:text-white transition-colors duration-300 shadow-md" aria-label={`Add ${product.name} to cart`}>
          ADD TO CART
        </button>
      </div>
    </div>
    <div className="p-3 sm:p-4 flex flex-col flex-grow">
      {/* Price — sabse upar, bada aur bold */}
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="font-bold text-[17px] sm:text-[19px] text-royal-blue-900 leading-tight">
          Rs. {product.price}
        </span>
        <span className="text-[12px] sm:text-[13px] text-gray-400 line-through">
          Rs. {product.originalPrice}
        </span>
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
  </div>
);

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('Earrings');

  const filteredProducts = handmadeProducts.filter(product => product.category === activeCategory);

  return (
    <section className="bg-sand-100 py-6 px-4">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="mb-6">
          
          <div className="flex flex-wrap justify-start items-center gap-6 sm:gap-12 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-cormorant text-2xl sm:text-3xl transition-all duration-500 pb-1 relative group ${
                  activeCategory === category 
                    ? 'text-royal-blue-900 font-bold' 
                    : 'text-gray-400 hover:text-gold-600'
                }`}
              >
                {category}
                <span className={`absolute left-0 bottom-0 w-full h-[2px] bg-gold-600 transition-transform duration-300 origin-left ${
                  activeCategory === category ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 transition-all duration-500">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 font-cormorant text-2xl text-royal-blue-800/50">
              No products found in this category.
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button className="group relative inline-flex items-center gap-3 px-8 py-3 text-royal-blue-900 font-cinzel-decorative font-bold text-lg uppercase tracking-[0.15em] transition-all duration-300 hover:text-gold-600">
            <span className="relative">
              Explore All Jewelry
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
            <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;