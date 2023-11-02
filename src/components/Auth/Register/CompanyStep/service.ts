import { useRequest } from 'ahooks';

import {
  PUBLIC_SUGGEST_STOCK_CODE,
  PUBLIC_COMPANY_GET_BY_STOCK_BRIEF,
  PRIVATE_WATCH_LIST_CREATE,
  PRIVATE_WATCHLIST_STOCK,
  PRIVATE_WATCH_LIST_REMOVE_STOCK,
} from '@api/constant';
import { IOptions, privateRequest, requestMarket, requestPist } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

export interface ResultListStock {
  data: {
    stocks: {
      stockCode: string;
    }[];
  }[];
}

const requestGetSuggestStockCode = async () => {
  return privateRequest(requestPist.get, PUBLIC_SUGGEST_STOCK_CODE);
};

export const useSuggestStockCode = (options: IOptionsRequest) => {
  const { data, loading } = useRequest(
    async () => {
      return requestGetSuggestStockCode();
    },
    {
      ...options,
    },
  );

  return {
    stockCodes: data,
    loading,
  };
};

const requestGetDetailStockCode = async (stockCodes: string) => {
  return privateRequest(requestMarket.get, PUBLIC_COMPANY_GET_BY_STOCK_BRIEF(stockCodes));
};

export const useGetDetailStockCode = (stockCodes: string) => {
  const { data, loading, run } = useRequest(
    async () => {
      return requestGetDetailStockCode(stockCodes);
    },
    {
      manual: true,
    },
  );

  return {
    detailStockCodes: data,
    loading,
    run,
  };
};

const serviceSelectStock = async (stockCodes: string) => {
  return privateRequest(requestPist.post, PRIVATE_WATCH_LIST_CREATE, {
    data: {
      stocks: stockCodes,
    },
  });
};

export const useSelectStock = (options: IOptions) => {
  const requestSelectStock = useRequest(serviceSelectStock, {
    manual: true,
    ...options,
  });

  return requestSelectStock;
};

const serviceGetMyStock = () => {
  return privateRequest(requestPist.get, PRIVATE_WATCHLIST_STOCK);
};

export const useGetMyStock = (options: IOptions) => {
  const requestGetMyStocks = useRequest(serviceGetMyStock, {
    manual: true,
    ...options,
  });

  return requestGetMyStocks;
};

const serviceUnSelectStock = (stockCode: string) => {
  return privateRequest(requestPist.put, PRIVATE_WATCH_LIST_REMOVE_STOCK(stockCode));
};

export const useUnSelectStock = () => {
  const requestUnSelectStock = useRequest(serviceUnSelectStock, {
    manual: true,
  });

  return requestUnSelectStock;
};
