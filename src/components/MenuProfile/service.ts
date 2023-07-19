import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useGetProfileOtherUser = (id: number) => {
  const { data, run } = useRequest(
    () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, API_PATH.PRIVATE_GET_OTHER_USER_PROFILE(id))
        : requestPist.get(API_PATH.PUBLIC_GET_OTHER_USER_PROFILE(id));
    },
    {
      refreshDeps: [id],
    },
  );
  return {
    profileOtherUser: data?.data,
    run,
  };
};
