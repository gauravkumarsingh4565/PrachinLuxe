import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Retrieve NextAuth JWT token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAdminRoute = pathname.startsWith('/admin');
  const isOnboardingRoute = pathname === '/onboarding';

  // 1. Unauthenticated user redirect
  if (!isAuthenticated) {
    if (isDashboardRoute || isOnboardingRoute || isAdminRoute) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Authenticated user redirects
  const isOnboarded = !!token.isOnboarded;

  if (!isOnboarded) {
    // Authenticated but NOT onboarded: force them to `/onboarding`
    if (!isOnboardingRoute) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  } else {
    // Authenticated and already onboarded: block them from `/onboarding` and direct to `/`
    if (isOnboardingRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 3. Admin routes role check
  if (isAdminRoute && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Match main app routes + onboarding path + admin
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/onboarding',
    '/',
    '/cart',
    '/profile',
    '/orders',
    '/addresses',
    '/handmade',
    '/antique',
    '/product/:path*',
  ],
};
