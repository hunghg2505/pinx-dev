import { isPlainObject } from './isPlainObject';
import { CookieOptions, CookieValues } from './types';

export function set(name: CookieValues, value: CookieValues, options?: CookieOptions) {
  if (typeof name === 'string') {
    const opt = (isPlainObject(options) ? options : { expires: options }) as CookieOptions;
    const path = opt.path === undefined ? ';path=/' : `;path=${opt.path};path=/`;
    const domain = opt.domain ? `;domain=${opt.domain}` : '';
    const secure = opt.secure ? ';secure' : '';
    let expires = opt.expires === undefined ? ('' as any) : opt.expires;
    const sameSite = opt.sameSite ? `;SameSite=${opt.sameSite}` : '';

    if (typeof expires === 'string' && expires !== '') {
      expires = new Date(expires);
    } else if (typeof expires === 'number') {
      expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * expires);
    }

    if (expires !== '' && 'toGMTString' in expires) {
      expires = `;expires=${expires.toGMTString()}`;
    }

    // eslint-disable-next-line unicorn/no-document-cookie
    document.cookie = `${name}=${
      encodeURI(value as any) + expires + path + domain + secure + sameSite
    }`;
  }
}
