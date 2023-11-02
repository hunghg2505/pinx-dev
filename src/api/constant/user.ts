// user
export const PRIVATE_FOLLOW_USER = '/private/customer/follow';
export const PRIVATE_UNFOLLOW_USER = '/private/customer/unfollow';
export const PRIVATE_LIST_KOLS = '/private/customer/kols';
export const PRIVATE_GET_OTHER_USER_PROFILE = (id: number) => `/private/customer/${id}/profile`;
export const PUBLIC_GET_OTHER_USER_PROFILE = (id: number) => `/public/customer/${id}/profile`;
