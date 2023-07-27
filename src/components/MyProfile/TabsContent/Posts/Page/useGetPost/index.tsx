import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const useGetMYPost = (config?: any, last?: string | null) => {
  const params = {
    limit: 10,
    last,
  };
  return useRequest(
    async () => {
      return privateRequest(requestCommunity.get, API_PATH.GET_MY_POST, {
        params,
      });
    },
    {
      ...config,      
    },
  );
};
