import { useRequest } from 'ahooks';

import { API_PATH, requestPist } from '@api/request';

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

export const useRegister = (options?: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async ({ phoneNumber, email, password, recaptcha }: IUserRegisInfo) => {
      return requestPist.post(API_PATH.REGISTER, {
        data: {
          email,
          phone: phoneNumber,
          reCAPTCHA: recaptcha,
          password,
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
