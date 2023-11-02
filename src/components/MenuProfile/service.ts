import { useRequest } from 'ahooks';

import { PRIVATE_GET_OTHER_USER_PROFILE, PUBLIC_GET_OTHER_USER_PROFILE } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useGetProfileOtherUser = (id: number, config?: any) => {
  const { data, run, refresh, loading } = useRequest(
    () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, PRIVATE_GET_OTHER_USER_PROFILE(id))
        : requestPist.get(PUBLIC_GET_OTHER_USER_PROFILE(id));
    },
    {
      refreshDeps: [id],
      ...config,
    },
  );
  return {
    profileOtherUser: data?.data,
    refresh,
    loading,
    run,
  };
};
