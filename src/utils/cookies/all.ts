import { isSSR } from './isSSR';

export function all(cookie?: string): Record<string, string> {
  try {
    let cookieStr = cookie;

    if (!isSSR()) {
      cookieStr = cookie || document?.cookie;
    }

    if (!cookieStr) {
      return {};
    }

    const cookies: any[] = cookieStr.split('; ');
    const result: Record<string, string> = {};

    for (let i = 0, l = cookies.length; i < l; i++) {
      const item = cookies[i].split('=');
      result[decodeURI(item[0])] = decodeURI(item[1]);
    }
    return result;
  } catch {
    return {};
  }
}
