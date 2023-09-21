export const API_PATH = {
  // Auth
  LOGIN: '/public/customer/loginSSO',
  REGISTER: '/public/customer/register/credentials',
  REGISTER_OTP: '/public/customer/register/otp/verify',
  SUBMIT_LOGIN_OTP: '/private/get-token',
  RESEND_REGISTER_OTP: '/public/customer/register/otp/resend',
  CREATE_USER_NAME: '/public/customer/register/login-id',
  GET_USER_CONTRACT: '/private/user-info/contract',
  CONFIRM_CONTRACT: '/private/user-info/confirm',
  READ_CONTRACT: '/public/contract/read',
  SEND_LOGIN_OTP: '/private/generate-auth',
  USER_PROFILE: '/private/customer/profile',
  RESET_PASSWORD: '/public/reset-password',

  // Home
  FILTER_LIST: '/public/mapping/filter/list',
  NEWFEED_LIST: '/public/mapping/filter',
  KOL: '/public/customer/kols',
  SUGGESTION_PEOPLE: '/private/customer/suggested-friends',
  PRIVATE_NEWFEED_LIST: '/private/mapping/filter',
  PUBLIC_GET_TRENDING: '/public/search/keyword/trending',
  PRIVATE_SEARCH: '/private/search',
  PUBLIC_THEME: '/public/post-themes',
  PUBLIC_SEARCH: '/public/search',
  // post
  PRIVATE_MAPPING_POST_DETAIL: (post_id: string) => `/private/mapping/${post_id}/details`,
  PRIVATE_MAPPING_POST_COMMENTS: (post_id: string) => `/private/mapping/${post_id}/comments`,
  PRIVATE_MAPPING_LIKE_POST: (post_id: string) => `/private/mapping/${post_id}/like`,
  PRIVATE_MAPPING_UNLIKE_POST: (post_id: string) => `/private/mapping/${post_id}/unlike`,
  PRIVATE_MAPPING_REPORT_POST: (post_id: string) => `/private/mapping/${post_id}/report`,
  PRIVATE_WATCHLIST: (id: number) => `/private/watchlist/list/${id}`,
  PRIVATE_WATCHLIST_STOCK: '/private/watchlist/list',
  PRIVATE_HIDE_POST: '/private/mapping/hide',
  PUCLIC_MAPPING_POST_DETAIL: (post_id: string) => `/public/mapping/${post_id}/detail`,
  PUBLIC_MAPPING_POST_COMMENTS: (post_id: string) => `/public/mapping/${post_id}/comments`,
  PRIVATE_ADD_POST: '/private/post/add',
  PRIVATE_PINNED_POST: '/private/mapping/pinned-posts',
  PUBLIC_PINNED_POST: '/public/mapping/pinned-posts',
  PRIVATE_DELETE_POST: (id: string) => `/private/mapping/${id}`,
  PRIVATE_UPDATE_POST: (id: string) => `/private/mapping/${id}/update`,
  // comment
  PRIVATE_COMMENT_OF_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/comments`,
  PUBLIC_COMMENT_OF_COMMENT: (comment_Id: string) => `/public/comment/${comment_Id}/children`,
  PRIVATE_DETAIL_OF_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/details`,
  PRIVATE_EDIT_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/edit`,
  PRIVATE_LIKE_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/like`,
  PRIVATE_UNLIKE_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/unlike`,
  PRIVATE_REPLY_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/reply`,
  PRIVATE_REPORT_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/report`,
  PRIVATE_DELETE_COMMENT: (id: string) => `/private/comment/${id}`,
  PRIVATE_ADD_COMMENT: '/private/comment/add',
  PRIVATE_ADD_COMMENT_V2: '/private/comment/addV2',
  PRIVATE_REPLY_COMMENT_V2: (comment_Id: string) => `/private/comment/${comment_Id}/replyV2`,
  // user
  PRIVATE_FOLLOW_USER: '/private/customer/follow',
  PRIVATE_UNFOLLOW_USER: '/private/customer/unfollow',
  PRIVATE_LIST_KOLS: '/private/customer/kols',
  PRIVATE_GET_OTHER_USER_PROFILE: (id: number) => `/private/customer/${id}/profile`,
  PUBLIC_GET_OTHER_USER_PROFILE: (id: number) => `/public/customer/${id}/profile`,

  // theme
  PRIVATE_FOLLOW_THEME: '/private/theme/subscribe',
  PRIVATE_UNFOLLOW_THEME: '/private/theme/unsubscribe',
  PRIVATE_LIST_THEME_SUBSCRIBED: '/private/subscribed/themes',
  PRIVATE_ALL_THEME: '/private/themes',
  PUBLIC_ALL_THEME: '/public/theme/all',
  PRIVATE_GET_THEME_DETAIL: (code: string) => `/private/theme/${code}/details`,
  PUBLIC_GET_THEME_DETAIL: (code: string) => `/public/theme/${code}/detail`,
  PUBLIC_GET_THEME_DETAIL_V2: (code: string) => `/public/theme/${code}-v2`,
  PUBLIC_GET_SUBSCRIBED_CUSTOMERS_THEME: (code: string) =>
    `/public/theme/${code}/subscribed-customers`,
  PRIVATE_GET_COMMUNITY_THEME_DETAIL: (code: string) =>
    `/private/theme/${code}/subscribed-customers`,

  PRIVATE_GET_ALL_CUSTOMER_SUBSCRIBE_THEME: (code: string) =>
    `/private/theme/${code}/subscribed-customers-full`,
  PRIVATE_GET_LIST_ACTIVITIES_THEME: '/private/activity/list-theme-activities',
  PUBLIC_GET_LIST_ACTIVITIES: (code: string) => `/public/theme/${code}/activities`,
  PRIVATE_SEARCH_CUSTOMER_RECENT: '/private/search/customer/recent',

  // stock
  PUBLIC_SUGGEST_STOCK_CODE: '/public/suggested/stockcodes',
  PUBLIC_COMPANY_GET_BY_STOCK_BRIEF: (stockCodes: string) =>
    `/public/company/get-by-stocks-brief?stockCodes=${stockCodes}`,
  PRIVATE_WATCH_LIST_CREATE: '/private/watchlist/create',
  PUBLIC_COMPANY_DETAIL: (stockCode: string) => `/public/company/${stockCode}/detail`,
  PUBLIC_COMPANY_FINANCIAL_INDEX: '/public/company/financial-index',
  PUBLIC_COMPANY_SHAREHOLDER: '/public/company/shareholder',
  PRIVATE_WATCH_LIST_STOCK_REMOVE: (stockCode: string) =>
    `/private/watchlist/stock/${stockCode}/remove`,
  PUBLIC_COMPANY_TAGGING_INFO: (stockCode: string) => `/public/company/tagging-info/${stockCode}`,
  PUBLIC_FINANCIAL_INDEX: '/public/company/financial-index',
  PUBLIC_COMPANY_OWNERSHIP: '/public/company/ownership',
  PRIVATE_STOCK_EVENTS: (stockCode: string) => `/private/stock/${stockCode}/events`,
  PUBLIC_STOCK_EVENTS: (stockCode: string) => `/public/stock/${stockCode}/events`,
  PRIVATE_THEME_OF_STOCK: (stockCode: string) => `/private/theme/stock-code/${stockCode}`,
  PUBLIC_THEME_OF_STOCK: (stockCode: string) => `/public/theme/stock-code/${stockCode}`,
  PUBLIC_STOCK_DETAIL_EXTRA: (stockCode: string) => `/public/stock/${stockCode}/details-extra`,
  PUBLIC_STOCK_DETAIL_EXTRA_V2: (stockCode: string) => `/public/stock/${stockCode}/details-extraV2`,
  PRIVATE_STOCK_DETAIL_EXTRA: (stockCode: string) => `/private/stock/${stockCode}/details-extra`,
  PRIVATE_STOCK_DETAIL_EXTRA_V2: (stockCode: string) =>
    `/private/stock/${stockCode}/details-extraV2`,
  PUBLIC_STOCK_REVIEWS: (stockCode: string) => `/public/stock/${stockCode}/reviews`,
  PUBLIC_STOCK_NEWS: (stockCode: string) => `/public/stock/${stockCode}/news`,
  PRIVATE_STOCK_NEWS: (stockCode: string) => `/private/stock/${stockCode}/news`,
  PUBLIC_STOCK_ACTIVITIES: (stockCode: string) => `/public/stock/${stockCode}/activities`,
  PRIVATE_STOCK_ACTIVITIES: (stockCode: string) => `/private/stock/${stockCode}/activities`,
  PRIVATE_STOCK_REVIEW: (stockCode: string) => `/private/stock/${stockCode}/review`,
  PRIVATE_STOCK_REVIEW_V2: (stockCode: string) => `/private/stock/${stockCode}/reviewV2`,
  PUBLIC_STOCK_WATCHING_INVESTING: (stockCode: string) =>
    `/public/stock/${stockCode}/watching-investing-customers`,
  PUBLIC_STOCK_WATCHING: (stockCode: string) => `/public/stock/${stockCode}/watching-customers`,
  PUBLIC_STOCK_INVESTING: (stockCode: string) => `/public/stock/${stockCode}/investing-customers`,
  PUBLIC_HASHTAG_INDUSTRY: '/public/hashtag/industry',
  PUBLIC_HASHTAG_HIGHLIGHT: '/public/hashtag/highlights',
  PRIVATE_ACTIVITY_WATCH_LIST_ADD: '/private/activity/watchlist/addV2',
  PRIVATE_ACTIVITY_WATCH_LIST_ADD_V2: '/private/activity/watchlist/addV2',
  PUBLIC_STOCK_DATA: (stockCode: string) => `/public/stock/${stockCode}/data`,
  PUBLIC_FINANCE_INFO: '/public/finance-info',
  PUBLIC_STOCK_TRADE: (stockCode: string) => `/public/stock/${stockCode}/trade`,
  PUBLIC_STOCK_INTRADAY: (stockCode: string) => `/public/stock/${stockCode}/step-price`,

  PRIVATE_TOP_WATCHING_STOCK: '/private/watchlist/top-watching',
  PRIVATE_TOP_MENTION_STOCK: '/private/stock/top-mention',
  PRIVATE_WATCH_LIST_STOCK: '/private/watchlist/stock/all',
  PRIVATE_WATCH_LIST_REMOVE_STOCK: (stockCode: string) =>
    `/private/watchlist/stock/${stockCode}/remove`,
  PUBLIC_TOP_WATCHING: '/public/watchlist/top-watching',
  PUBLIC_TOP_MENTION: '/public/stock/top-mention',
  PRIVATE_REMOVE_STOCK: (code: string) => `/private/watchlist/stock/${code}/remove`,
  PRIVATE_SORT_STOCK: (code: string) => `/private/watchlist/${code}/sort`,
  PRIVATE_SUGGESTED_STOCK: '/private/customer/watchlist/suggested/stockcodes',
  PUBLIC_TOP_CONFIG: '/public/stock/top-config',
  // theme
  PRIVATE_THEMES: '/private/themes',
  PRIVATE_THEME_SUBSCRIBE: (themes: string) => `/private/theme/subscribe?themeCodes=${themes}`,
  PRIVATE_SHARE_THEME_ACTIVITY: '/private/activity/theme/addV2',
  // topic
  PRIVATE_TOPIC_ALL: (limit?: number) =>
    limit ? `/private/topic/all?limit=${limit}` : '/private/topic/all',
  PRIVATE_TOPIC_SELECTED: '/private/topic/selected',
  // PRIVATE_
  // search
  PRIVATE_SEARCH_KEYWORDS_TOP: '/private/search/keywords/top',
  PUBLIC_SEARCH_KEYWORDS_TOP: '/public/search/keyword/trending',
  PUBLIC_SEARCH_COMPANY: '/public/company/search',

  PUBLIC_SEARCH_PEOPLE: '/public/customer/search',
  PRIVATE_SEARCH_PEOPLE: '/private/search/customers',

  PUBLIC_SEARCH_POST: '/public/mapping/post/search',
  PRIVATE_SEARCH_POST: '/private/mapping/searching/posts',

  PUBLIC_SEARCH_NEWS: '/public/mapping/news/search',

  // SEARCH_SEO
  PUBLIC_SEARCH_SEO_CREATE: '/public/search-seo/create-v2',
  PRIVATE_SEARCH_SEO_CREATE: '/private/search-seo/create-v2',

  PUBLIC_SEARCH_SEO_RESULT: '/public/search-seo/search-v2',
  PRIVATE_SEARCH_SEO_RESULT: '/private/search-seo/search-v2',

  PUBLIC_SEARCH_SEO_SUGGEST: '/public/search-seo/suggest-v2',
  PRIVATE_SEARCH_SEO_SUGGEST: '/private/search-seo/suggest-v2',
  PUBLIC_SEARCH_SEO_DELETE: (code: string) => `/public/search-seo/${code}/delete-v2`,

  PRIVATE_SEARCH_SEO_COMPANY_V2: '/private/search-seo/companyV2',
  PUBLIC_SEARCH_SEO_COMPANY_V2: '/public/search-seo/companyV2',
  PRIVATE_SEARCH_SEO_PEOPLE_V2: '/private/search-seo/customerV2',
  PUBLIC_SEARCH_SEO_PEOPLE_V2: '/public/search-seo/customerV2',

  PUBLIC_SEARCH_SEO_MEDIA_V2: '/public/search-seo/imageSeo-mediaV2',
  PRIVATE_SEARCH_SEO_MEDIA_V2: '/private/search-seo/imageSeo-mediaV2',
  // End SEARCH_SEO

  PRIVATE_SEARCH_NEWS: '/private/mapping/searching/news',
  PRIVATE_HASHTAG_SUGGEST: '/private/post/hashtag/suggest',
  // ipo
  PUBLIC_GET_ALL_STOCK_IPO: '/public/stock/ipo/all',

  // martket
  PUBLIC_TOP_PROFIT: '/public/company/profit',
  PUBLIC_TOP_REVENUE: '/public/company/revenue',
  PUBLIC_TOP_MARKET_CAPITALIZATION: '/public/company/market-capital',
  PUBLIC_TOP_PRICE: '/public/company/price',
  PUBLIC_TOP_CHANGE_PRICE: '/public/company/change-price',

  // SETTING
  GET_CUSTOMER_SETTING: '/private/customer/setting',
  GET_CUSTOMER_ALL_SETTINGS: '/private/customer/settings',
  CHANGE_PASSWORD: '/private/customer/change-password',
  CHANGE_USERNAME: '/private/customer/change-username',

  // PROFILE
  GET_USER_POST: '/private/mapping/other-customer-mappings',
  PUBLIC_GET_USER_POST: '/public/other-customer-mappings',
  GET_MY_POST: '/private/mapping/customer-mappings',
  GET_USER_WATCHLIST: '/private/watchlist/list/',
  UPDATE_USER_PROFILE: '/private/customer/update',
  DEACTIVATE_ACCOUNT: '/private/customer/deactivate',
  GET_CUSTOMER_FOLLOWER: '/private/customer/follower/other',
  GET_CUSTOMER_FOLLOWING: '/private/customer/following/other',
  PUBLIC_GET_CUSTOMER_FOLLOWER: '/public/customer/follower/other',
  PUBLIC_GET_CUSTOMER_FOLLOWING: '/public/customer/following/other',
  GET_MY_CUSTOMER_FOLLOWER: '/private/customer/follower/friends',
  GET_MY_CUSTOMER_FOLLOWING: '/private/customer/following/friends',

  // api v2
  PRIVATE_HASHTAG_V2_COMMUNITY: '/private/post/hashtag/suggestV2',
  PRIVATE_ADD_POST_V2_COMMUNITY: '/private/post/add-v2',
  PRIVATE_ACTIVITY_WATCHLIST_V2: '/private/activity/watchlist/addV2',
  PRIVATE_ACTIVITY_THEME_V2: '/private/activity/theme/addV2',
  PRIVATE_UPDATE_POST_V2: (id: string) => `/private/mapping/${id}/updateV2`,
  PUBLIC_SEO_PAGE_V2: (textSearch: string) => `/public/seo/pageV2/?textSearch=${textSearch}`,

  // notifications
  GET_NOTIFICATION_TOKEN: '/private/notification/save-token',
  GET_NOTIFICATION_LIST: '/private/notification/community/history',
  GET_NOTIFICATION_COUNT: '/private/notification/community/history/count',
  READ_NOTIFICATION: (id: string) => `/private/notification/community/history/${id}`,
};
