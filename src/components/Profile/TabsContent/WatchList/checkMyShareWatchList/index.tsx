import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useGetIsShareWatchList = () => {
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, API_PATH.GET_CUSTOMER_ALL_SETTINGS);
  });
  return {
    isShareWatchList: data?.data?.share_watchlist,
  };
};
