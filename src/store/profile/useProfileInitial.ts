import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';

export const serviceGetUserProfile = async () => {
  const requestProfile = await privateRequest(requestPist.get, API_PATH.USER_PROFILE);

  return requestProfile;
};

export const useProfileInitial = (option = {}) => {
  const { setUserLoginInfo } = useUserLoginInfo();

  const { run } = useRequest(
    async () => {
      const isLogin = getAccessToken();
      if (isLogin) {
        return serviceGetUserProfile();
      }

      return null;
    },
    {
      onSuccess: (res: any) => {
        if (!res) {
          setUserLoginInfo((prev: any) => ({
            ...prev,
            loading: false,
          }));
          return;
        }
        setUserLoginInfo((prev: any) => ({
          ...prev,
          ...res?.data,
          loading: false,
        }));
      },
      onError: () => {
        setUserLoginInfo((prev: any) => ({
          ...prev,
          loading: false,
        }));
      },
      manual: true,
      ...option,
    },
  );

  return {
    run,
  };
};
