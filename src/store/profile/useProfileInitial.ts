import { API_PATH, privateRequest, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';

export const serviceGetUserProfile = async (props?: any) => {
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
      onError: (err) => {
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
