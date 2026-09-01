"use client";

import React, { Suspense } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthModal({ isOpen, modalStep, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-royal-blue-950/60 backdrop-blur-md transition-all duration-300 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-[500px] bg-white rounded-3xl shadow-2xl border border-gold-500/20 overflow-hidden flex flex-col max-h-[92vh] transition-transform duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[92vh] scrollbar-thin scrollbar-thumb-gold-400">
          <Suspense
            fallback={
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-sans text-gray-500">
                  {modalStep === 'onboarding' ? 'Loading onboarding...' : 'Loading sign in...'}
                </span>
              </div>
            }
          >
            {modalStep === 'onboarding' ? (
              <SignupForm isModal onCloseModal={onClose} />
            ) : (
              <LoginForm isModal />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
