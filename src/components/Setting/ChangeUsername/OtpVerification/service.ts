import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodyChangeUsername {
  authType: string;
  cif: string;
  connId: string;
  token: string;
}

const serviceChamgeUsername = async (values: IBodyChangeUsername) => {
  return privateRequest(requestPist.post, API_PATH.CHANGE_USERNAME, {
    data: values,
  });
};

export const useChangeUsername = (options: IOptionsRequest) => {
  const requestChangeUsername = useRequest(serviceChamgeUsername, {
    manual: true,
    ...options,
  });

  return requestChangeUsername;
};
