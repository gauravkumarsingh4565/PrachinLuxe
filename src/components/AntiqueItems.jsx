import React from 'react';
import bannerImg from '../assets/images/antique2.png';
import productAntiqueBoxImg from '../assets/images/product_antique_box.png';
import productMeenakariBangleImg from '../assets/images/lamp.jpg';
import antiqueImg from '../assets/images/antique.png';

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
];

const ProductCard = ({ product }) => (
  <div className="relative group bg-[#1c120c] border border-gold-800/40 rounded-sm overflow-hidden hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] transition-all duration-500 cursor-pointer flex flex-col font-sans">
    {/* Decorative corner borders */}
    <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold-600/50 opacity-50 group-hover:opacity-100 transition-opacity z-10 m-2"></div>
    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold-600/50 opacity-50 group-hover:opacity-100 transition-opacity z-10 m-2"></div>
    <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold-600/50 opacity-50 group-hover:opacity-100 transition-opacity z-10 m-2"></div>
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold-600/50 opacity-50 group-hover:opacity-100 transition-opacity z-10 m-2"></div>

    <div className="relative aspect-[4/5] overflow-hidden bg-[#0d0805]">
      {/* Sepia filter on image, removes on hover */}
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-full object-cover sepia-[.60] contrast-125 hover:sepia-0 hover:scale-110 transition-all duration-700 ease-out opacity-80 group-hover:opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c120c] via-transparent to-transparent opacity-80"></div>
    </div>
    
    <div className="p-5 flex flex-col flex-grow relative z-10 -mt-8">
      <div className="flex items-center justify-center mb-3">
        <div className="h-px w-8 bg-gold-700/50" />
        <span className="text-gold-500 text-[10px] mx-2 tracking-widest uppercase">{product.category}</span>
        <div className="h-px w-8 bg-gold-700/50" />
      </div>
      
      <h3 className="font-cinzel font-semibold text-center text-[15px] sm:text-[16px] leading-snug text-gold-200 mb-4 flex-grow drop-shadow-md">
        {product.name}
      </h3>

      <div className="flex items-center justify-center gap-1 mb-4 text-[13px] text-gold-400/70">
        <span className="text-[#d4af37] text-sm leading-none mt-[-2px]">★</span>
        <span className="font-bold text-gold-300">{product.rating}</span>
        <span className="text-sand-600">({product.reviews})</span>
      </div>

      <div className="flex flex-col items-center gap-1 mb-5">
        <span className="font-cormorant font-extrabold text-[22px] sm:text-[24px] text-gold-400 tracking-wide">
          Rs. {product.price}
        </span>
        <span className="text-[14px] text-sand-700/60 font-medium line-through">
          Rs. {product.originalPrice}
        </span>
      </div>
      
      <button className="w-full py-3 border border-gold-700/50 bg-transparent text-gold-400 font-cinzel font-bold tracking-widest text-[13px] hover:bg-gold-900/40 hover:text-gold-200 transition-all duration-500">
        CLAIM ARTIFACT
      </button>
    </div>
  </div>
);

const AntiqueItems = () => {
  return (
    <div className="w-full bg-[#0a0705] min-h-screen relative overflow-hidden">
      {/* Background Texture/Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a1a10] via-[#0a0705] to-black opacity-80 pointer-events-none"></div>

      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[70vh] flex items-center justify-center overflow-hidden border-b-2 border-gold-900/60">
        <img
          src={bannerImg}
          alt="Antique Treasures Collection"
          className="absolute inset-0 w-full h-full object-cover object-center sepia-[.30]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0705]/80 via-[#1c120c]/60 to-[#0a0705]"></div>
      </div>

      <section className="relative z-10 py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="text-center mb-24">
            {/* Ancient Header Decor */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[2px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-gold-600 to-transparent" />
              <svg className="w-8 h-8 text-gold-500 animate-pulse-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="h-[2px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-gold-600 to-transparent" />
            </div>
            
            <h1 className="font-cinzel-decorative text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-gold-200 via-gold-400 to-gold-700 mb-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-widest">
              Ancient Relics
            </h1>
            
            <p className="font-cormorant text-2xl text-gold-200/70 max-w-3xl mx-auto leading-relaxed italic">
              "Step into the shadows of history. Each artifact holds the whispers of kings, the secrets of dynasties, and the undeniable magic of a forgotten era."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {antiqueProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default AntiqueItems;
