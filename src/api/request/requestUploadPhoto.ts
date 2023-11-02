import { extend } from 'umi-request';

import { PREFIX_API_UPLOADPHOTO, REQ_TIMEOUT } from '@api/request/constant';
import { redirectlogin } from '@api/request/redirectlogin';
import { getLocaleCookie } from '@store/locale';

export const requestUploadPhoto = extend({
  prefix: PREFIX_API_UPLOADPHOTO,
  timeout: REQ_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'App-Name': 'PineX_Web',
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
