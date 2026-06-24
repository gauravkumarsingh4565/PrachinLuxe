import React from 'react';
import { useNavigate } from 'react-router-dom';
import bannerImg from '../assets/images/new_arrival.png';
import earrings from '../assets/images/earrings_premium.png';
import necklace from '../assets/images/necklace_premium.png';
import ring from '../assets/images/ring_premium.png';
import bracelet from '../assets/images/bracelet_premium.png';

const newProducts = [
  {
    name: 'Kundan Heritage Jhumka',
    category: 'Earrings',
    price: '24,999.00',
    originalPrice: '28,000.00',
    rating: '5.0',
    reviews: '124',
    img: earrings,
  },
  {
    name: 'Temple Lakshmi Choker',
    category: 'Necklaces',
    price: '45,500.00',
    originalPrice: '52,000.00',
    rating: '4.9',
    reviews: '89',
    img: necklace,
  },
  {
    name: 'Polki Diamond Cocktail Ring',
    category: 'Rings',
    price: '18,500.00',
    originalPrice: '22,000.00',
    rating: '4.8',
    reviews: '210',
    img: ring,
  },
  {
    name: 'Antique Gold Kada',
    category: 'Bracelets',
    price: '32,999.00',
    originalPrice: '38,000.00',
    rating: '4.9',
    reviews: '156',
    img: bracelet,
  },
  {
    name: 'Polki Diamond Cocktail Ring',
    category: 'Rings',
    price: '18,500.00',
    originalPrice: '22,000.00',
    rating: '4.8',
    reviews: '210',
    img: ring,
  },
  {
    name: 'Antique Gold Kada',
    category: 'Bracelets',
    price: '32,999.00',
    originalPrice: '38,000.00',
    rating: '4.9',
    reviews: '156',
    img: bracelet,
  }
];

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
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="font-bold text-[17px] sm:text-[19px] text-royal-blue-900 leading-tight">
          Rs. {product.price}
        </span>
        <span className="text-[12px] sm:text-[13px] text-gray-400 line-through">
          Rs. {product.originalPrice}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mb-2.5 text-[13px]">
        <span className="text-amber-400 text-[16px] leading-none">★</span>
        <span className="font-bold text-gray-800">{product.rating}</span>
        <span className="text-gray-500">({product.reviews})</span>
      </div>
      <h3 className="font-bold text-[13px] sm:text-[14px] leading-snug text-royal-blue-900 line-clamp-2 mt-auto">
        {product.name}
      </h3>
    </div>
  </div>
);

const NewArrival = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-sand-50 py-6 px-4 border-t border-gold-500/20">
      <div className="max-w-[1400px] mx-auto">
        {/* Banner Section */}
        <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden mb-2 shadow-xl group">
          <img
            src={bannerImg}
            alt="New Arrivals"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-royal-blue-950/80 via-royal-blue-950/40 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h2 className="font-cinzel-decorative text-3xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-lg tracking-wide">
              New <span className="text-gold-400">Arrivals</span>
            </h2>
            <p className="font-cormorant text-xl md:text-2xl text-sand-200 max-w-xl italic drop-shadow-md">
              Discover our latest collection of magnificent handcrafted treasures, blending timeless tradition with modern elegance.
            </p>
          </div>
        </div>

        <div className="text-center flex flex-col items-center my-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-black">
            New Arrivals
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {newProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/handmade')}
            className="px-10 py-3.5 bg-royal-blue-900 text-white font-cinzel-decorative text-sm tracking-[0.2em] hover:bg-gold-600 transition-colors duration-500 shadow-md rounded-sm"
          >
            VIEW FULL COLLECTION
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
