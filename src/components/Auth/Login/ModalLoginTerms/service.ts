/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodyConfirmContract {
  authType: string;
  cif: string;
  token: string;
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

const serviceConfirmContract = async (values: IBodyConfirmContract) => {
  return privateRequest(requestPist.post, API_PATH.CONFIRM_CONTRACT, {
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

const agreeContract = async (values: any) => {
  try {
    const confirmContractValues = {
      authType: values.authType,
      cif: values.cif,
      token: values.token,
    };
    const confirmSendLoginOtp = {
      authType: values.authType,
      positionNo: values.positionNo,
      trdType: values.trdType,
    };
    const resConfirmContract = serviceConfirmContract(confirmContractValues);
    const sendLoginOtp = serviceSendLoginOtp(confirmSendLoginOtp);

    return Promise.all([sendLoginOtp, resConfirmContract]);
  } catch {}
};

export const useAgreeContract = (options: IOptionsRequest) => {
  const requestAgreeCOntract = useRequest(
    async (values: any) => {
      const [resConfirmContract, sendLoginOtp] = (await agreeContract(values)) || [];

      return {
        sendLoginOtp,
        resConfirmContract,
      };
    },
    {
      manual: true,
      ...options,
    },
  );
  return requestAgreeCOntract;
};
