import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/images/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Handmade Jewelry', path: '/handmade' },
    { name: 'Antique Collection', path: '/antique' },
    { name: 'Collections', path: '/#collections' },
    { name: 'About Us', path: '/#about' },
  ];

  return (
    <>
      <nav className="sticky top-0 left-0 w-full z-50 bg-sand-50/95 backdrop-blur-md border-b border-gold-500/25 shadow-sm shadow-sand-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group focus:outline-none">
                {/* <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden rounded-full flex items-center justify-center">
                  <img 
                    // src={logoImg} 
                    alt="Logo Icon" 
                    className="w-full h-full object-cover object-left scale-150 ml-2" 
                  />
                </div> */}
                <div className="flex flex-col items-start mt-0.5">
                  <span className="font-cinzel-decorative text-xl lg:text-2xl font-bold tracking-[0.1em] text-royal-blue-800 group-hover:text-gold-600 transition-colors duration-300">
                    PRACHIN LUXE
                  </span>
                  <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] font-medium text-royal-blue-600/80 transition-colors duration-300 mt-[-2px]">
                    HANDCRAFTED JEWELRY & ANTIQUES
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-cinzel font-bold text-sm tracking-wider transition-all duration-300 group py-2 focus:outline-none ${
                    location.pathname === link.path ? 'text-gold-600' : 'text-royal-blue-700 hover:text-gold-600'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full bg-gold-600' : 'w-0 bg-gold-600 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-5">
              {/* Search Icon */}
              <button
                className="text-royal-blue-700 hover:text-gold-600 transition-all duration-300"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>

              {/* Shopping Bag Icon */}
              <button
                className="relative text-royal-blue-700 hover:text-gold-600 transition-all duration-300"
                aria-label="Shopping bag"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                {/* Badge */}
                <span className="absolute -top-2 -right-2 bg-gold-500 text-royal-blue-950 text-[10px] font-cinzel font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden flex flex-col items-center justify-center space-y-1.5 p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-6 h-[1.5px] bg-royal-blue-800 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''
                    }`}
                />
                <span
                  className={`block w-6 h-[1.5px] bg-royal-blue-800 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                    }`}
                />
                <span
                  className={`block w-6 h-[1.5px] bg-royal-blue-800 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
                    }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-sand-50/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${isMobileMenuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {/* Decorative top ornament */}
          <div className="absolute top-28 left-1/2 -translate-x-1/2 flex items-center space-x-3">
            <span className="block w-12 h-[1px] bg-gold-500/30" />
            <svg
              className="w-4 h-4 text-gold-600/50"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
            </svg>
            <span className="block w-12 h-[1px] bg-gold-500/30" />
          </div>

          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`relative font-cinzel text-xl tracking-[0.2em] transition-all duration-300 group py-2 focus:outline-none ${
                location.pathname === link.path ? 'text-gold-600' : 'text-royal-blue-700 hover:text-gold-600'
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {link.name}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-300 ${
                location.pathname === link.path ? 'w-full bg-gold-600' : 'w-0 bg-gold-600 group-hover:w-full'
              }`} />
            </Link>
          ))}

          {/* Decorative bottom ornament */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center space-x-3">
            <span className="block w-12 h-[1px] bg-gold-500/30" />
            <svg
              className="w-4 h-4 text-gold-600/50"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
            </svg>
            <span className="block w-12 h-[1px] bg-gold-500/30" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
