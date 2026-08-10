"use client";

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthLoaded } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import OrderHistory from '@/components/OrderHistory';
import Link from 'next/link';

export default function OrdersPage() {
  const phoneUser = useSelector(selectUser);
  const isPhoneAuthLoaded = useSelector(selectIsAuthLoaded);
  const { data: session, status } = useSession();
  const router = useRouter();

  const isNextAuthLoaded = status !== 'loading';
  const isLoaded = isPhoneAuthLoaded && isNextAuthLoaded;
  const user = phoneUser || session?.user;

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/login');
    }
  }, [user, isLoaded, router]);

  if (!isLoaded || !user) {
    return (
      <div className="w-full min-h-screen bg-sand-100 py-12 px-4 flex items-center justify-center font-cormorant">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-cinzel text-sm font-bold text-royal-blue-900 tracking-wider">Verifying Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-sand-100 py-12 px-4 sm:px-6 lg:px-8 font-cormorant">
      <div className="max-w-[1100px] mx-auto space-y-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-500 font-semibold tracking-wide uppercase">
          <Link href="/" className="hover:text-gold-600 transition-colors">HOME</Link>
          <span className="mx-2 text-gold-400">/</span>
          <span className="text-royal-blue-900 font-bold">MY ORDERS</span>
        </nav>

        {/* Page Title */}
        <div className="text-center sm:text-left">
          <h1 className="font-cinzel text-3xl font-bold text-royal-blue-950 tracking-wider uppercase mb-1">Acquisitions</h1>
          <p className="text-gold-700 font-cinzel text-[10px] tracking-widest uppercase">Order History & Shipment Tracking</p>
          <div className="h-0.5 bg-gold-500/20 w-32 mt-3 mx-auto sm:mx-0" />
        </div>

        {/* Order History component details */}
        <div className="animate-fade-in">
          <OrderHistory />
        </div>
        
      </div>
    </div>
  );
}
