/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySendLoginOtp {
  authType: string;
  positionNo: string;
  trdType: string;
}

const serviceGetContract = async () => {
  return privateRequest(requestPist.get, API_PATH.GET_USER_CONTRACT);
};

export const useGetContract = (options?: IOptionsRequest) => {
  const requestGetContract = useRequest(serviceGetContract, {
    manual: true,
    ...options,
  });

  return requestGetContract;
};

const serviceSendLoginOtp = async (value: IBodySendLoginOtp) => {
  return privateRequest(requestPist.post, API_PATH.SEND_LOGIN_OTP, {
    data: value,
  });
};

export const useSendLoginOtp = (options: IOptionsRequest) => {
  const requestSendLoginOtp = useRequest(serviceSendLoginOtp, {
    manual: true,
    ...options,
  });

  return requestSendLoginOtp;
};
