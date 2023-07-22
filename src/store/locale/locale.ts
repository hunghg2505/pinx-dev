import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { atomWithStorage } from 'jotai/utils';

export const localeAtom = atomWithStorage('locale', 'en');

export const getLocaleCookie = (res?: any, req?: any) => {
  if (res && req) {
    return getCookie('locale', { req, res });
  }
  return getCookie('locale') || '';
};

export const setLocaleCookie = (locale: string) => {
  setCookie('locale', locale, {
    maxAge: 253_388_249_370,
  });
};

export const deleteLocaleCookie = () => {
  deleteCookie('locale');
};
