import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useCheckWatchList = (id: number) => {
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, API_PATH.PRIVATE_WATCHLIST(id));
  });
  return {
    watchList: data?.data[0]?.stocks,
  };
};
