import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useOtherCustomerFollower = (page = 1, idCustomer?: string, config?: any) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWER, {
        params: {
          idCustomer,
          page,
          pageSize: 16,
        },
      });
    },
    { ...config },
  );
};

export const useOtherCustomerFollowing = (page = 1, idCustomer?: string, config?: any) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWING, {
        params: {
          idCustomer,
          page,
          pageSize: 16,
        },
      });
    },
    { ...config },
  );
};
