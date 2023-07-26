import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const useGetPost = (customerId: string, config?: any, last?: string | null) => {
  const query = {
    customerId,
    limit: 10,
    last,
  };
  return useRequest(
    async () => {
      return privateRequest(requestCommunity.get, API_PATH.GET_USER_POST, {
        params: {
          ...query,
        },
      });
    },
    { ...config },
  );
};
