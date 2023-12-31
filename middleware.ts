import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  LOGIN,
  FORGOT_PASSWORD,
  REGISTER_USER_NAME,
  REGISTER_OTP_VERIFICATION,
  UPDATE_USER_PROFILE,
  WATCHLIST,
} from 'src/constant/route';

const AUTH_PATH: any = [
  LOGIN,
  FORGOT_PASSWORD,
  REGISTER_USER_NAME,
  REGISTER_OTP_VERIFICATION,
  UPDATE_USER_PROFILE,
];
const PAGE_LOGIN: any = [WATCHLIST];
// const PATH: any = [''];

// Check auth from server side here
export function middleware(request: NextRequest) {
  const { cookies } = request;
  const token = cookies.get('accessToken');

  const url = request.nextUrl.clone();

  const isMatchAuthPath = AUTH_PATH.find((path: string) => request.nextUrl.pathname === path);
  const isMatchLoginPath = PAGE_LOGIN.find((path: string) => request.nextUrl.pathname === path);
  // const isMatchPath = PATH.find((path: string) => request.nextUrl.pathname.includes(path));
  if (!token && isMatchLoginPath) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
  if (token && isMatchAuthPath) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|static|_next/static|_next/image|robots.txt|public|images|manifest.json|sw.js|favicon.ico|workbox-*).*)',
    '/',
  ],
};
