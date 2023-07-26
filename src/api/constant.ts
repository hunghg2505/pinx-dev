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
  PRIVATE_DETAIL_OF_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/details`,
  PRIVATE_EDIT_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/edit`,
  PRIVATE_LIKE_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/like`,
  PRIVATE_UNLIKE_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/unlike`,
  PRIVATE_REPLY_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/reply`,
  PRIVATE_REPORT_COMMENT: (comment_Id: string) => `/private/comment/${comment_Id}/report`,
  PRIVATE_DELETE_COMMENT: (id: string) => `/private/comment/${id}`,
  PRIVATE_ADD_COMMENT: '/private/comment/add',

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
  PUBLIC_STOCK_DETAIL_EXTRA: (stockCode: string) => `/public/stock/${stockCode}/details-extra`,
  PRIVATE_STOCK_DETAIL_EXTRA: (stockCode: string) => `/private/stock/${stockCode}/details-extra`,
  PUBLIC_STOCK_REVIEWS: (stockCode: string) => `/public/stock/${stockCode}/reviews`,
  PUBLIC_STOCK_NEWS: (stockCode: string) => `/public/stock/${stockCode}/news`,
  PRIVATE_STOCK_NEWS: (stockCode: string) => `/private/stock/${stockCode}/news`,
  PUBLIC_STOCK_ACTIVITIES: (stockCode: string) => `/public/stock/${stockCode}/activities`,
  PRIVATE_STOCK_ACTIVITIES: (stockCode: string) => `/private/stock/${stockCode}/activities`,
  PRIVATE_STOCK_REVIEW: (stockCode: string) => `/private/stock/${stockCode}/review`,
  PUBLIC_STOCK_WATCHING_INVESTING: (stockCode: string) =>
    `/public/stock/${stockCode}/watching-investing-customers`,
  PUBLIC_STOCK_WATCHING: (stockCode: string) => `/public/stock/${stockCode}/watching-customers`,
  PUBLIC_STOCK_INVESTING: (stockCode: string) => `/public/stock/${stockCode}/investing-customers`,
  PUBLIC_HASHTAG_INDUSTRY: '/public/hashtag/industry',
  PUBLIC_HASHTAG_HIGHLIGHT: '/public/hashtag/highlights',
  PRIVATE_ACTIVITY_WATCH_LIST_ADD: '/private/activity/watchlist/add',

  PRIVATE_TOP_WATCHING_STOCK: '/private/watchlist/top-watching',
  PRIVATE_TOP_MENTION_STOCK: '/private/stock/top-mention',
  PRIVATE_WATCH_LIST_STOCK: '/private/watchlist/stock/all',
  PRIVATE_WATCH_LIST_REMOVE_STOCK: (stockCode: string) =>
    `/private/watchlist/stock/${stockCode}/remove`,
  PUBLIC_TOP_WATCHING: '/public/watchlist/top-watching',
  PUBLIC_TOP_MENTION: '/public/stock/top-mention',
  PRIVATE_REMOVE_STOCK: (code: string) => `/private/watchlist/stock/${code}/remove`,
  PRIVATE_SUGGESTED_STOCK: '/private/customer/watchlist/suggested/stockcodes',
  PUBLIC_TOP_CONFIG: '/public/stock/top-config',
  // theme
  PRIVATE_THEMES: '/private/themes',
  PRIVATE_THEME_SUBSCRIBE: (themes: string) => `/private/theme/subscribe?themeCodes=${themes}`,
  PRIVATE_SHARE_THEME_ACTIVITY: '/private/activity/theme/add',
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
  PUBLIC_SEARCH_POST: '/public/mapping/post/search',
  PUBLIC_SEARCH_NEWS: '/public/mapping/news/search',
  PRIVATE_HASHTAG_SUGGEST: '/private/post/hashtag/suggest',
  // ipo
  PUBLIC_GET_ALL_STOCK_IPO: '/public/company/ipo-listed',

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
};
