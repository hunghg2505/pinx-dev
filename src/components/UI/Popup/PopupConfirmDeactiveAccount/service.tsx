/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { DEACTIVATE_ACCOUNT } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

const serviceDeactivateAccout = async () => {
  return privateRequest(requestPist.put, DEACTIVATE_ACCOUNT);
};

export const useDeactivateAccout = (options?: IOptionsRequest) => {
  const requestDeactivateAccout = useRequest(serviceDeactivateAccout, {
    manual: true,
    ...options,
  });

  return requestDeactivateAccout;
};
