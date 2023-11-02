import { useRequest } from 'ahooks';

import { PRIVATE_NEWFEED_LIST } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

// get list new feed
export const useGetListNewFeedAuth = () => {
  const { data, run, refresh } = useRequest(
    (type: string) => {
      return privateRequest(requestCommunity.get, PRIVATE_NEWFEED_LIST + `?filterType=${type}`);
    },
    {
      manual: true,
    },
  );
  return {
    listNewFeedAuth: data?.data?.list,
    runNewFeedAuth: run,
    refresh,
  };
};
