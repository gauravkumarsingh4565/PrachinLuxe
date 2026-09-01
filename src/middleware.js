import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const loginMode = process.env.LOGIN_MODE || process.env.NEXT_PUBLIC_LOGIN_MODE || 'route';

  // Retrieve NextAuth JWT token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isAdminRoute = pathname.startsWith('/admin');
  const isOnboardingRoute = pathname === '/onboarding';

  // 0. Popup mode: block /login, /signup, /onboarding routes and direct user to Home (/)
  if (loginMode === 'popup') {
    if (pathname === '/login' || pathname === '/signup' || pathname === '/onboarding') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    if (isAdminRoute && (!token || token.role !== 'ADMIN')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  // 1. Unauthenticated user redirect (Route mode)
  if (!isAuthenticated) {
    if (isDashboardRoute || isOnboardingRoute || isAdminRoute) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Authenticated user redirects (Route mode)
  const isOnboarded = !!token.isOnboarded;

  if (!isOnboarded) {
    if (!isOnboardingRoute) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  } else {
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
    '/login',
    '/signup',
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
