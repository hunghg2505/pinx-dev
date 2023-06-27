import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySubmitOtp {
  otp: string;
}

const serviceRegisterOtp = async (value: IBodySubmitOtp) => {
  return privateRequest(requestPist.post, API_PATH.REGISTER_OTP, {
    params: value,
  });
};

export const useRegisterOtp = (options: IOptionsRequest) => {
  const requestRegisterOtp = useRequest(serviceRegisterOtp, {
    manual: true,
    ...options,
  });

  return requestRegisterOtp;
};

const serviceResendRegisterOtp = async () => {
  return privateRequest(requestPist.post, API_PATH.RESEND_REGISTER_OTP);
};

export const useResendRegisterOtp = (options: IOptionsRequest) => {
  const requestResendRegisterOtp = useRequest(serviceResendRegisterOtp, {
    manual: true,
    ...options,
  });

  return requestResendRegisterOtp;
};
