export const API_PATH = {
  // Auth
  AUTH_LOGIN: '',

  // Home
  FILTER_LIST: '/public/mapping/filter/list',
  NEWFEED_LIST: '/public/mapping/filter',
  KOL: '/public/customer/kols',
  SUGGESTION_PEOPLE: '/private/customer/suggested-friends',
  PRIVATE_NEWFEED_LIST: '/private/mapping/filter',
  PUBLIC_GET_TRENDING: '/public/search/keyword/trending',
  // post
  PRIVATE_MAPPING_POST_DETAIL: (post_id: string) => `/private/mapping/${post_id}/details`,
  PRIVATE_MAPPING_POST_COMMENTS: (post_id: string) => `/private/mapping/${post_id}/comments`,
  PRIVATE_MAPPING_LIKE_POST: (post_id: string) => `/private/mapping/${post_id}/like`,
  PRIVATE_MAPPING_UNLIKE_POST: (post_id: string) => `/private/mapping/${post_id}/unlike`,
  PRIVATE_MAPPING_REPORT_POST: (post_id: string) => `/private/mapping/${post_id}/report`,
  PRIVATE_HIDE_POST: '/private/mapping/hide',

  PUCLIC_MAPPING_POST_DETAIL: (post_id: string) => `/public/mapping/${post_id}/detail`,
  PUBLIC_MAPPING_POST_COMMENTS: (post_id: string) => `/public/mapping/${post_id}/comments`,

  // comment
  PRIVATE_COMMENT_OF_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/comments`,
  PRIVATE_DETAIL_OF_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/details`,
  PRIVATE_EDIT_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/edit`,
  PRIVATE_LIKE_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/like`,
  PRIVATE_UNLIKE_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/unlike`,
  PRIVATE_REPLY_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/reply`,
  PRIVATE_REPORT_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/report`,
  PRIVATE_ADD_COMMENT: '/private/comment/add',

  // user
  PRIVATE_FOLLOW_USER: '/private/customer/follow',
  PRIVATE_UNFOLLOW_USER: '/private/customer/unfollow',

  // theme
  PRIVATE_FOLLOW_THEME: '/private/theme/subscribe',
  PRIVATE_UNFOLLOW_THEME: '/private/theme/unsubscribe',
  PRIVATE_LIST_THEME_SUBSCRIBED: '/private/subscribed/themes',
  PRIVATE_ALL_THEME: '/private/themes',
  PUBLIC_ALL_THEME: '/public/theme/all',
};
