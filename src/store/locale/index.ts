import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const PINEX_LOCALE = 'PINEX_LOCALE';

export const getLocaleCookie = (res?: any, req?: any) => {
  if (res && req) {
    return getCookie(PINEX_LOCALE, { req, res });
  }
  return getCookie(PINEX_LOCALE) || '';
};

export const setLocaleCookie = (locale: string) => {
  setCookie(PINEX_LOCALE, locale, {
    maxAge: 253_388_249_370,
  });
};

export const deleteLocaleCookie = () => {
  deleteCookie(PINEX_LOCALE);
};
