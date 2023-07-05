import { useRequest } from 'ahooks';
import { getCookie } from 'cookies-next';

import { API_PATH } from '@api/constant';
import { requestPist } from '@api/request';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySubmitOtp {
  otp: string;
}

const token = getCookie('registerToken') as string;

export const useRegisterOtp = (options: IOptionsRequest) => {
  const { userRegisterInfo } = useUserRegisterInfo();

  return useRequest(
    // eslint-disable-next-line require-await
    async (value: IBodySubmitOtp) => {
      return requestPist.post(API_PATH.REGISTER_OTP, {
        headers: {
          Authorization: token || (userRegisterInfo.token as string),
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
  const { userRegisterInfo } = useUserRegisterInfo();

  return useRequest(
    // eslint-disable-next-line require-await
    async () => {
      return requestPist.post(API_PATH.RESEND_REGISTER_OTP, {
        headers: {
          Authorization: token || (userRegisterInfo.token as string),
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
