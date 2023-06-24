import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { IOptions, privateRequest, requestMarket, requestPist } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

const requestGetSuggestStockCode = async () => {
  return await privateRequest(requestPist.get, API_PATH.PUBLIC_SUGGEST_STOCK_CODE);
};

export const useSuggestStockCode = (options: IOptionsRequest) => {
  const { data, loading } = useRequest(
    async () => {
      return await requestGetSuggestStockCode();
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
  return await privateRequest(
    requestMarket.get,
    API_PATH.PUBLIC_COMPANY_GET_BY_STOCK_BRIEF(stockCodes),
  );
};

export const useGetDetailStockCode = (stockCodes: string) => {
  const { data, loading, run } = useRequest(
    async () => {
      return await requestGetDetailStockCode(stockCodes);
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
  return await privateRequest(requestPist.post, API_PATH.PRIVATE_WATCH_LIST_CREATE, {
    data: {
      stockCodes,
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
