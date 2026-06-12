import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Home', href: '#' },
    { name: 'Collections', href: '#collections' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'bg-sand-50/95 backdrop-blur-md border-gold-500/25 shadow-lg shadow-sand-500/15'
            : 'bg-transparent border-gold-500/25'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <a href="#" className="flex flex-col items-center group">
                <span className={`font-cinzel-decorative text-xl lg:text-2xl tracking-[0.15em] transition-all duration-300 ${
                  isScrolled ? 'text-gold-700 group-hover:text-gold-600' : 'text-sand-50 group-hover:text-gold-400'
                }`}>
                  PRACHIN LUXE
                </span>
                <span className={`font-cinzel text-[9px] tracking-[0.3em] uppercase mt-0.5 transition-colors duration-300 ${
                  isScrolled ? 'text-gold-700/70' : 'text-gold-300/80'
                }`}>
                  The Ancient Riches
                </span>
              </a>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative font-cinzel text-sm tracking-wider transition-all duration-300 group py-2 ${
                    isScrolled ? 'text-royal-blue-700 hover:text-gold-600' : 'text-sand-50/90 hover:text-gold-400'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-gold-600' : 'bg-gold-400'
                  }`} />
                </a>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-5">
              {/* Search Icon */}
              <button
                className={`transition-all duration-300 ${isScrolled ? 'text-royal-blue-700 hover:text-gold-600' : 'text-sand-50/90 hover:text-gold-400'}`}
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
                className={`relative transition-all duration-300 ${isScrolled ? 'text-royal-blue-700 hover:text-gold-600' : 'text-sand-50/90 hover:text-gold-400'}`}
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
                  className={`block w-6 h-[1.5px] transition-all duration-300 ${isScrolled ? 'bg-royal-blue-800' : 'bg-sand-50'} ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-[1.5px] transition-all duration-300 ${isScrolled ? 'bg-royal-blue-800' : 'bg-sand-50'} ${
                    isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                  }`}
                />
                <span
                  className={`block w-6 h-[1.5px] transition-all duration-300 ${isScrolled ? 'bg-royal-blue-800' : 'bg-sand-50'} ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-sand-50/98 backdrop-blur-lg transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
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
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative font-cinzel text-xl tracking-[0.2em] text-royal-blue-700 hover:text-gold-600 transition-all duration-300 group py-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-gold-600 transition-all duration-300 group-hover:w-full" />
            </a>
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
