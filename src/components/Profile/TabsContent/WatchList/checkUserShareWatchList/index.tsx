import { useRequest } from 'ahooks';

import { PRIVATE_GET_OTHER_USER_PROFILE } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useGetUerIsShareWatchList = (id: number) => {
  const { data } = useRequest(() => {
    return privateRequest(requestPist.get, PRIVATE_GET_OTHER_USER_PROFILE(id));
  });
  return {
    isUserShareWatchList: data?.data?.isShareWatchlist,
  };
};
