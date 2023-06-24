import { useRequest } from 'ahooks';
import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';

import { API_PATH } from '@api/constant';
import { requestPist } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IUserRegisInfo {
  phoneNumber: string;
  email: string;
  password: string;
  recaptcha: string;
}

const encryptPassword = (value: string) => {
  const hash = sha256(value);
  const pass = Base64.stringify(hash);
  return pass;
};

export const useRegister = (options?: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async ({ phoneNumber, email, password, recaptcha }: IUserRegisInfo) => {
      return requestPist.post(API_PATH.REGISTER, {
        data: {
          email,
          phone: phoneNumber,
          reCAPTCHA: recaptcha,
          password: encryptPassword(password),
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
