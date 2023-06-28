import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist } from '@api/request';
import { getRegisterToken } from '@store/auth';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySubmitOtp {
  otp: string;
}

const token = getRegisterToken() as string;

export const useRegisterOtp = (options: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async (value: IBodySubmitOtp) => {
      return requestPist.post(API_PATH.REGISTER_OTP, {
        headers: {
          Authorization: token,
        },
        params: value,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};

export const useResendRegisterOtp = (options: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async () => {
      return requestPist.post(API_PATH.RESEND_REGISTER_OTP, {
        headers: {
          Authorization: token,
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
