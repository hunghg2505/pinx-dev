import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const pageSize = 16;
export const useCustomerFollower = (params: object, config?: any) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_MY_CUSTOMER_FOLLOWER, {
        params: {
          ...params,
          pageSize,
        },
      });
    },
    { ...config },
  );
};

export const useCustomerFollowing = (params: object, config?: any) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_MY_CUSTOMER_FOLLOWING, {
        params: {
          ...params,
          pageSize,
        },
      });
    },
    {
      ...config,
    },
  );
};
