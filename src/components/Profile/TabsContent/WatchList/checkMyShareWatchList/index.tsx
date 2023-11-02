import { useRequest } from 'ahooks';

import { GET_CUSTOMER_ALL_SETTINGS } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useGetIsShareWatchList = () => {
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, GET_CUSTOMER_ALL_SETTINGS);
  });
  return {
    isShareWatchList: data?.data?.share_watchlist !== '0',
  };
};
