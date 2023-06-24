import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';

export const serviceGetUserProfile = async () => {
  const requestProfile = await privateRequest(requestPist.get, API_PATH.USER_PROFILE);

  return requestProfile;
};

export const useProfileInitial = (options = {}) => {
  const { userLoginInfo, setUserLoginInfo } = useUserLoginInfo();

  const { data } = useRequest(
    async () => {
      const isLogin = getAccessToken();
      if (isLogin) {
        return serviceGetUserProfile();
      }
      return [];
    },
    {
      onSuccess: (res) => {
        setUserLoginInfo(res?.data);
      },
      onError: () => {
        setUserLoginInfo({
          ...userLoginInfo,
        });
      },
      ...options,
    },
  );

  return {
    requestGetProfile: data?.data,
  };
};
