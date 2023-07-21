import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useOtherCustomerFollower = (fullName?: string, idCustomer?: string) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWER, {
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

export const useOtherCustomerFollowing = (fullName?: string, idCustomer?: string) => {
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
export const useCustomerFollower = (fullName?: string, idCustomer?: string) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_MY_CUSTOMER_FOLLOWER, {
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

export const useCustomerFollowing = (fullName?: string, idCustomer?: string) => {
  return useRequest(
    async () => {
      return privateRequest(requestPist.get, API_PATH.GET_MY_CUSTOMER_FOLLOWING, {
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