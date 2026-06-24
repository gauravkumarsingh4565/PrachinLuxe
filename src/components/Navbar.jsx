import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileSliderOpen, setIsProfileSliderOpen] = useState(false);

  // Jab koi bhi slider open ho, toh background scroll lock ho jayega
  useEffect(() => {
    if (isMobileMenuOpen || isProfileSliderOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isProfileSliderOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Handmade Jewelry', path: '/handmade' },
    { name: 'Antique Collection', path: '/antique' },
    { name: 'Collections', path: '/#collections' },
    { name: 'About Us', path: '/#about' },
  ];

  // Mock User Data
  const user = {
    name: 'Gaurav Kumar',
    phone: '+91 98765 43210',
    email: 'gaurav@example.com',
    profilePic: 'https://i.pravatar.cc/150?img=11'
  };

  return (
    <>
      <nav className="sticky top-0 left-0 w-full z-40 bg-sand-50/95 backdrop-blur-md border-b border-gold-500/25 shadow-sm shadow-sand-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-3 group focus:outline-none">
                <div className="flex flex-col items-start mt-0.5">
                  <span className="font-cinzel-decorative text-xl lg:text-2xl font-bold tracking-[0.1em] text-royal-blue-800 group-hover:text-gold-600 transition-colors duration-300">
                    PRACHIN LUXE
                  </span>
                  <span className="font-cinzel text-[8px] sm:text-[9px] tracking-[0.25em] font-medium text-royal-blue-600/80 transition-colors duration-300 mt-[-2px]">
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
            <div className="flex items-center space-x-3 sm:space-x-5">
              
              {/* Search Icon */}
              <button
                className="text-royal-blue-700 hover:text-gold-600 transition-all duration-300"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>

              {/* User Profile Icon - Now Opens Slider */}
              <button
                onClick={() => setIsProfileSliderOpen(true)}
                className="hidden sm:block text-royal-blue-700 hover:text-gold-600 transition-all duration-300"
                aria-label="User profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </button>

              {/* Shopping Bag Icon */}
              <button
                className="relative text-royal-blue-700 hover:text-gold-600 transition-all duration-300"
                aria-label="Shopping bag"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-gold-500 text-royal-blue-950 text-[10px] font-cinzel font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden flex flex-col items-center justify-center space-y-1.5 p-1 z-50 relative ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block w-6 h-[1.5px] transition-all duration-300 ${isMobileMenuOpen ? 'bg-royal-blue-900 rotate-45 translate-y-[7.5px]' : 'bg-royal-blue-800'}`} />
                <span className={`block w-6 h-[1.5px] transition-all duration-300 ${isMobileMenuOpen ? 'bg-royal-blue-900 opacity-0 scale-x-0' : 'bg-royal-blue-800'}`} />
                <span className={`block w-6 h-[1.5px] transition-all duration-300 ${isMobileMenuOpen ? 'bg-royal-blue-900 -rotate-45 -translate-y-[7.5px]' : 'bg-royal-blue-800'}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ======================= USER PROFILE SLIDER (Desktop/Global) ======================= */}
      {/* Profile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-royal-blue-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          isProfileSliderOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsProfileSliderOpen(false)}
      ></div>

      {/* Profile Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] sm:w-[380px] bg-sand-50 z-50 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
          isProfileSliderOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Profile Slider Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold-300/30 bg-white">
          <h2 className="font-cinzel text-2xl font-bold text-royal-blue-900 tracking-wide">My Account</h2>
          <button 
            onClick={() => setIsProfileSliderOpen(false)} 
            className="text-gray-400 hover:text-gold-600 transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profile Mini Card */}
        <div className="p-6 border-b border-gold-300/30 bg-white flex items-center gap-4">
          <img 
            src={user.profilePic} 
            alt={user.name} 
            className="w-16 h-16 rounded-full border-2 border-sand-200 shadow-sm object-cover" 
          />
          <div className="flex flex-col">
            <h3 className="font-cormorant text-xl font-bold text-gray-900">{user.name}</h3>
            <span className="text-sm text-gray-500 mt-0.5">{user.phone}</span>
          </div>
        </div>

        {/* Account Links */}
        <div className="flex-grow overflow-y-auto py-4 flex flex-col">
          <Link 
            to="/profile" 
            onClick={() => setIsProfileSliderOpen(false)}
            className="flex items-center justify-between px-6 py-4 font-cormorant text-[16px] font-medium text-gray-700 hover:bg-gold-50/50 hover:text-gold-700 transition-colors border-b border-gray-100"
          >
            Personal Information
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link 
            to="/orders" 
            onClick={() => setIsProfileSliderOpen(false)}
            className="flex items-center justify-between px-6 py-4 font-cormorant text-[16px] font-medium text-gray-700 hover:bg-gold-50/50 hover:text-gold-700 transition-colors border-b border-gray-100"
          >
            Order History
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link 
            to="/wishlist" 
            onClick={() => setIsProfileSliderOpen(false)}
            className="flex items-center justify-between px-6 py-4 font-cormorant text-[16px] font-medium text-gray-700 hover:bg-gold-50/50 hover:text-gold-700 transition-colors border-b border-gray-100"
          >
            My Wishlist
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link 
            to="/addresses" 
            onClick={() => setIsProfileSliderOpen(false)}
            className="flex items-center justify-between px-6 py-4 font-cormorant text-[16px] font-medium text-gray-700 hover:bg-gold-50/50 hover:text-gold-700 transition-colors"
          >
            Saved Addresses
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Logout Button Footer */}
        <div className="p-6 border-t border-gold-300/30 bg-white">
          <button 
            onClick={() => setIsProfileSliderOpen(false)}
            className="w-full py-3.5 rounded-sm bg-royal-blue-900 text-white font-bold font-cinzel text-[12px] tracking-widest uppercase hover:bg-gold-600 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
      {/* ======================= END USER PROFILE SLIDER ======================= */}


      {/* ======================= MOBILE NAVIGATION SLIDER ======================= */}
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-royal-blue-950/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-sand-50 z-50 shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="border-b border-gray-200 bg-white">
          <Link
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full flex flex-row items-center justify-between px-6 pt-12 pb-6 focus:outline-none transition-colors duration-300 hover:bg-gray-50"
          >
            <div className="flex flex-row items-center gap-4">
              <img src={user.profilePic} alt={user.name} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-gray-200 shadow-sm object-cover" />
              <div className="flex flex-col items-start justify-center gap-0.5">
                <h3 className="font-cormorant text-xl sm:text-2xl text-gray-900 font-extrabold tracking-tight">
                  {user.name.split(' ')[0].toLowerCase()}
                </h3>
                <span className="font-cormorant text-[14px] sm:text-[15px] font-bold text-[#D97757] hover:text-[#b85f42] transition-colors duration-300">
                  View and Edit Profile
                </span>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="flex-grow overflow-y-auto py-6 px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block font-cinzel text-lg tracking-[0.1em] transition-all duration-300 pb-2 border-b border-gold-500/10 focus:outline-none ${
                location.pathname === link.path ? 'text-gold-600 font-bold' : 'text-royal-blue-800 hover:text-gold-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/orders" className="block font-cinzel text-lg tracking-[0.1em] text-royal-blue-800 hover:text-gold-600 transition-all duration-300 pb-2 border-b border-gold-500/10 mt-4" onClick={() => setIsMobileMenuOpen(false)}>My Orders</Link>
          <Link to="/wishlist" className="block font-cinzel text-lg tracking-[0.1em] text-royal-blue-800 hover:text-gold-600 transition-all duration-300 pb-2 border-b border-gold-500/10" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</Link>
        </div>

        <div className="p-6 border-t border-gold-500/20 bg-sand-100/50">
          <button onClick={() => setIsMobileMenuOpen(false)} className="w-full py-3 rounded-sm border border-royal-blue-900 text-royal-blue-900 font-bold font-cinzel text-[12px] tracking-widest uppercase hover:bg-royal-blue-900 hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </div>
      {/* ======================= END MOBILE NAVIGATION SLIDER ======================= */}
    </>
  );
};

export default Navbar;