import { get, remove, set } from '@utils/cookies';

export const PINEX_LOCALE = 'PINEX_LOCALE';

export const getLocaleCookie = () => {
  return get(PINEX_LOCALE) || '';
};

export const setLocaleCookie = (locale: string) => {
  set(PINEX_LOCALE, locale, {
    expires: 365,
  });
};

export const deleteLocaleCookie = () => {
  remove(PINEX_LOCALE);
};
