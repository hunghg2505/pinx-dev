import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestCommunity, requestPist } from '@api/request';

export const useGetUserPost = (customerId: string) => {
  const { data } = useRequest(() => {
    return requestCommunity.get(API_PATH.GET_USER_POST + `?customerId=${customerId}`, {});
  });
  return {
    profit: data?.data,
  };
};
export const useGetUserWatchlist = (customerId: string) => {
  const { data } = useRequest(() => {
    return requestPist.get(API_PATH.GET_USER_WATCHLIST + `/${customerId}`, {});
  });
  return {
    profit: data?.data,
  };
};
