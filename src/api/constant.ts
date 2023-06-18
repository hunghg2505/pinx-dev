export const API_PATH = {
  // Auth
  AUTH_LOGIN: '/auth/login',

  // Home
  FILTER_LIST: 'public/mapping/filter/list',
  NEWFEED_LIST: 'public/mapping/filter',
  KOL: 'public/customer/kols',
  PRIVATE_MAPPING_POST_DETAIL: (post_id: string) => `/private/mapping/${post_id}/details`,
  PRIVATE_MAPPING_POST_COMMENTS: (post_id: string) => `/private/mapping/${post_id}/comments`,
  PRIVATE_MAPPING_LIKE_POST: (post_id: string) => `/private/mapping/${post_id}/like`,
  PRIVATE_MAPPING_UNLIKE_POST: (post_id: string) => `/private/mapping/${post_id}/unlike`,
};
