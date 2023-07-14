import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
// import { getAccessToken } from '@store/auth';

export const serviceGetUserProfile = async () => {
  const requestProfile = await privateRequest(requestPist.get, API_PATH.USER_PROFILE);

  return requestProfile;
};

export const useProfileInitial = (option = {}) => {
  const { userLoginInfo, setUserLoginInfo } = useUserLoginInfo();

  const { run } = useRequest(
    async () => {
      return serviceGetUserProfile();
    },
    {
      onSuccess: (res) => {
        setUserLoginInfo({ ...res?.data, ...userLoginInfo });
      },
      onError: () => {
        setUserLoginInfo({
          ...userLoginInfo,
        });
      },
      manual: true,
      ...option,
    },
  );

  return {
    run,
  };
};
