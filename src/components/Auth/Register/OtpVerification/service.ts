import { useRequest } from 'ahooks';

import { REGISTER_OTP, RESEND_REGISTER_OTP } from '@api/constant';
import { requestPist } from '@api/request';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { get } from '@utils/cookies';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySubmitOtp {
  otp: string;
}

export const useRegisterOtp = (options: IOptionsRequest) => {
  const { userRegisterInfo } = useUserRegisterInfo();

  return useRequest(
    // eslint-disable-next-line require-await
    async (value: IBodySubmitOtp) => {
      const token = get('registerToken') as string;

      return requestPist.post(REGISTER_OTP, {
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
      const token = get('registerToken') as string;

      return requestPist.post(RESEND_REGISTER_OTP, {
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
