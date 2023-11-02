import { useRequest } from 'ahooks';

import { CHANGE_PASSWORD } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodyChangePassword {
  authType: string;
  cif: string;
  newPass: string;
  newPassConfirm: string;
  oldPass: string;
  token: string;
  type: string;
}

const serviceChamgePassword = async (values: IBodyChangePassword) => {
  return privateRequest(requestPist.post, CHANGE_PASSWORD, {
    data: values,
  });
};

export const useChangePassord = (options: IOptionsRequest) => {
  const requestChangePassword = useRequest(serviceChamgePassword, {
    manual: true,
    ...options,
  });

  return requestChangePassword;
};
