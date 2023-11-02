import { useRequest } from 'ahooks';

import { PRIVATE_PINNED_POST, PUBLIC_PINNED_POST } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';
import { getAccessToken } from '@store/auth';

// get pin post
export const useGetPinedPost = () => {
  const { data, loading, refresh } = useRequest(
    async () => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestCommunity.get, PRIVATE_PINNED_POST)
        : requestCommunity.get(PUBLIC_PINNED_POST);
    },
    {
      // staleTime: -1,
      cacheKey: 'data-pin-post',
      loadingDelay: 3000,
    },
  );

  return {
    pinedPost: data?.data,
    loading,
    refresh,
  };
};
