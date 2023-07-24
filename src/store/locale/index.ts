import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const PINX_LOCALE = 'PINX_LOCALE';

export const getLocaleCookie = (res?: any, req?: any) => {
  if (res && req) {
    return getCookie(PINX_LOCALE, { req, res });
  }
  return getCookie(PINX_LOCALE) || '';
};

export const setLocaleCookie = (locale: string) => {
  setCookie(PINX_LOCALE, locale, {
    maxAge: 253_388_249_370,
  });
};

export const deleteLocaleCookie = () => {
  deleteCookie(PINX_LOCALE);
};
