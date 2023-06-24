/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH, requestPist } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

export const useForgotPassword = (options?: IOptionsRequest) => {
  return useRequest(
    // eslint-disable-next-line require-await
    async ({
      username,
      customerName,
      email,
      phoneNumber,
      birthday,
    }: {
      username: string;
      customerName?: string;
      email?: string;
      phoneNumber: string;
      birthday?: string;
    }) => {
      return requestPist.post(API_PATH.RESET_PASSWORD, {
        data: {
          birthday,
          custNm: customerName,
          email,
          loginId: username,
          mobile: phoneNumber,
          type: '1',
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );
};
