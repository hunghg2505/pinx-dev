/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import TokenManager, { injectBearer } from 'brainless-token-manager';
import { extend } from 'umi-request';

import { ENV } from 'src/utils/env';

const REQ_TIMEOUT = 25 * 1000;
export const isDev = ENV.NODE_ENV === 'development';

export const PREFIX_API = ENV.APP_API_URL;

const request = extend({
  prefix: PREFIX_API,
  timeout: REQ_TIMEOUT,
  errorHandler: (error) => {
    throw error?.data || error?.response;
  },
});

// const tokenManager = new TokenManager({
//   getAccessToken: async () => {
//     // const token = getAccessToken();

//     // return token || '';
//     return '';
//   },
//   getRefreshToken: async () => {
//     // const refreshToken = getRefreshToken();

//     // return refreshToken || '';
//     return '';
//   },
//   executeRefreshToken: async () => {
//     return {
//       token: '',
//       refresh_token: '',
//     };
//   },
//   onRefreshTokenSuccess: ({ token, refresh_token: refreshToken }) => {
//     console.log(refreshToken);
//   },
//   onInvalidRefreshToken: async () => {
//     // Logout
//   },
// });

const FIXED_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJjaWYiOiIwMDExMjUzMyIsImZpcnN0TG9naW4iOmZhbHNlLCJ2c2QiOiIwMTBDMDcxNzU4Iiwic2Vzc2lvbiI6IktRUG9CVUpySnhIamsxRlk1TTVhWURYNEh2WGlwNXlZYmRycGpSTWlybzFtM0JUbmdWRmRmWmNkZGNyVUZCVG0iLCJhY250U3RhdCI6IkFDVElWRSIsImF1dGhEZWYiOiJUT1AiLCJ1c2VySWQiOjE1NTAsImF1dGhvcml0aWVzIjoiUk9MRV9DVVNUT01FUiIsImV4cGlyZWRBdCI6MTcxODA4MDI5MjQxOSwic3ViQWNjb3VudE5vIjoiTjAwMDc4ODkzIiwiY3VzdFN0YXQiOiJQUk8iLCJwaG9uZSI6IjA5ODYwNTcxNDciLCJhY2NvdW50Tm8iOiIwMDA3ODg3OSIsIm5hbWUiOiJU4buQTkcgVEjhu4ogTUFJIE1BSSBNQUkgTkdBIiwiZW1haWwiOiJza3NrZmxkQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiMDk4NjA1NzE0NyJ9.oHSZrVhA4OYhIJ-JqlygDhKUcAFUtGWV4Ld-poJxwvQ';

const privateRequest = async (request: any, suffixUrl: string, configs?: any) => {
  // const token: string = configs?.token ?? ((await tokenManager.getToken()) as string);

  return request(suffixUrl, injectBearer(FIXED_TOKEN, configs));
};

// dùng cái này khi gọi nhiều api ở phía server => đảm bảo có token mới nhất cho các request ở sau, tránh bị call reuqest đồng thời
export const checkTokenExpiredOnServer = async (ctx: any) => {
  try {
    // const token = getAccessToken(ctx?.res, ctx?.req);
    // const salonRefreshToken = getRefreshToken(ctx?.res, ctx?.req);
    // const decoded = parseJwt(token);
    // const { exp } = decoded;
    // const currentTime = Date.now() / 1000;
    // if (exp - 5 > currentTime) return null;
    // const res: any = await privateRequest(fetch, `${PREFIX_API}/auth/refresh-token`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ refresh_token: salonRefreshToken }),
    // }).then((r) => r.json());
    // if (res?.token && res?.refresh_token) {
    //   const objToken = {
    //     token: res?.token,
    //     refreshToken: res?.refresh_token,
    //     expiredTime: res?.expired_time || 0,
    //   };
    //   setAuthCookies(objToken, { res: ctx?.res, req: ctx?.req });
    //   return res?.token;
    // }
  } catch {}
};

export const requestFromServer = async (ctx: any, suffixUrl: string) => {
  // await checkTokenExpiredOnServer(ctx);
  // const token = getAccessToken(ctx?.res, ctx?.req);
  // const salonId = getSalonIdFromCookie(ctx?.req, ctx?.res);
  // return privateRequest(fetch, `${PREFIX_API}${suffixUrl}`, {
  //   token,
  //   headers: { salonId },
  // }).then((r) => r.json());
};

export { privateRequest, request };
