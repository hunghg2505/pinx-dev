// api v2
export const PRIVATE_HASHTAG_V2_COMMUNITY = '/private/post/hashtag/suggestV2';
export const PRIVATE_ADD_POST_V2_COMMUNITY = '/private/post/add-v2';
export const PRIVATE_ACTIVITY_WATCHLIST_V2 = '/private/activity/watchlist/addV2';
export const PRIVATE_ACTIVITY_THEME_V2 = '/private/activity/theme/addV2';
export const PRIVATE_UPDATE_POST_V2 = (id: string) => `/private/mapping/${id}/updateV2`;
export const PUBLIC_SEO_PAGE_V2 = (textSearch: string) =>
  `/public/seo/pageV2/?textSearch=${textSearch}`;
