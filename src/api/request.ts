import TokenManager from 'brainless-token-manager';
import toast from 'react-hot-toast';
import { extend } from 'umi-request';

import { deleteAuthCookies, getAccessToken } from '@store/auth';
import { getLocaleCookie } from '@store/locale';
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
export const PREFIX_API_UPLOADPHOTO = ENV.URL_UPLOADPHOTO;

const redirectlogin = (error: any) => {
  if (getAccessToken() && (error?.response?.status === 401 || error?.response?.status === 403)) {
    localStorage.clear();
    deleteAuthCookies();
    window.location.href = '/auth/login';
    toast('Session expired');
    return;
  }

  throw error?.data || error?.response;
};

// const showApiError = (error: any) => {
//   if (isDev) {
//     switch (error?.response?.status) {
//       case 400: {
//         toast.error(`${error?.response?.status} \n\n ${error?.response?.url}`, {
//           position: 'top-right',
//         });
//         break;
//       }
//       case 403: {
//         toast.error(`${error?.response?.status} \n\n ${error?.response?.url}`, {
//           position: 'top-right',
//         });
//         break;
//       }
//       case 500: {
//         toast.error(`${error?.response?.status} \n\n ${error?.response?.url}`, {
//           position: 'top-right',
//         });
//         break;
//       }
//       default: {
//         toast.success(`${error?.response?.status} \n\n ${error?.response?.url}`, {
//           position: 'top-right',
//         });
//         break;
//       }
//     }
//   } else {
//     switch (error?.response?.status) {
//       case 400: {
//         // eslint-disable-next-line no-console
//         console.log(`${error?.response?.status} - ${error?.response?.url}`);
//         break;
//       }
//       case 403: {
//         // eslint-disable-next-line no-console
//         console.log(`${error?.response?.status} - ${error?.response?.url}`);
//         break;
//       }
//       case 500: {
//         // eslint-disable-next-line no-console
//         console.log(`${error?.response?.status} - ${error?.response?.url}`);
//         break;
//       }
//       default: {
//         break;
//       }
//     }
//   }
// };

const requestPist = extend({
  prefix: PREFIX_API_PIST,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    // 'Accept-Language': (getLocaleCookie() as string) || 'vi',
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
    // 'Accept-Language': (getLocaleCookie() as string) || 'vi',
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
    'Accept-Language': (getLocaleCookie() as string) || 'vi',
  },
  errorHandler: (error) => {
    redirectlogin(error);
  },
});

const requestCommunity = extend({
  prefix: PREFIX_API_COMMUNITY,
  timeout: REQ_TIMEOUT,
  // headers: {
  //   'Accept-Language': (getLocaleCookie() as string) || 'vi',
  // },
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

export const requestFromServer = async (ctx: any, suffixUrl: string) => {
  const token = getAccessToken(ctx?.res, ctx?.req);

  return privateRequest(fetch, `${PREFIX_API_COMMUNITY}${suffixUrl}`, {
    token,
  }).then((r) => r.json());
};

export { privateRequest, requestPist, requestCommunity, requestMarket, requestUploadPhoto };
