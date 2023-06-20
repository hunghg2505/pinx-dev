/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PATH: any = [
];


// Check auth from server side here
export function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get('accessToken');

  const url = request.nextUrl.clone();
  const isMatchPath = PATH.find((path: string) => request.nextUrl.pathname.includes(path));

  if (!token && (isMatchPath || request.nextUrl.pathname === '/')) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)',
    '/',
  ],
};
