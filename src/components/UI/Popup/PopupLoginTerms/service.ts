/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { GET_USER_CONTRACT, SEND_LOGIN_OTP, CONFIRM_CONTRACT } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySendLoginOtp {
  authType: string;
  positionNo?: number;
  trdType: string;
}

interface IBodyConfirmContract {
  authType: string;
  cif: string;
  token: string;
}

const serviceGetContract = async () => {
  return privateRequest(requestPist.get, GET_USER_CONTRACT);
};

export const useGetContract = (options?: IOptionsRequest) => {
  const requestGetContract = useRequest(serviceGetContract, {
    manual: true,
    ...options,
  });

  return requestGetContract;
};

const serviceSendLoginOtp = async (value: IBodySendLoginOtp) => {
  return privateRequest(requestPist.post, SEND_LOGIN_OTP, {
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

const serviceConfirmContract = async (values: IBodyConfirmContract) => {
  return privateRequest(requestPist.post, CONFIRM_CONTRACT, {
    data: values,
  });
};

export const useConfirmContract = (options?: IOptionsRequest) => {
  const requestConfirmContract = useRequest(serviceConfirmContract, {
    manual: true,
    ...options,
  });

  return requestConfirmContract;
};
