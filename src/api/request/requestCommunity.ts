import { extend } from 'umi-request';

import { PREFIX_API_COMMUNITY, REQ_TIMEOUT } from '@api/request/constant';
import { redirectlogin } from '@api/request/redirectlogin';
import { getLocaleCookie } from '@store/locale';

export const requestCommunity = extend({
  prefix: PREFIX_API_COMMUNITY,
  timeout: REQ_TIMEOUT,
  headers: {
    'App-Name': 'PineX_Web',
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
