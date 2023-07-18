import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestMarket } from '@api/request';

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
  const { data } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_PROFIT, { params });
  });
  return {
    profit: data?.data,
  };
};
export const useGetTopRevenue = () => {
  const { data } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_REVENUE, { params });
  });
  return {
    revenue: data?.data,
  };
};
export const useGetTopMarketCap = () => {
  const { data } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_MARKET_CAPITALIZATION, { params });
  });
  return {
    marketCap: data?.data,
  };
};
export const useGetTopPrice = () => {
  const { data } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_PRICE, { params });
  });
  return {
    price: data?.data,
  };
};
export const useGetTopChangePrice = () => {
  const { data } = useRequest(() => {
    return requestMarket.get(API_PATH.PUBLIC_TOP_CHANGE_PRICE, { params });
  });
  return {
    changePriceInY: data?.data,
  };
};
