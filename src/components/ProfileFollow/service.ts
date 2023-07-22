import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useOtherCustomerFollower = (idCustomer?: string) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWER, {
        params: {
          idCustomer,
        },
      });
    },
    {
      refreshDeps: [idCustomer],
    },
  );
};

export const useOtherCustomerFollowing = (idCustomer?: string) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWING, {
        params: {
          idCustomer,
        },
      });
    },
    {
      refreshDeps: [idCustomer],
    },
  );
};
