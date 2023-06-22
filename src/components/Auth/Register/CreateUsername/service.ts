import { useRequest } from 'ahooks';

import { API_PATH, requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodySubmitOtp {
  username: string;
}

const serviceCreateUsername = async (value: IBodySubmitOtp) => {
  return privateRequest(requestPist.post, API_PATH.CREATE_USER_NAME, {
    params: value,
  });
};

export const useCreateUsername = (options: IOptionsRequest) => {
  const requestCreateUsername = useRequest(serviceCreateUsername, {
    manual: true,
    ...options,
  });

  return requestCreateUsername;
};
