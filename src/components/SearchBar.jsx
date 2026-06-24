"use client";

import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Searching for:', query);
      // Backend integration can go here later
    }
  };

  return (
    <div className="w-full bg-sand-100 py-5 px-4 flex justify-center border-b border-gold-500/20 relative z-20">
      <div className="w-full sm:w-[80%] max-w-3xl animate-fade-in-up">
        <form onSubmit={handleSearch} className="relative flex items-center group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jewelry, vintage art, brass artifacts..."
            className="w-full bg-white/60 backdrop-blur-md border border-gold-400/40 text-royal-blue-900 rounded-md py-3 sm:py-3.5 pl-6 sm:pl-8 pr-16 shadow-md focus:outline-none focus:ring-2 focus:ring-gold-500/60 focus:bg-white/90 font-cormorant text-lg sm:text-xl transition-all duration-300 placeholder-royal-blue-700/50 hover:shadow-lg hover:bg-white/80"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-md hover:from-gold-700 hover:to-gold-600 transition-all duration-300 shadow-sm transform hover:scale-105"
            aria-label="Search button"
          >
            {/* Naya aur clean search icon (Thoda bold aur modern) */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;