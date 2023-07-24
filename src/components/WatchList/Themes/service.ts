import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useGetTheme = () => {
  const { data, refresh } = useRequest(() => {
    const isLogin = !!getAccessToken();
    return isLogin
      ? privateRequest(requestPist.get, API_PATH.PRIVATE_LIST_THEME_SUBSCRIBED)
      : requestPist.get(API_PATH.PUBLIC_ALL_THEME);
  });
  return {
    theme: data?.data,
    refresh,
  };
};
