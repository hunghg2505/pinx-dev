import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useGetUserWatchlist = (customerId: string) => {
  const { data } = useRequest(() => {
    return requestPist.get(API_PATH.GET_USER_WATCHLIST + `/${customerId}`, {});
  });
  return {
    profit: data?.data,
  };
};

export const useUpdateUserProfile = (reload = () => {}) => {
  const { run, loading } = useRequest(
    async (update) => {
      return privateRequest(requestPist.put, API_PATH.UPDATE_USER_PROFILE, {
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

export const useGetProfileOtherUser = (id: number) => {
  const { data, run, refresh } = useRequest(
    () => {
      return requestPist.get(API_PATH.PUBLIC_GET_OTHER_USER_PROFILE(id));
    },
    {
      refreshDeps: [id],
    },
  );
  return {
    profileOtherUser: data?.data,
    run,
    refresh,
  };
};
export const useGePrivatetProfileOtherUser = (id: number) => {
  const { data, run, refresh, loading } = useRequest(
    () => {
      return privateRequest(requestPist.get, API_PATH.PRIVATE_GET_OTHER_USER_PROFILE(id));
    },
    {
      refreshDeps: [id],
    },
  );
  return {
    privateProfileOtherUser: data?.data,
    run,
    refresh,
    loading,
  };
};
