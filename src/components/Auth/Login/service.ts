/* eslint-disable require-await */
import { useRequest } from 'ahooks';
import { i18n } from 'next-i18next';

import { API_PATH } from '@api/constant';
import { requestPist } from '@api/request';
import { encryptPassword } from '@utils/common';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

export const useLogin = (options?: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async ({ username, password }: { username?: string; password: string }) => {
      return requestPist.post(API_PATH.LOGIN, {
        data: {
          connId: username,
          connSecrNo: encryptPassword(password),
        },
        headers: {
          'Accept-Language': i18n?.language as string,
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
