import { API_PATH } from '@api/constant';
import { IOptions, privateRequest, requestMarket, requestPist } from '@api/request';
import { useRequest } from 'ahooks';

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

export const useSelectedTopics = (options: IOptions) => {
  const { loading, run } = useRequest(
    async ({ stocks }: { stocks: string }) => {
      return requestPist.post(API_PATH.PRIVATE_WATCH_LIST_CREATE, {
        data: {
          stocks,
        },
      });
    },
    {
      manual: true,
      ...options,
    },
  );

  const onSelectedStocks = (stocks: string) => {
    run({
      stocks,
    });
  };

  return {
    loading,
    onSelectedStocks,
  };
};
