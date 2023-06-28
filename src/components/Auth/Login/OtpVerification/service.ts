import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySubmitOtp {
  cif: string;
  type: string;
  value: string;
}

interface IBodyConfirmContract {
  authType: string;
  cif: string;
  token: string;
}

interface IBodyResendLoginOtp {
  authType: string;
  positionNo: string;
  trdType: string;
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

const serviceResendLoginOtp = async (value: IBodyResendLoginOtp) => {
  return privateRequest(requestPist.post, API_PATH.SEND_LOGIN_OTP, {
    data: value,
  });
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

export const useResendLoginOtp = (options: IOptionsRequest) => {
  const requestResendRegisterOtp = useRequest(serviceResendLoginOtp, {
    manual: true,
    ...options,
  });

  return requestResendRegisterOtp;
};

const agreeContract = async (values: any) => {
  try {
    const confirmContractValues = {
      authType: values.authType,
      cif: values.cif,
      token: values.value,
    };
    const submitOtpValues = {
      cif: values.cif,
      type: values.type,
      value: values.value,
    };
    const resConfirmContract = serviceConfirmContract(confirmContractValues);
    const resSubmitOtp = serviceSubmitOtp(submitOtpValues);

    return Promise.all([resSubmitOtp, resConfirmContract]);
  } catch {}
};

export const useAgreeContract = (options: IOptionsRequest) => {
  const requestAgreeCOntract = useRequest(
    async (values: any) => {
      const [resConfirmContract, resSubmitOtp] = (await agreeContract(values)) || [];

      return {
        resConfirmContract,
        resSubmitOtp,
      };
    },
    {
      manual: true,
      ...options,
    },
  );
  return requestAgreeCOntract;
};
