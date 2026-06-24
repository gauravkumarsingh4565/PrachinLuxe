import React from 'react';
import { useNavigate } from 'react-router-dom';
import productAntiqueBoxImg from '../assets/images/product_antique_box.png';
import productMeenakariBangleImg from '../assets/images/lamp.jpg';
import antiqueImg from '../assets/images/antique.png';
import bannerImg from '../assets/images/antique2.png';

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
    category: 'Antique',
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
    img: productAntiqueBoxImg,
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
    img: productAntiqueBoxImg,
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
        <button className="w-full py-2 rounded-lg bg-white/95 backdrop-blur-sm text-royal-blue-900 font-semibold text-xs tracking-wide hover:bg-gold-500 hover:text-white transition-colors duration-300 shadow-md" aria-label={`View ${product.name} details`}>
          VIEW DETAILS
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

const FeaturedAntiques = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-sand-50 py-6 px-4 border-t border-gold-500/20">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-6">
        {/* Banner Section */}
        <div className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] rounded-2xl overflow-hidden mb-4 shadow-xl group">
          <img 
            src={bannerImg} 
            alt="Antique Treasures" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c120c]/90 via-[#1c120c]/50 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h2 className="font-cinzel-decorative text-3xl md:text-5xl lg:text-6xl text-gold-400 mb-4 drop-shadow-lg tracking-wide">
              Antique <span className="text-white">Treasures</span>
            </h2>
            <p className="font-cormorant text-xl md:text-2xl text-sand-200 max-w-xl italic drop-shadow-md">
              Authentic heritage artifacts and royal collectibles that breathe life into history.
            </p>
          </div>
        </div>


        <div className="text-center flex flex-col items-center my-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-black">
           Antique Products
          </h2>
        </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {antiqueProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        <div className="flex justify-end ">
          <button 
            onClick={() => navigate('/antique')}
            className="group relative inline-flex items-center gap-3 px-8 py-3 text-royal-blue-900 font-cinzel-decorative font-bold text-lg uppercase tracking-[0.15em] transition-all duration-300 hover:text-gold-600"
          >
            <span className="relative">
              Explore All Antiques
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

export default FeaturedAntiques;
