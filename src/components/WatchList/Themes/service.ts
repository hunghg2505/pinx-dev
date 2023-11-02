import { useRequest } from 'ahooks';

import { PRIVATE_LIST_THEME_SUBSCRIBED, PUBLIC_ALL_THEME } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useGetTheme = () => {
  const { data, refresh, loading } = useRequest(() => {
    const isLogin = !!getAccessToken();
    return isLogin
      ? privateRequest(requestPist.get, PRIVATE_LIST_THEME_SUBSCRIBED)
      : requestPist.get(PUBLIC_ALL_THEME);
  });
  return {
    theme: data?.data,
    refresh,
    loading,
  };
};
