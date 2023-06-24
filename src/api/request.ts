import TokenManager from 'brainless-token-manager';
import { extend } from 'umi-request';

import { getAccessToken } from '@store/auth';
import { ENV } from 'src/utils/env';

const REQ_TIMEOUT = 25 * 1000;
export const isDev = ENV.NODE_ENV === 'development';

export interface IOptions {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

export const PREFIX_API_PIST = ENV.URL_API_PIST;
export const PREFIX_API_MARKET = ENV.URL_API_MARKET;
export const PREFIX_API_COMMUNITY = ENV.URL_API_COMMUNITY;

const requestPist = extend({
  prefix: PREFIX_API_PIST,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler: (error) => {
    throw error?.data || error?.response;
  },
});

const requestMarket = extend({
  prefix: PREFIX_API_MARKET,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler: (error) => {
    throw error?.data || error?.response;
  },
});

const requestCommunity = extend({
  prefix: PREFIX_API_COMMUNITY,
  timeout: REQ_TIMEOUT,
  headers: {},
  errorHandler: (error) => {
    throw error?.data || error?.response;
  },
});

const tokenManager = new TokenManager({
  getAccessToken: async () => {
    const token = getAccessToken();

    return `${token}`;
  },
  getRefreshToken: async () => {
    const token = getAccessToken();
    return `${token}`;
  },
  onInvalidRefreshToken: () => {},
  isValidToken: async () => {
    return true;
  },
  isValidRefreshToken: async () => {
    return true;
  },
});

const privateRequest = async (request: any, suffixUrl: string, configs?: any) => {
  const token: string = configs?.token ?? ((await tokenManager.getToken()) as string);
  return request(suffixUrl, {
    headers: {
      Authorization: token,
    },
    ...configs,
  });
};

// dùng cái này khi gọi nhiều api ở phía server => đảm bảo có token mới nhất cho các request ở sau, tránh bị call reuqest đồng thời
export const checkTokenExpiredOnServer = async () => {
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

export const requestFromServer = async () => {
  // await checkTokenExpiredOnServer(ctx);
  // const token = getAccessToken(ctx?.res, ctx?.req);
  // const salonId = getSalonIdFromCookie(ctx?.req, ctx?.res);
  // return privateRequest(fetch, `${PREFIX_API}${suffixUrl}`, {
  //   token,
  //   headers: { salonId },
  // }).then((r) => r.json());
};

const API_PATH = {
  // Auth
  LOGIN: '/public/customer/loginSSO',
  REGISTER: '/public/customer/register/credentials',
  REGISTER_OTP: '/public/customer/register/otp/verify',
  SUBMIT_LOGIN_OTP: '/private/get-token',
  RESEND_REGISTER_OTP: '/public/customer/register/otp/resend',
  CREATE_USER_NAME: '/public/customer/register/login-id',
  GET_USER_CONTRACT: '/private/user-info/contract',
  CONFIRM_CONTRACT: '/private/user-info/confirm',
  READ_CONTRACT: '/public/contract/read',
  SEND_LOGIN_OTP: '/private/generate-auth',
  USER_PROFILE: '/private/customer/profile',
};

export { API_PATH, privateRequest, requestPist, requestCommunity, requestMarket };
