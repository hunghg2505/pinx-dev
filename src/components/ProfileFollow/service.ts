import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useOtherCustomerFollower = (idCustomer: string, params: object, config?: any) => {
  const listParams = {
    idCustomer,
    ...params,
    pageSize: 16,
  };
  return useRequest(
    async () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWER, { params: listParams })
        : requestPist.get(API_PATH.PUBLIC_GET_CUSTOMER_FOLLOWER, { params: listParams });
    },
    { ...config },
  );
};

export const useOtherCustomerFollowing = (idCustomer: string, params: object, config?: any) => {
  const listParams = {
    idCustomer,
    pageSize: 16,
    ...params,
  };
  return useRequest(
    async () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_FOLLOWING, { params: listParams })
        : requestPist.get(API_PATH.PUBLIC_GET_CUSTOMER_FOLLOWING, { params });
    },
    { ...config },
  );
};
