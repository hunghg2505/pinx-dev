// post
export const PRIVATE_MAPPING_POST_DETAIL = (post_id: string) =>
  `/private/mapping/${post_id}/details`;
export const PRIVATE_MAPPING_POST_COMMENTS = (post_id: string) =>
  `/private/mapping/${post_id}/comments`;
export const PRIVATE_MAPPING_LIKE_POST = (post_id: string) => `/private/mapping/${post_id}/like`;
export const PRIVATE_MAPPING_UNLIKE_POST = (post_id: string) =>
  `/private/mapping/${post_id}/unlike`;
export const PRIVATE_MAPPING_REPORT_POST = (post_id: string) =>
  `/private/mapping/${post_id}/report`;
export const PRIVATE_WATCHLIST = (id: number) => `/private/watchlist/list/${id}`;
export const PRIVATE_WATCHLIST_STOCK = '/private/watchlist/list';
export const PRIVATE_HIDE_POST = '/private/mapping/hide';
export const PUCLIC_MAPPING_POST_DETAIL = (post_id: string) => `/public/mapping/${post_id}/detail`;
export const PUBLIC_MAPPING_SITE_MAP = '/public/mapping/site-map';
export const PUBLIC_MAPPING_POST_COMMENTS = (post_id: string) =>
  `/public/mapping/${post_id}/comments`;
export const PRIVATE_ADD_POST = '/private/post/add';
export const PRIVATE_PINNED_POST = '/private/mapping/pinned-posts';
export const PUBLIC_PINNED_POST = '/public/mapping/pinned-posts';
export const PRIVATE_DELETE_POST = (id: string) => `/private/mapping/${id}`;
export const PRIVATE_UPDATE_POST = (id: string) => `/private/mapping/${id}/update`;
