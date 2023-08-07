import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity, requestMarket, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

import {
  IResponseStockActivities,
  IOptions,
  IResponseFinancialIndex,
  IResponseHoldingRatio,
  IResponseShareholder,
  IResponseStockDetail,
  IResponseStockDetailsExtra,
  IResponseStockEvents,
  IResponseTaggingInfo,
  IResponseThemesOfStock,
  CompanyRelatedType,
  IPayloadShareStock,
  IResponseStockData,
  IResponseFinancialIndicator,
  IResponseStockTrade,
  IResponseStockNews2,
} from './type';

const useStockDetail = (stockCode: string, options?: IOptions): IResponseStockDetail => {
  const { data } = useRequest(() => requestMarket.get(API_PATH.PUBLIC_COMPANY_DETAIL(stockCode)), {
    refreshDeps: [stockCode],
    ...options,
  });

  return {
    stockDetail: data,
  };
};

const useShareholder = (stockCode: string): IResponseShareholder => {
  const { data } = useRequest(
    () =>
      requestMarket.get(API_PATH.PUBLIC_COMPANY_SHAREHOLDER, {
        params: {
          stockCode,
        },
      }),
    {
      refreshDeps: [stockCode],
    },
  );

  return {
    shareholder: data,
  };
};

const serviceGetMyListStock = () => {
  return privateRequest(requestPist.get, API_PATH.PRIVATE_WATCHLIST_STOCK);
};

const useMyListStock = (options?: IOptions) => {
  const { data, refresh } = useRequest(
    () => {
      const isLogin = !!getAccessToken();

      return isLogin ? serviceGetMyListStock() : Promise.resolve();
    },
    {
      ...options,
    },
  );

  return { myStocks: data, refreshMyStocks: refresh };
};

const serviceFollowStock = (stockCode: string) => {
  return privateRequest(requestPist.post, API_PATH.PRIVATE_WATCH_LIST_CREATE, {
    data: {
      stocks: stockCode,
    },
  });
};

const serviceUnfollowStock = (stockCode: string) => {
  return privateRequest(requestPist.put, API_PATH.PRIVATE_WATCH_LIST_STOCK_REMOVE(stockCode));
};

const useFollowOrUnfollowStock = (options?: IOptions) => {
  return useRequest(
    (isFollowed: boolean, stockCode: string) => {
      return isFollowed ? serviceUnfollowStock(stockCode) : serviceFollowStock(stockCode);
    },
    {
      manual: true,
      ...options,
    },
  );
};

const useCompanyTaggingInfo = (stockCode: string, options?: IOptions): IResponseTaggingInfo => {
  const { data } = useRequest(
    () => {
      return requestMarket.get(API_PATH.PUBLIC_COMPANY_TAGGING_INFO(stockCode));
    },
    {
      refreshDeps: [stockCode],
      ...options,
    },
  );

  return {
    taggingInfo: data,
  };
};

const useFinancialIndex = (stockCode: string, options?: IOptions): IResponseFinancialIndex => {
  const { data } = useRequest(
    () => {
      return requestMarket.get(API_PATH.PUBLIC_FINANCIAL_INDEX, {
        params: {
          stockCode,
        },
      });
    },
    {
      refreshDeps: [stockCode],
      ...options,
    },
  );

  return {
    financialIndex: data,
  };
};

const useHoldingRatio = (stockCode: string): IResponseHoldingRatio => {
  const { data } = useRequest(
    () =>
      requestMarket.get(API_PATH.PUBLIC_COMPANY_OWNERSHIP, {
        params: {
          stockCode,
        },
      }),
    {
      refreshDeps: [stockCode],
    },
  );

  return {
    holdingRatio: data,
  };
};

const useFinancialCalendar = (stockCode: string, options?: object): IResponseStockEvents => {
  const { data, run, loading } = useRequest(
    (last?: string) =>
      requestCommunity.get(API_PATH.PUBLIC_STOCK_EVENTS(stockCode), {
        params: {
          last,
        },
      }),
    {
      refreshDeps: [stockCode],
      ...options,
    },
  );

  return {
    stockEvents: data,
    onGetFinancialCalendar: run,
    loading,
  };
};

const useThemesOfStock = (stockCode: string): IResponseThemesOfStock => {
  const { data } = useRequest(() => requestPist.get(API_PATH.PUBLIC_THEME_OF_STOCK(stockCode)), {
    refreshDeps: [stockCode],
  });

  return {
    stockThemes: data,
  };
};

const useStockDetailsExtra = (stockCode: string): IResponseStockDetailsExtra => {
  const { data, refresh } = useRequest(
    () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestCommunity.get, API_PATH.PRIVATE_STOCK_DETAIL_EXTRA(stockCode))
        : requestCommunity.get(API_PATH.PUBLIC_STOCK_DETAIL_EXTRA(stockCode));
    },
    {
      refreshDeps: [stockCode],
    },
  );

  return { stockDetails: data, refreshStockDetails: refresh };
};

const useStockReviews = (stockCode: string, options?: IOptions) => {
  const { run, refresh, loading } = useRequest(
    (params?: object) =>
      requestCommunity.get(API_PATH.PUBLIC_STOCK_REVIEWS(stockCode), {
        params,
      }),
    {
      refreshDeps: [stockCode],
      ...options,
      manual: true,
    },
  );

  return {
    onGetReviews: run,
    refreshStockReviews: refresh,
    loading,
  };
};

const useStockNews = (stockCode: string, options?: any): IResponseStockNews2 => {
  const { data, refresh, run, loading } = useRequest(
    (last?: string) => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestCommunity.get, API_PATH.PRIVATE_STOCK_NEWS(stockCode), {
            params: {
              last,
            },
          })
        : requestCommunity.get(API_PATH.PUBLIC_STOCK_NEWS(stockCode), {
            params: {
              last,
            },
          });
    },
    {
      refreshDeps: [stockCode],
      ...options,
    },
  );

  return {
    stockNews: data,
    refreshStockNews: refresh,
    onGetStockNews: run,
    loading,
  };
};

const useStockActivities = (
  stockCode: string,
  params?: { limit?: number; last?: number },
): IResponseStockActivities => {
  const { data, refresh } = useRequest(
    () => {
      const isLogin = !!getAccessToken();

      return isLogin
        ? privateRequest(requestCommunity.get, API_PATH.PRIVATE_STOCK_ACTIVITIES(stockCode), {
            params,
          })
        : requestCommunity.get(API_PATH.PUBLIC_STOCK_ACTIVITIES(stockCode), {
            params,
          });
    },
    {
      refreshDeps: [stockCode],
    },
  );

  return {
    stockActivities: data,
    refreshStockActivities: refresh,
  };
};

const useReviewStock = (stockCode: string, options?: IOptions) => {
  return useRequest(
    (data: { rateValue: number; message?: string }) =>
      privateRequest(requestCommunity.post, API_PATH.PRIVATE_STOCK_REVIEW(stockCode), {
        data,
      }),
    {
      manual: true,
      ...options,
    },
  );
};

const useStockWatchingInvesting = (stockCode: string, options?: IOptions) => {
  const requestGetWatchingInvesting = useRequest(
    (last?: string) =>
      requestCommunity.get(API_PATH.PUBLIC_STOCK_WATCHING_INVESTING(stockCode), {
        params: {
          last,
        },
      }),
    {
      refreshDeps: [stockCode],
      manual: true,
      ...options,
    },
  );

  return requestGetWatchingInvesting;
};

const useStockWatching = (stockCode: string, options?: IOptions) => {
  const requestGetStockWatching = useRequest(
    (last?: string) =>
      requestCommunity.get(API_PATH.PUBLIC_STOCK_WATCHING(stockCode), {
        params: {
          last,
        },
      }),
    {
      refreshDeps: [stockCode],
      manual: true,
      ...options,
    },
  );

  return requestGetStockWatching;
};

const useStockInvesting = (stockCode: string, options?: IOptions) => {
  const requestGetStockInvesting = useRequest(
    (last?: string) =>
      requestCommunity.get(API_PATH.PUBLIC_STOCK_INVESTING(stockCode), {
        params: {
          last,
        },
      }),
    {
      refreshDeps: [stockCode],
      manual: true,
      ...options,
    },
  );

  return requestGetStockInvesting;
};

const useCompaniesRelated = (hashtagId: string, type: CompanyRelatedType, options?: IOptions) => {
  const { data, run, loading } = useRequest(
    (params?: object) => {
      let apiPath;
      switch (type) {
        case CompanyRelatedType.INDUSTRY: {
          apiPath = API_PATH.PUBLIC_HASHTAG_INDUSTRY;
          break;
        }
        case CompanyRelatedType.HIGHLIGHTS: {
          apiPath = API_PATH.PUBLIC_HASHTAG_HIGHLIGHT;
          break;
        }
      }

      return requestMarket.get(apiPath, {
        params: {
          hashtagId,
          ...params,
        },
      });
    },
    {
      manual: true,
      refreshDeps: [hashtagId, type],
      ...options,
    },
  );

  return {
    companiesRelated: data,
    run,
    loading,
  };
};

const useShareStockActivity = (options?: IOptions) => {
  const requestShareStock = useRequest(
    (payload: IPayloadShareStock) =>
      privateRequest(requestCommunity.post, API_PATH.PRIVATE_ACTIVITY_WATCH_LIST_ADD, {
        data: payload,
      }),
    {
      manual: true,
      ...options,
    },
  );

  return requestShareStock;
};

const useGetStockData = (stockCode: string, options?: IOptions): IResponseStockData => {
  const { data } = useRequest(() => requestPist.get(API_PATH.PUBLIC_STOCK_DATA(stockCode)), {
    refreshDeps: [stockCode],
    ...options,
  });

  return {
    stockData: data,
  };
};

interface IFinancialParams {
  params: {
    stockCode: string;
    termType: string;
  };
  options?: IOptions;
}

const useFinancialIndicator = ({
  params,
  options,
}: IFinancialParams): IResponseFinancialIndicator => {
  const { data, run, loading } = useRequest(
    (page?: number) =>
      requestMarket.get(API_PATH.PUBLIC_FINANCE_INFO, {
        params: {
          ...params,
          page,
        },
      }),
    {
      manual: true,
      refreshDeps: [params.stockCode],
      ...options,
    },
  );

  return {
    financialIndicator: data,
    onGetFinancialIndicator: run,
    loading,
  };
};

const useGetStockTrade = (stockCode: string): IResponseStockTrade => {
  const { data } = useRequest(() => requestPist.get(API_PATH.PUBLIC_STOCK_TRADE(stockCode)), {
    refreshDeps: [stockCode],
  });

  return {
    stockTrade: data,
  };
};

export {
  useStockDetail,
  useShareholder,
  useMyListStock,
  useFollowOrUnfollowStock,
  useCompanyTaggingInfo,
  useFinancialIndex,
  useHoldingRatio,
  useFinancialCalendar,
  useThemesOfStock,
  useStockDetailsExtra,
  useStockReviews,
  useStockNews,
  useStockActivities,
  useReviewStock,
  useStockWatchingInvesting,
  useStockWatching,
  useStockInvesting,
  useCompaniesRelated,
  useShareStockActivity,
  useGetStockData,
  useFinancialIndicator,
  useGetStockTrade,
};
