import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { getAccessToken } from '@store/auth';
import { USERTYPE } from '@utils/constant';

const serviceGetUserProfile = async () => {
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
        const custStat = res?.data?.custStat;
        const acntStat = res?.data?.acntStat;
        let statusUser: string;
        if (custStat === USERTYPE.NEW) {
          statusUser = USERTYPE.NEW;
        } else if (custStat === USERTYPE.PRO && acntStat === USERTYPE.VSD_REJECTED) {
          statusUser = USERTYPE.EKYC;
        } else if (custStat === USERTYPE.PRO && acntStat === USERTYPE.PENDING_TO_CLOSE) {
          statusUser = USERTYPE.PENDING_TO_CLOSE;
        } else {
          statusUser = USERTYPE.VSD;
        }
        setUserLoginInfo((prev: any) => ({
          ...prev,
          ...res?.data,
          statusUser,
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
