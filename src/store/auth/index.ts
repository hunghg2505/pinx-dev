import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const getAccessToken = (res?: any, req?: any) => {
  if (res && req) {
    return getCookie('accessToken', { req, res });
  }
  return getCookie('accessToken') || '';
};

export const getRefreshToken = (res?: any, req?: any) => {
  if (res && req) {
    return getCookie('accessRefreshToken', { req, res });
  }
  return getCookie('accessRefreshToken') || '';
};

export const setAuthCookies = (
  {
    token,
    refreshToken,
    expiredTime,
  }: {
    token: string;
    refreshToken: string;
    expiredTime?: number;
  },
  reqOnServer?: any,
) => {
  setCookie('accessToken', token, {
    maxAge: 2147483647,
    res: reqOnServer?.res,
    req: reqOnServer?.req,
  });
  setCookie('accessRefreshToken', refreshToken, {
    maxAge: 2147483647,
    res: reqOnServer?.res,
    req: reqOnServer?.req,
  });
  setCookie('tokenExpiredTime', expiredTime, {
    maxAge: 2147483647,
    res: reqOnServer?.res,
    req: reqOnServer?.req,
  });
};

export const deleteAuthCookies = () => {
  deleteCookie('accessToken');
  deleteCookie('accessRefreshToken');
  deleteCookie('tokenExpiredTime');
};
