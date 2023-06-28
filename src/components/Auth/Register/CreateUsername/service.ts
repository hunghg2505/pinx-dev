import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist } from '@api/request';
import { getRegisterToken } from '@store/auth';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySubmitUsername {
  username: string;
}

const token = getRegisterToken() as string;

export const useCreateUsername = (options: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async (value: IBodySubmitUsername) => {
      return requestPist.post(API_PATH.CREATE_USER_NAME, {
        headers: {
          Authorization: token,
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
