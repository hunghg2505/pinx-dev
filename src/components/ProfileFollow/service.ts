import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useCustomerFollower = (fullName?: string, idCustomer?: string) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWER, {
        data: {
          fullName: 'test',
          idCustomer: 'test',
        },
      });
    },
    {
      refreshDeps: [fullName, idCustomer],
    },
  );
};

export const useCustomerFollowing = (fullName?: string, idCustomer?: string) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWING, {
        data: {
          fullName,
          idCustomer,
        },
      });
    },
    {
      refreshDeps: [fullName, idCustomer],
    },
  );
};
