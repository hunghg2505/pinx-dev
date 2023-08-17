import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}

export const useGetInterest = (option = {}) => {
  const { data, refresh, run } = useRequest(
    () => {
      return privateRequest(requestPist.get, API_PATH.PRIVATE_SUGGESTED_STOCK);
    },
    {
      ...option,
    },
  );
  return {
    interestStock: data?.data,
    refreshInterest: refresh,
    getInterest: run,
  };
};

export const useGetYourWatchList = (options?: IOptionsRequest) => {
  const { data, run, refresh, loading } = useRequest(
    () => {
      return privateRequest(requestPist.get, API_PATH.PRIVATE_WATCHLIST_STOCK);
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
