/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH, requestPist, privateRequest } from '@api/request';

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

interface IBodySubmitOtp {
  otp: string
}

export const useRegister = (options?: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async ({ phoneNumber, email, password, recaptcha }: IUserRegisInfo ) => {
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

const serviceRegisterOtp = async (values: IBodySubmitOtp) => {
  return await privateRequest(requestPist.post, API_PATH.REGISTER_OTP + `?otp=${values.otp}`, {
    data: values,
  });
};

export const useRegisterOtp = (options: IOptionsRequest) => {
  const requestRegisterOtp = useRequest(serviceRegisterOtp, {
    manual: true,
    ...options,
  });

  return requestRegisterOtp;
};

