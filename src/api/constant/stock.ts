// stock
export const PUBLIC_SUGGEST_STOCK_CODE = '/public/suggested/stockcodes';
export const PUBLIC_COMPANY_GET_BY_STOCK_BRIEF = (stockCodes: string) =>
  `/public/company/get-by-stocks-brief?stockCodes=${stockCodes}`;
export const PRIVATE_WATCH_LIST_CREATE = '/private/watchlist/create';
export const PUBLIC_COMPANY_DETAIL = (stockCode: string) => `/public/company/${stockCode}/detail`;
export const PUBLIC_COMPANY_FINANCIAL_INDEX = '/public/company/financial-index';
export const PUBLIC_COMPANY_SHAREHOLDER = '/public/company/shareholder';
export const PRIVATE_WATCH_LIST_STOCK_REMOVE = (stockCode: string) =>
  `/private/watchlist/stock/${stockCode}/remove`;
export const PUBLIC_COMPANY_TAGGING_INFO = (stockCode: string) =>
  `/public/company/tagging-info/${stockCode}`;
export const PUBLIC_FINANCIAL_INDEX = '/public/company/financial-index';
export const PUBLIC_COMPANY_OWNERSHIP = '/public/company/ownership';
export const PRIVATE_STOCK_EVENTS = (stockCode: string) => `/private/stock/${stockCode}/events`;
export const PUBLIC_STOCK_EVENTS = (stockCode: string) => `/public/stock/${stockCode}/events`;
export const PRIVATE_THEME_OF_STOCK = (stockCode: string) =>
  `/private/theme/stock-code/${stockCode}`;
export const PUBLIC_THEME_OF_STOCK = (stockCode: string) => `/public/theme/stock-code/${stockCode}`;
export const PUBLIC_STOCK_DETAIL_EXTRA = (stockCode: string) =>
  `/public/stock/${stockCode}/details-extra`;
export const PUBLIC_STOCK_DETAIL_EXTRA_V2 = (stockCode: string) =>
  `/public/stock/${stockCode}/details-extraV2`;
export const PRIVATE_STOCK_DETAIL_EXTRA = (stockCode: string) =>
  `/private/stock/${stockCode}/details-extra`;
export const PRIVATE_STOCK_DETAIL_EXTRA_V2 = (stockCode: string) =>
  `/private/stock/${stockCode}/details-extraV2`;
export const PUBLIC_STOCK_REVIEWS = (stockCode: string) => `/public/stock/${stockCode}/reviews`;
export const PUBLIC_STOCK_NEWS = (stockCode: string) => `/public/stock/${stockCode}/news`;
export const PRIVATE_STOCK_NEWS = (stockCode: string) => `/private/stock/${stockCode}/news`;
export const PUBLIC_STOCK_ACTIVITIES = (stockCode: string) =>
  `/public/stock/${stockCode}/activities`;
export const PRIVATE_STOCK_ACTIVITIES = (stockCode: string) =>
  `/private/stock/${stockCode}/activities`;
export const PRIVATE_STOCK_REVIEW = (stockCode: string) => `/private/stock/${stockCode}/review`;
export const PRIVATE_STOCK_REVIEW_V2 = (stockCode: string) =>
  `/private/stock/${stockCode}/reviewV2`;
export const PUBLIC_STOCK_WATCHING_INVESTING = (stockCode: string) =>
  `/public/stock/${stockCode}/watching-investing-customers`;
export const PUBLIC_STOCK_WATCHING = (stockCode: string) =>
  `/public/stock/${stockCode}/watching-customers`;
export const PUBLIC_STOCK_INVESTING = (stockCode: string) =>
  `/public/stock/${stockCode}/investing-customers`;
export const PUBLIC_HASHTAG_INDUSTRY = '/public/hashtag/industry';
export const PUBLIC_HASHTAG_HIGHLIGHT = '/public/hashtag/highlights';
export const PRIVATE_ACTIVITY_WATCH_LIST_ADD = '/private/activity/watchlist/addV2';
export const PRIVATE_ACTIVITY_WATCH_LIST_ADD_V2 = '/private/activity/watchlist/addV2';
export const PUBLIC_STOCK_DATA = (stockCode: string) => `/public/stock/${stockCode}/data`;
export const PUBLIC_FINANCE_INFO = '/public/finance-info';
export const PUBLIC_STOCK_TRADE = (stockCode: string) => `/public/stock/${stockCode}/trade`;
export const PUBLIC_STOCK_INTRADAY = (stockCode: string) => `/public/stock/${stockCode}/step-price`;
export const PUBLIC_STOCK_SITE_MAP = '/public/stock/site-map';

export const PRIVATE_TOP_WATCHING_STOCK = '/private/watchlist/top-watching';
export const PRIVATE_TOP_MENTION_STOCK = '/private/stock/top-mention';
export const PRIVATE_WATCH_LIST_STOCK = '/private/watchlist/stock/all';
export const PRIVATE_WATCH_LIST_REMOVE_STOCK = (stockCode: string) =>
  `/private/watchlist/stock/${stockCode}/remove`;
export const PUBLIC_TOP_WATCHING = '/public/watchlist/top-watching';
export const PUBLIC_TOP_MENTION = '/public/stock/top-mention';
export const PRIVATE_REMOVE_STOCK = (code: string) => `/private/watchlist/stock/${code}/remove`;
export const PRIVATE_SORT_STOCK = (code: string) => `/private/watchlist/${code}/sort`;
export const PRIVATE_SUGGESTED_STOCK = '/private/customer/watchlist/suggested/stockcodes';
export const PUBLIC_TOP_CONFIG = '/public/stock/top-config';
