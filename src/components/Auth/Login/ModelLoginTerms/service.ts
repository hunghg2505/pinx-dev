/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH, requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
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
