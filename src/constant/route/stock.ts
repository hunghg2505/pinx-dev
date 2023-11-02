export const STOCK_DETAIL = (stockCode: string) => `/co-phieu/${stockCode}`;
export const STOCK_EVENT = (stockCode: string) => `${STOCK_DETAIL(stockCode)}/financial-calendar`;
export const STOCK_REVIEW = (stockCode: string) => `${STOCK_DETAIL(stockCode)}/rating`;
export const STOCK_ALSO_OWN = (stockCode: string) => `${STOCK_DETAIL(stockCode)}/also-own`;
export const STOCK_NEWS = (stockCode: string) => `${STOCK_DETAIL(stockCode)}/news`;
export const STOCK_SUBSCRIBER = (stockCode: string) => `${STOCK_DETAIL(stockCode)}/subscriber`;
export const STOCK_RELATED = (stockCode: string, hashtagId: string) =>
  `${STOCK_DETAIL(stockCode)}/related/${hashtagId}`;
