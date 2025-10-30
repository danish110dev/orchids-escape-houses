import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is using HTTP (not HTTPS)
  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const host = request.headers.get('host');
  
  // If protocol is HTTP, redirect to HTTPS
  if (protocol === 'http' && host) {
    const httpsUrl = `https://${host}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(httpsUrl, {
      status: 301, // Permanent redirect
    });
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: '/:path*',
};
