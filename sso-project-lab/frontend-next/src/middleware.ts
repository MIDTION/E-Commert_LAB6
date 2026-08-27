import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('sso_token')?.value;

  // Protect store and inventory routes
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/store') || request.nextUrl.pathname.startsWith('/inventory');

  if (isProtectedRoute && !token) {
    // Redirect to home page if not authenticated
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/store/:path*', '/inventory/:path*'],
};
