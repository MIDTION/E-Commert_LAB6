import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'kmitl_chumphon_sso_secret_key'
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('sso_token')?.value;

  // Protect store and inventory routes
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/store') || request.nextUrl.pathname.startsWith('/inventory');

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    try {
      await jwtVerify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/store/:path*', '/inventory/:path*'],
};
