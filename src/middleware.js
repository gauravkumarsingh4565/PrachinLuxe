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
  const isOnboardingRoute = pathname === '/onboarding';

  // 1. Unauthenticated user redirect
  if (!isAuthenticated) {
    if (isDashboardRoute || isOnboardingRoute) {
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

  return NextResponse.next();
}

// Match only dashboard paths and onboarding path for performance
export const config = {
  matcher: ['/dashboard/:path*', '/onboarding'],
};
