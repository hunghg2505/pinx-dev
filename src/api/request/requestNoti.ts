import { extend } from 'umi-request';

import { PREFIX_API_IP_NOTIFICATION, REQ_TIMEOUT } from '@api/request/constant';
import { redirectlogin } from '@api/request/redirectlogin';
import { getLocaleCookie } from '@store/locale';

export const requestNoti = extend({
  prefix: PREFIX_API_IP_NOTIFICATION,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'App-Name': 'PineX_Web',
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
