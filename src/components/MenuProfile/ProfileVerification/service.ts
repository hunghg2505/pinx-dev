/* eslint-disable require-await */
import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestPist, privateRequest } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodyUpdateUserProfile {
  address?: string;
  avatar?: string;
  bio?: string;
  coverImage?: string;
  displayName?: string;
  email?: string;
  fullName?: string;
  position?: string;
}

const servviceUpdateUserProfile = async (values: IBodyUpdateUserProfile) => {
  return privateRequest(requestPist.put, API_PATH.UPDATE_USER_PROFILE, {
    data: values,
  });
};

export const useUpdateUserProfile = (options?: IOptionsRequest) => {
  const requestUpdateUserProfile = useRequest(servviceUpdateUserProfile, {
    manual: true,
    ...options,
  });

  return requestUpdateUserProfile;
};
