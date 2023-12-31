import { useRequest } from 'ahooks';

import {
  GET_NOTIFICATION_TOKEN,
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_COUNT,
  READ_PINETREE_NOTIFICATION,
  READ_ALL_NOTIFICATION,
  READ_NOTIFICATION,
  DELETE_ALL_NOTIFICATIONS,
} from '@api/constant';
import { requestNoti, privateRequest } from '@api/request';
import { getLocaleCookie } from '@store/locale';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

interface IBodyeGetNotificationToken {
  deviceToken: string | undefined;
}

const serviceGetNotificationToken = async (value: IBodyeGetNotificationToken) => {
  return privateRequest(requestNoti.post, GET_NOTIFICATION_TOKEN, {
    data: {
      deviceInfo: 'WEB',
      deviceToken: value?.deviceToken,
    },
  });
};

export const useGetNotificationToken = (options: IOptionsRequest) => {
  const requestGetNotificationToken = useRequest(serviceGetNotificationToken, {
    manual: true,
    ...options,
  });

  return requestGetNotificationToken;
};

const serviceGetNotificationList = async () => {
  return privateRequest(requestNoti.post, GET_NOTIFICATION_LIST, {
    data: {
      type: 'NEW',
    },
    params: {
      page: 1,
      pageSize: 999,
      language: getLocaleCookie(),
    },
  });
};

export const useGetNotificationList = (options: IOptionsRequest) => {
  const requestGetNotificationList = useRequest(serviceGetNotificationList, {
    ...options,
    cacheKey: 'notiList',
  });

  return requestGetNotificationList;
};

const serviceGetPinetreeNotificationList = async () => {
  return privateRequest(requestNoti.post, GET_NOTIFICATION_LIST, {
    data: {
      type: 'NEW',
      notificationType: 'PINETREE_MKT',
    },
    params: {
      page: 1,
      pageSize: 999,
      language: getLocaleCookie(),
    },
  });
};

export const useGetPinetreeNotificationList = (options: IOptionsRequest) => {
  const requestGetPinetreeNotificationList = useRequest(serviceGetPinetreeNotificationList, {
    ...options,
    cacheKey: 'pinetreeNotiList',
  });

  return requestGetPinetreeNotificationList;
};

const serviceGetNotificationCount = async () => {
  return privateRequest(requestNoti.get, GET_NOTIFICATION_COUNT);
};

export const useGetNotificationCount = (options: IOptionsRequest) => {
  const { data, refresh } = useRequest(serviceGetNotificationCount, {
    cacheKey: 'notiCount',
    ...options,
  });

  return {
    notiCount: data?.data,
    refreshNotiCount: refresh,
  };
};

const serviceReadNotification = async (notiId: string) => {
  return privateRequest(requestNoti.put, READ_NOTIFICATION(notiId), {
    params: {
      readStatus: true,
    },
  });
};

export const useReadNotification = (options: IOptionsRequest) => {
  const requestReadNotification = useRequest(serviceReadNotification, {
    manual: true,
    ...options,
  });

  return requestReadNotification;
};

const serviceReadPinetreeNotification = async (notiId: string) => {
  return privateRequest(requestNoti.put, READ_PINETREE_NOTIFICATION(notiId), {
    params: {
      readStatus: true,
    },
  });
};

export const useReadPinetreeNotification = (options: IOptionsRequest) => {
  const requestReadPinetreeNotification = useRequest(serviceReadPinetreeNotification, {
    manual: true,
    ...options,
  });

  return requestReadPinetreeNotification;
};

const serviceReadAllNotification = async () => {
  return privateRequest(requestNoti.put, READ_ALL_NOTIFICATION, {
    params: {
      readStatus: true,
    },
  });
};

export const useReadAllNotification = (options: IOptionsRequest) => {
  const requestReadAllNotification = useRequest(serviceReadAllNotification, {
    manual: true,
    ...options,
  });

  return requestReadAllNotification;
};

const serviceDeleteNotification = async (notiId: string) => {
  return privateRequest(requestNoti.delete, READ_NOTIFICATION(notiId));
};

export const useDeleteNotification = (options: IOptionsRequest) => {
  const requestDeleteNotification = useRequest(serviceDeleteNotification, {
    manual: true,
    ...options,
  });

  return requestDeleteNotification;
};

const serviceDeleteAllNotification = async () => {
  return privateRequest(requestNoti.delete, DELETE_ALL_NOTIFICATIONS);
};

export const useDeleteAllNotification = (options: IOptionsRequest) => {
  const requestDeleteAllNotification = useRequest(serviceDeleteAllNotification, {
    manual: true,
    ...options,
  });

  return requestDeleteAllNotification;
};
