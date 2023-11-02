import { useRequest } from 'ahooks';

import {
  PRIVATE_SEARCH_KEYWORDS_TOP,
  PUBLIC_SEARCH_KEYWORDS_TOP,
  PUBLIC_TOP_WATCHING,
  PUBLIC_TOP_MENTION,
  PUBLIC_GET_ALL_STOCK_IPO,
  PRIVATE_SEARCH_CUSTOMER_RECENT,
  PRIVATE_SEARCH,
  PUBLIC_SEARCH,
} from '@api/constant';
import { privateRequest, requestCommunity, requestPist } from '@api/request';
import { ISearch } from '@components/Home/service';
import { getAccessToken } from '@store/auth';

export interface ITopWatchingStock {
  companyName: string;
  name: string;
  nameEn?: string;
  image: string | null;
  stockCode: string;
  stockExchange: string;
  totalCount: number;
}
export interface IStockIPO {
  companyName: string;
  companyNameEng: string;
  date: string;
  stockCode: string;
  stockExchange: string;
}

interface IOptions {
  onSuccess?: (res: any, params?: any) => void;
  onError?: (error: any) => void;
}

export const useGetKeyWordsTop = () => {
  const { data, loading, mutate } = useRequest(
    () => {
      const params = {
        limit: 20,
        days: 7,
      };
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.get, PRIVATE_SEARCH_KEYWORDS_TOP, { params })
        : requestPist.get(PUBLIC_SEARCH_KEYWORDS_TOP, { params });
    },
    { loadingDelay: 300 },
  );
  return {
    keyWords: data?.data,
    loading,
    mutate,
  };
};
export const useGetTopWatchingStock = () => {
  const params = {
    size: 20,
  };
  const { data, loading } = useRequest(() => {
    return requestPist.get(PUBLIC_TOP_WATCHING, { params });
  });
  return {
    listStock: data?.data?.list,
    loading,
  };
};
export const useGetTopMentionStock = () => {
  const params = {
    size: 20,
  };
  const { data, loading } = useRequest(() => {
    return requestCommunity.get(PUBLIC_TOP_MENTION, { params });
  });
  return {
    listMention: data?.data?.list,
    loading,
  };
};

export const useGetAllIPO = () => {
  const params = {
    day: 1,
  };
  const { data, loading } = useRequest(() => {
    return requestPist.get(PUBLIC_GET_ALL_STOCK_IPO, { params });
  });
  return {
    stockIPO: data?.data,
    loading,
  };
};
export const useGetSearchRecent = () => {
  const { data, refresh } = useRequest(() => {
    return privateRequest(requestPist.get, PRIVATE_SEARCH_CUSTOMER_RECENT);
  });
  return {
    listRecent: data?.data,
    refreshSearchRecent: refresh,
  };
};
export const useGetPopular = () => {
  const { data } = useRequest(() => {
    const params = {
      limit: 6,
    };
    return requestPist.get(PUBLIC_SEARCH_KEYWORDS_TOP, { params });
  });
  return {
    popular: data?.data,
  };
};
export const useSearchPublic = (options?: IOptions) => {
  const { data, run, loading, refresh, mutate } = useRequest(
    (payload: ISearch) => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestPist.post, PRIVATE_SEARCH, { data: payload })
        : requestPist.post(PUBLIC_SEARCH, {
            data: payload,
          });
    },
    {
      manual: true,
      ...options,
    },
  );
  return {
    data,
    search: run,
    loading,
    refresh,
    mutate,
  };
};
