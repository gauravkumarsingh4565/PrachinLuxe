'use client';

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if session loading finishes and user is not authenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-outfit text-amber-900 tracking-wide font-medium">Verifying Access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white border border-amber-900/10 rounded-2xl shadow-xl overflow-hidden">
        {/* Header Block */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-950 px-8 py-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-16 h-16 rounded-full border-2 border-amber-200 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-amber-700 flex items-center justify-center border-2 border-amber-200 shadow-md font-cinzel text-xl text-white font-bold">
                  {session.user.name ? session.user.name[0] : 'U'}
                </div>
              )}
              <div>
                <h1 className="font-cinzel text-2xl font-bold text-white tracking-wider">
                  {session.user.name?.toUpperCase() || 'LUXE USER'}
                </h1>
                <p className="font-outfit text-amber-200/80 text-sm tracking-wide">
                  Gold & Antique Collectibles Account
                </p>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="px-5 py-2.5 bg-amber-700/30 hover:bg-amber-700/50 border border-amber-500/20 text-white rounded-lg font-outfit text-xs font-bold uppercase tracking-widest transition duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Details Block */}
        <div className="px-8 py-10 space-y-8">
          <div>
            <h2 className="font-cinzel text-lg font-bold text-amber-900 tracking-wider mb-4 border-b border-amber-900/10 pb-2">
              Security & Profile Context
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="block font-outfit text-xs text-amber-950/40 font-bold uppercase tracking-wider">
                  Database User ID
                </span>
                <span className="block font-outfit text-sm text-amber-950 font-medium break-all select-all">
                  {session.user.id}
                </span>
              </div>

              <div className="space-y-1">
                <span className="block font-outfit text-xs text-amber-950/40 font-bold uppercase tracking-wider">
                  Email Address
                </span>
                <span className="block font-outfit text-sm text-amber-950 font-medium select-all">
                  {session.user.email}
                </span>
              </div>

              <div className="space-y-1">
                <span className="block font-outfit text-xs text-amber-950/40 font-bold uppercase tracking-wider">
                  Phone Number (Onboarded)
                </span>
                <span className="block font-outfit text-sm text-amber-900 font-semibold select-all">
                  {session.user.phoneNumber || 'Not Set'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="block font-outfit text-xs text-amber-950/40 font-bold uppercase tracking-wider">
                  Onboarding Interception
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold font-outfit bg-green-50 text-green-700 border border-green-200">
                  Completed (isOnboarded: {String(session.user.isOnboarded)})
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/50 border border-amber-900/5 rounded-xl p-6">
            <h3 className="font-cinzel text-sm font-bold text-amber-900 tracking-wider mb-2">
              NextAuth Session Diagnostics
            </h3>
            <p className="font-outfit text-xs text-amber-800/70 leading-relaxed mb-4">
              Below is the raw decrypted NextAuth Session payload stored in memory and synchronized on the client. Notice how the custom database properties are persisted without querying MongoDB repeatedly.
            </p>
            <pre className="bg-amber-950 text-amber-100 font-mono text-[11px] p-4 rounded-lg overflow-x-auto select-all max-h-48">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
