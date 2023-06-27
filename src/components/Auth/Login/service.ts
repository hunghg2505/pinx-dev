/* eslint-disable require-await */
import { useRequest } from 'ahooks';
import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';

import { API_PATH } from '@api/constant';
import { requestPist } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

const encryptPassword = (value: string) => {
  const hash = sha256(value);
  const pass = Base64.stringify(hash);
  return pass;
};

export const useLogin = (options?: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async ({ username, password }: { username?: string; password: string }) => {
      return requestPist.post(API_PATH.LOGIN, {
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
