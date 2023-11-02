// theme
export const PRIVATE_FOLLOW_THEME = '/private/theme/subscribe';
export const PRIVATE_UNFOLLOW_THEME = '/private/theme/unsubscribe';
export const PRIVATE_LIST_THEME_SUBSCRIBED = '/private/subscribed/themes';
export const PRIVATE_ALL_THEME = '/private/themes';
export const PUBLIC_ALL_THEME = '/public/theme/all';
export const PRIVATE_GET_THEME_DETAIL = (code: string) => `/private/theme/${code}/details`;
export const PUBLIC_GET_THEME_DETAIL = (code: string) => `/public/theme/${code}/detail`;
export const PUBLIC_GET_THEME_DETAIL_V2 = (code: string) => `/public/theme/${code}-v2`;
export const PUBLIC_GET_SUBSCRIBED_CUSTOMERS_THEME = (code: string) =>
  `/public/theme/${code}/subscribed-customers`;
export const PRIVATE_GET_COMMUNITY_THEME_DETAIL = (code: string) =>
  `/private/theme/${code}/subscribed-customers`;

export const PRIVATE_GET_ALL_CUSTOMER_SUBSCRIBE_THEME = (code: string) =>
  `/private/theme/${code}/subscribed-customers-full`;
export const PRIVATE_GET_LIST_ACTIVITIES_THEME = '/private/activity/list-theme-activities';
export const PUBLIC_GET_LIST_ACTIVITIES = (code: string) => `/public/theme/${code}/activities`;
export const PRIVATE_SEARCH_CUSTOMER_RECENT = '/private/search/customer/recent';
export const PRIVATE_THEMES = '/private/themes';
export const PRIVATE_THEME_SUBSCRIBE = (themes: string) =>
  `/private/theme/subscribe?themeCodes=${themes}`;
export const PRIVATE_SHARE_THEME_ACTIVITY = '/private/activity/theme/addV2';
