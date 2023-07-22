import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useOtherCustomerFollower = (idCustomer: string, page?: number, config?: any) => {
  const params = {
    idCustomer,
    page: page || 1,
    pageSize: 16,
  };
  return useRequest(
    async () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWER, { params })
        : requestPist.get(API_PATH.PUBLIC_GET_CUSTOMER_FOLLOWER, { params });
    },
    { ...config },
  );
};

export const useOtherCustomerFollowing = (idCustomer: string, page?: number, config?: any) => {
  const params = {
    idCustomer,
    page: page || 1,
    pageSize: 16,
  };
  return useRequest(
    async () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWING, { params })
        : requestPist.get(API_PATH.PUBLIC_GET_CUSTOMER_FOLLOWING, { params });
    },
    { ...config },
  );
};
