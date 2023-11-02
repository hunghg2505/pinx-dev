import { useRequest } from 'ahooks';

import { KOL, PRIVATE_LIST_KOLS } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useGetInfluencer = (options = {}, params = {}) => {
  const { data, refresh, loading, run } = useRequest(
    (params2 = {}) => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestPist.get, PRIVATE_LIST_KOLS, {
            params: {
              ...params,
              ...params2,
            },
          })
        : requestPist.get(KOL, {
            params: {
              ...params,
              ...params2,
            },
          });
    },
    {
      ...options,
    },
  );
  return {
    KOL: data?.data?.list || data?.data,
    refresh,
    loading,
    fetchInfluencer: run,
  };
};
