import { useRequest } from 'ahooks';

import { PRIVATE_ALL_THEME, PUBLIC_ALL_THEME } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useGetTheme = () => {
  const { data, refresh, loading, run } = useRequest(
    () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, PRIVATE_ALL_THEME)
        : requestPist.get(PUBLIC_ALL_THEME);
    },
    { loadingDelay: 300, manual: true },
  );
  return {
    theme: data?.data,
    refresh,
    loading,
    fetchTheme: run,
  };
};
