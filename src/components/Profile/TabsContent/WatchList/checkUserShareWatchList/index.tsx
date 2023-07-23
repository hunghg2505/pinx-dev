import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useGetUerIsShareWatchList = (id: number) => {
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, API_PATH.PRIVATE_GET_OTHER_USER_PROFILE(id));
  });
  return {
    isUserShareWatchList: data?.data?.isShareWatchlist,
  };
};
