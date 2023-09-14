import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestNoti, privateRequest } from '@api/request';
import { getAccessToken } from '@store/auth';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

const serviceGetNotificationToken = async () => {
  return privateRequest(requestNoti.post, API_PATH.GET_NOTIFICATION_TOKEN, {
    data: {
      deviceInfo: 'WEB',
      deviceToken: getAccessToken(),
    },
  });
};

export const useGetNotificationToken = (options: IOptionsRequest) => {
  const requestGetNotificationToken = useRequest(serviceGetNotificationToken, {
    ...options,
  });

  return requestGetNotificationToken;
};
