import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestMarket, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

import { IOptions, IResponseShareholder, IResponseStockDetail } from './type';

const useStockDetail = (stockCode: string): IResponseStockDetail => {
  const { data } = useRequest(() => requestMarket.get(API_PATH.PUBLIC_COMPANY_DETAIL(stockCode)), {
    refreshDeps: [stockCode],
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

export { useStockDetail, useShareholder, useMyListStock, useFollowOrUnfollowStock };
