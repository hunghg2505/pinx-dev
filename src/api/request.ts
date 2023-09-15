import TokenManager from 'brainless-token-manager';
import toast from 'react-hot-toast';
import { extend } from 'umi-request';

import { deleteAuthCookies, getAccessToken } from '@store/auth';
import { getLocaleCookie } from '@store/locale';
import { ENV } from 'src/utils/env';

const REQ_TIMEOUT = 60 * 1000;
export const isDev = ENV.NODE_ENV === 'development';

export interface IOptions {
  onSuccess?: (r: any, params: any) => void;
  onError?: (e: any) => void;
}

export const PREFIX_API_PIST = ENV.URL_API_PIST;
export const PREFIX_API_MARKET = ENV.URL_API_MARKET;
export const PREFIX_API_COMMUNITY = ENV.URL_API_COMMUNITY;
export const PREFIX_API_UPLOADPHOTO = ENV.URL_UPLOADPHOTO;
export const PREFIX_API_IP_COMMUNITY = ENV.URL_IP_API_COMMUNITY;
export const PREFIX_API_IP_PIST = ENV.URL_IP_API_PIST;
export const PREFIX_API_IP_MARKET = ENV.URL_IP_API_MARKET;
export const PREFIX_API_IP_NOTIFICATION = ENV.URL_API_NOTIFICATION;

const redirectlogin = (error: any) => {
  if (getAccessToken() && (error?.response?.status === 401 || error?.response?.status === 403)) {
    localStorage.clear();
    deleteAuthCookies();
    window.location.href = '/';
    toast('Session expired');
    return;
  }

  throw error?.data || error?.response;
};

const requestNoti = extend({
  prefix: PREFIX_API_IP_NOTIFICATION,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    // 'App-Name': 'PineX_Web',
  },
  errorHandler: (error) => {
    redirectlogin(error);
  },
});
requestNoti.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    'Accept-Language': (getLocaleCookie() as string) || 'vi',
  };

  return {
    url,
    options,
  };
});

const requestPist = extend({
  prefix: PREFIX_API_PIST,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    // 'App-Name': 'PineX_Web',
  },
  errorHandler: (error) => {
    redirectlogin(error);
  },
});
requestPist.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    'Accept-Language': (getLocaleCookie() as string) || 'vi',
  };

  return {
    url,
    options,
  };
});

const requestMarket = extend({
  prefix: PREFIX_API_MARKET,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    // 'App-Name': 'PineX_Web',
  },
  errorHandler: (error) => {
    redirectlogin(error);
  },
});
requestMarket.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    'Accept-Language': (getLocaleCookie() as string) || 'vi',
  };

  return {
    url,
    options,
  };
});

const requestUploadPhoto = extend({
  prefix: PREFIX_API_UPLOADPHOTO,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    // 'App-Name': 'PineX_Web',
  },
  errorHandler: (error) => {
    redirectlogin(error);
  },
});
requestUploadPhoto.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    'Accept-Language': (getLocaleCookie() as string) || 'vi',
  };

  return {
    url,
    options,
  };
});

const requestCommunity = extend({
  prefix: PREFIX_API_COMMUNITY,
  timeout: REQ_TIMEOUT,
  headers: {
    // 'App-Name': 'PineX_Web',
  },
  errorHandler: (error) => {
    redirectlogin(error);
  },
});
requestCommunity.interceptors.request.use((url, options) => {
  options.headers = {
    ...options.headers,
    'Accept-Language': (getLocaleCookie() as string) || 'vi',
  };

  return {
    url,
    options,
  };
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
  if (token) {
    return request(suffixUrl, {
      headers: {
        Authorization: token,
      },
      ...configs,
    });
  }
};

export const requestFromServer = async (ctx: any, suffixUrl: string) => {
  const token = getAccessToken(ctx?.res, ctx?.req);

  return privateRequest(fetch, `${PREFIX_API_COMMUNITY}${suffixUrl}`, {
    token,
  }).then((r) => r.json());
};

export {
  privateRequest,
  requestPist,
  requestCommunity,
  requestMarket,
  requestUploadPhoto,
  requestNoti,
};
