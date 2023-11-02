/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { LOGIN } from '@api/constant';
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
      return requestPist.post(LOGIN, {
        data: {
          connId: username,
          connSecrNo: encryptPassword(password),
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
