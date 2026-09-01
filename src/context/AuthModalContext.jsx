"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AuthModal from '@/components/AuthModal';
import CountdownPage from '@/components/CountdownPage';
import confetti from 'canvas-confetti';

const AuthModalContext = createContext();

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalStep, setModalStep] = useState('login'); // 'login' | 'onboarding'
  const prevAuthRef = useRef(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  // Read login presentation mode from env ('route' | 'popup') with whitespace trimming
  const getLoginMode = () => {
    const rawMode = process.env.NEXT_PUBLIC_LOGIN_MODE ?? process.env.LOGIN_MODE ?? '';
    const normalized = String(rawMode).trim().toLowerCase();
    return normalized === 'route' ? 'route' : 'popup';
  };
  const loginMode = getLoginMode();

  // Read SHOW_COUNTDOWN setting from env (NEXT_PUBLIC_SHOW_COUNTDOWN -> SHOW_COUNTDOWN fallback)
  // Evaluates to true only when set to 'yes' (case-insensitive & leading/trailing whitespace trimmed)
  const getShowCountdown = () => {
    const rawVal = process.env.NEXT_PUBLIC_SHOW_COUNTDOWN ?? process.env.SHOW_COUNTDOWN ?? '';
    const normalized = String(rawVal).trim().toLowerCase();
    return normalized === 'yes';
  };
  const showCountdown = getShowCountdown();

  // Same sparkle celebration as order confirmation
  const triggerSparkle = () => {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#C9A84C', '#1e3a8a', '#ffffff', '#fde68a'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        zIndex: 99999,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        zIndex: 99999,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // Synchronize modal state with NextAuth session in popup mode
  useEffect(() => {
    if (loginMode !== 'popup') return;

    // Check if user is logged in via NextAuth
    const isAuthenticated = status === 'authenticated' && !!session?.user;
    const isFullyOnboarded = isAuthenticated && session?.user?.isOnboarded === true;

    // Trigger sparkle celebration when user completes login
    if (isFullyOnboarded && !prevAuthRef.current) {
      triggerSparkle();
    }
    prevAuthRef.current = isFullyOnboarded;

    if (!isAuthenticated && status !== 'loading') {
      // Unauthenticated user -> ALWAYS open login popup
      setModalStep('login');
      setIsOpen(true);
    } else if (isAuthenticated) {
      if (session?.user?.isOnboarded === false) {
        // New user authenticated via Google OAuth -> show onboarding form in modal
        setModalStep('onboarding');
        setIsOpen(true);
      } else if (session?.user?.isOnboarded === true) {
        // Existing onboarded user -> close modal
        setIsOpen(false);
      }
    }
  }, [status, session, loginMode]);

  const openLogin = () => {
    if (loginMode === 'route') {
      router.push('/login');
    } else {
      if (status === 'authenticated' && session?.user?.isOnboarded === false) {
        setModalStep('onboarding');
      } else {
        setModalStep('login');
      }
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen && loginMode === 'popup') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, loginMode]);

  const isUserFullyLoggedIn = status === 'authenticated' && !!session?.user && session?.user?.isOnboarded !== false;

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        modalStep,
        loginMode,
        openLogin,
        closeModal,
        setModalStep,
        triggerSparkle,
      }}
    >
      {showCountdown ? (
        <>
          <CountdownPage />
          {isOpen && loginMode === 'popup' && (
            <AuthModal
              isOpen={isOpen}
              modalStep={modalStep}
              onClose={closeModal}
            />
          )}
        </>
      ) : (
        <>
          {children}
          {isOpen && loginMode === 'popup' && (
            <AuthModal
              isOpen={isOpen}
              modalStep={modalStep}
              onClose={closeModal}
            />
          )}
        </>
      )}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}
