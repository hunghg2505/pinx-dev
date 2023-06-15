import { useRequest } from 'ahooks';

import { API_PATH, request } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

export const useLogin = (options?: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async ({ email, password }: { email?: string; password?: string }) => {
      return request.post(API_PATH.LOGIN, {
        data: {
          email,
          password,
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
