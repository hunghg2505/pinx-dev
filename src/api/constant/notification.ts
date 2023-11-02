// notifications
export const GET_NOTIFICATION_TOKEN = '/private/notification/save-token';
export const GET_NOTIFICATION_LIST = '/private/notification/community/history';
export const GET_NOTIFICATION_COUNT = '/private/notification/community/history/countV2';
export const READ_NOTIFICATION = (id: string) => `/private/notification/community/history/${id}`;
export const READ_PINETREE_NOTIFICATION = (id: string) =>
  `/private/notification/history/pinetree/${id}`;
export const READ_ALL_NOTIFICATION = '/private/notification/community/history/receiver';
export const DELETE_ALL_NOTIFICATIONS = '/private/notification/history/receiver';
