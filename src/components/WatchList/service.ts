import { useRequest } from 'ahooks';

import { PRIVATE_SUGGESTED_STOCK, PRIVATE_WATCHLIST_STOCK } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

export const useGetInterest = (option = {}) => {
  const { data, refresh, run, loading } = useRequest(
    () => {
      return privateRequest(requestPist.get, PRIVATE_SUGGESTED_STOCK);
    },
    {
      ...option,
    },
  );
  return {
    interestStock: data?.data,
    refreshInterest: refresh,
    getInterest: run,
    loading,
  };
};

export const useGetYourWatchList = (options?: IOptionsRequest) => {
  const { data, run, refresh, loading } = useRequest(
    () => {
      return privateRequest(requestPist.get, PRIVATE_WATCHLIST_STOCK);
    },
    {
      ...options,
      manual: true,
    },
  );
  return {
    yourWatchListStock: data?.data?.[0]?.stocks,
    runYourWatchList: run,
    refreshYourWatchList: refresh,
    loadingYourWatchList: loading,
  };
};
