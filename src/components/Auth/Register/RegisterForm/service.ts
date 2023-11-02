import { useRequest } from 'ahooks';

import { REGISTER } from '@api/constant';
import { requestPist } from '@api/request';
import { encryptPassword } from '@utils/common';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IUserRegisInfo {
  phoneNumber: string;
  email: string;
  password: string;
  recaptcha: any;
}

export const useRegister = (options?: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async ({ phoneNumber, email, password, recaptcha }: IUserRegisInfo) => {
      return requestPist.post(REGISTER, {
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
