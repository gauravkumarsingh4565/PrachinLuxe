"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { selectUser, selectIsAuthLoaded } from '@/redux/slices/authSlice';

export default function AdminLayout({ children }) {
  const phoneUser = useSelector(selectUser);
  const isPhoneAuthLoaded = useSelector(selectIsAuthLoaded);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isNextAuthLoaded = status !== 'loading';
  const isLoaded = isPhoneAuthLoaded && isNextAuthLoaded;

  const sessionUser = session?.user;
  const user = phoneUser || (sessionUser ? {
    name: sessionUser.name,
    email: sessionUser.email,
    profilePic: sessionUser.image,
    role: sessionUser.role || 'NORMALUSER',
  } : null);

  const isAdmin = user?.role === 'ADMIN';

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    } else if (!isAdmin) {
      router.replace('/');
    }
  }, [isLoaded, user, isAdmin, router, pathname]);

  // Loading state while checking authentication
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-sand-100 py-16 px-4 flex items-center justify-center font-cormorant">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-cinzel text-sm font-bold text-royal-blue-950 tracking-wider">Verifying Admin Authorization...</p>
        </div>
      </div>
    );
  }

  // Not logged in or not an ADMIN (show temporary redirecting view)
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-sand-100 py-16 px-4 flex items-center justify-center font-cormorant">
        <div className="text-center space-y-4 max-w-md mx-auto p-8 bg-white rounded-2xl border border-gold-500/20 shadow-gold">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="font-cinzel text-xl font-bold text-royal-blue-950 uppercase tracking-wider">Access Restricted</h2>
          <p className="text-gray-600 text-sm">
            {!user 
              ? "You must be logged in as an Administrator to view this page. Redirecting to login..." 
              : "This area is restricted to administrators only. Redirecting to home..."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
