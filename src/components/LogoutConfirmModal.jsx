"use client";

import React, { useEffect } from 'react';

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 z-[100] bg-royal-blue-950/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white w-full max-w-sm rounded-xl shadow-2xl border border-gold-500/20 pointer-events-auto transform transition-all duration-300 scale-100 opacity-100 animate-fade-in-up flex flex-col font-cormorant overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header area with icon */}
          <div className="bg-sand-50/50 p-6 pb-4 flex flex-col items-center justify-center border-b border-gold-100">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3 shadow-inner border border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </div>
            <h3 className="font-cinzel text-xl font-bold text-royal-blue-950 tracking-wide text-center">
              Confirm Logout
            </h3>
          </div>

          {/* Body */}
          <div className="p-6 pt-4 text-center">
            <p className="text-gray-600 text-[17px] font-medium leading-relaxed">
              Are you sure you want to log out of your Prachin Luxe account?
            </p>
          </div>

          {/* Actions */}
          <div className="flex border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 py-4 font-cinzel text-sm font-bold text-gray-500 hover:text-royal-blue-900 hover:bg-gray-50 transition-colors uppercase tracking-widest border-r border-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-4 font-cinzel text-sm font-bold text-red-600 hover:text-white hover:bg-red-600 transition-colors uppercase tracking-widest"
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
