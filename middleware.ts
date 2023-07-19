import { ROUTE_PATH } from '@utils/common';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_PATH: any = [
  ROUTE_PATH.LOGIN,
  ROUTE_PATH.FORGOT_PASSWORD,
  ROUTE_PATH.REGISTER_USER_NAME,
  ROUTE_PATH.REGISTER_OTP_VERIFICATION,
  ROUTE_PATH.UPDATE_USER_PROFILE,
];

const PATH: any = [''];

// Check auth from server side here
export function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get('accessToken');

  const url = request.nextUrl.clone();

  const isMatchAuthPath = AUTH_PATH.find((path: string) => request.nextUrl.pathname === path);
  const isMatchPath = PATH.find((path: string) => request.nextUrl.pathname.includes(path));

  if (token && isMatchAuthPath) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // if (!token && isMatchPath) {
  //   url.pathname = '/auth/login';
  //   return NextResponse.redirect(url);
  // }

  if (request.nextUrl.locale === 'vi') {
    return NextResponse.redirect(
      new URL(`/en${request.nextUrl.pathname}${request.nextUrl.search}`, request.url),
    );
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
