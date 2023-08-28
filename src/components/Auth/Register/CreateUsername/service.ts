import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist } from '@api/request';
import { useUserRegisterInfo } from '@hooks/useUserRegisterInfo';
import { getRegisterToken } from '@store/auth';

interface IOptionsRequest {
  onSuccess?: (r: any, params?: any) => void;
  onError?: (e: any, params?: any) => void;
}

interface IBodySubmitUsername {
  username: string;
}

const token = getRegisterToken() as string;

export const useCreateUsername = (options: IOptionsRequest) => {
  const { userRegisterInfo } = useUserRegisterInfo();

  return useRequest(
    // eslint-disable-next-line require-await
    async (value: IBodySubmitUsername) => {
      return requestPist.post(API_PATH.CREATE_USER_NAME, {
        headers: {
          Authorization: token || (userRegisterInfo.token as string),
        },
        params: value,
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
