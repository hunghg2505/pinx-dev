import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useCustomerFollower = (page = 1, config?: any) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_MY_CUSTOMER_FOLLOWER, {
        params: {
          page,
          pageSize: 16,
        },
      });
    },
    { ...config },
  );
};

export const useCustomerFollowing = (page = 1, config?: any) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_MY_CUSTOMER_FOLLOWING, {
        params: {
          page,
          pageSize: 16,
        },
      });
    },
    {
      ...config,
    },
  );
};