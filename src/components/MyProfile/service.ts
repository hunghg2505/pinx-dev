import { useRequest } from 'ahooks';

import { GET_MY_POST, UPDATE_USER_PROFILE, GET_USER_WATCHLIST } from '@api/constant';
import { privateRequest, requestCommunity, requestPist } from '@api/request';

export const useGetMYPost = () => {
  const { data, refresh, run, loading } = useRequest(async (data = [], lastid?: string) => {
    const last = {
      last: lastid || undefined,
    };
    const limit = data ? data.length + 20 : 20;
    const res = await privateRequest(requestCommunity.get, GET_MY_POST, {
      params: {
        ...last,
        limit,
      },
    });
    return {
      list: [...data, ...res?.data?.list],
      hasNext: res?.data?.hasNext,
      last: res?.data?.last,
    };
  });
  return {
    data,
    refresh,
    run,
    loading,
  };
};

export const useUpdateUserProfile = (reload = () => {}) => {
  const { run, loading } = useRequest(
    async (update) => {
      return privateRequest(requestPist.put, UPDATE_USER_PROFILE, {
        data: update,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        reload();
      },
    },
  );
  return {
    run,
    loading,
  };
};

export const useGetMyWatchList = async () => {
  const res = await privateRequest(requestPist.get, GET_USER_WATCHLIST);
  return res;
};
