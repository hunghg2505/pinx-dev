import { useRequest } from 'ahooks';

import { PRIVATE_WATCHLIST_STOCK } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useGetWatchList = () => {
  const { data } = useRequest(
    () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, PRIVATE_WATCHLIST_STOCK)
        : new Promise<void>((resolve) => {
            resolve();
          });
    },
    {
      cacheKey: 'watchList',
      staleTime: -1,
    },
  );

  return {
    watchList: data?.data,
  };
};
