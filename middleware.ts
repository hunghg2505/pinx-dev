import { NextResponse } from 'next/server';

// Check auth from server side here
export function middleware() {
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)',
    '/',
  ],
};
