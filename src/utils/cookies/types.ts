export interface CookieOptions {
  expires?: number | Date | string;
  maxAge?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'None' | 'Strict' | 'Lax';
}

interface CookieValuesObj {
  [key: string]: string;
}

export type CookieValues = number | string | CookieValuesObj;
