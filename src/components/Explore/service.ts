import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestMarket, requestPist } from '@api/request';
import { getAccessToken } from '@store/auth';

export interface ITopWatchingStock {
  companyName: string;
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
export const useGetKeyWordsTop = () => {
  const { data } = useRequest(() => {
    const params = {
      limit: 20,
    };
    const isLogin = !!getAccessToken();
    return isLogin
      ? privateRequest(requestPist.get, API_PATH.PRIVATE_SEARCH_KEYWORDS_TOP, { params })
      : requestPist.get(API_PATH.PUBLIC_SEARCH_KEYWORDS_TOP, { params });
  });
  return {
    keyWords: data?.data,
  };
};
export const useGetTopWatchingStock = () => {
  const params = {
    limit: 20,
  };
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, API_PATH.PRIVATE_TOP_WATCHING_STOCK, { params });
  });
  return {
    listStock: data?.data,
  };
};
export const useGetTopMentionStock = () => {
  const params = {
    limit: 20,
  };
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, API_PATH.PRIVATE_TOP_MENTION_STOCK, { params });
  });
  return {
    listMention: data?.data,
  };
};

export const useGetAllIPO = () => {
  const { data } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_GET_ALL_STOCK_IPO);
  });
  return {
    stockIPO: data?.data,
  };
};
export const useGetSearchRecent = () => {
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, API_PATH.PRIVATE_SEARCH_CUSTOMER_RECENT);
  });
  return {
    listRecent: data?.data,
  };
};
export const useGetPopular = () => {
  const { data } = useRequest(() => {
    return requestPist.get(API_PATH.PUBLIC_SEARCH_KEYWORDS_TOP);
  });
  return {
    popular: data?.data,
  };
};
