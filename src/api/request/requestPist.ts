import { extend } from 'umi-request';

import { PREFIX_API_PIST, REQ_TIMEOUT } from '@api/request/constant';
import { redirectlogin } from '@api/request/redirectlogin';
import { getLocaleCookie } from '@store/locale';

export const requestPist = extend({
  prefix: PREFIX_API_PIST,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'App-Name': 'PineX_Web',
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
