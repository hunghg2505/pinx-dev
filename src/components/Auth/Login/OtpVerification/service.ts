import { useRequest } from 'ahooks';

import { API_PATH, requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySubmitOtp {
  cif: string;
  type: string;
  value: string;
}

const serviceSubmitOtp = async (values: IBodySubmitOtp) => {
  return privateRequest(requestPist.post, API_PATH.SUBMIT_LOGIN_OTP, {
    data: values,
  });
};

export const useLoginOtp = (options: IOptionsRequest) => {
  const requestSubmitOtp = useRequest(serviceSubmitOtp, {
    manual: true,
    ...options,
  });

  return requestSubmitOtp;
};

const serviceResendLoginOtp = async () => {
  return privateRequest(requestPist.post, API_PATH.RESEND_REGISTER_OTP);
};

export const useResendLoginOtp = (options: IOptionsRequest) => {
  const requestResendRegisterOtp = useRequest(serviceResendLoginOtp, {
    manual: true,
    ...options,
  });

  return requestResendRegisterOtp;
};
