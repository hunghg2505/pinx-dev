import { useRequest } from 'ahooks';

import { PRIVATE_WATCHLIST } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useCheckWatchList = (id: number) => {
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, PRIVATE_WATCHLIST(id));
  });
  return {
    watchList: data?.data[0]?.stocks,
  };
};
