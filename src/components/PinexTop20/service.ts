import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestMarket, requestPist } from '@api/request';

export interface IProfit {
  name: string;
  profit?: number;
  revenue?: number;
  marketCapital?: number;
  price?: number;
  percentChange?: number;
  stockCode: string;
  stockExchange: string;
  stockType: string;
}
const params = {
  top: 20,
};
export const useGetTopProfit = () => {
  const { data, loading } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_PROFIT, { params });
  });
  return {
    profit: data?.data,
    loading,
  };
};
export const useGetTopRevenue = () => {
  const { data, loading } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_REVENUE, { params });
  });
  return {
    revenue: data?.data,
    loading,
  };
};
export const useGetTopMarketCap = () => {
  const { data, loading } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_MARKET_CAPITALIZATION, { params });
  });
  return {
    marketCap: data?.data,
    loading,
  };
};
export const useGetTopPrice = () => {
  const { data, loading } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_PRICE, { params });
  });
  return {
    price: data?.data,
    loading,
  };
};
export const useGetTopChangePrice = () => {
  const { data, loading } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_CHANGE_PRICE, { params });
  });
  return {
    changePriceInY: data?.data,
    loading,
  };
};
export const useGetConfig = () => {
  const { data } = useRequest(() => {
    return requestPist.get(API_PATH.PUBLIC_TOP_CONFIG);
  });
  return {
    topConfig: data?.data,
  };
};
