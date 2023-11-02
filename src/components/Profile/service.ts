import { useRequest } from 'ahooks';

import {
  GET_USER_WATCHLIST,
  UPDATE_USER_PROFILE,
  PUBLIC_GET_OTHER_USER_PROFILE,
  PRIVATE_GET_OTHER_USER_PROFILE,
} from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useGetUserWatchlist = (customerId: string) => {
  const { data } = useRequest(() => {
    return requestPist.get(GET_USER_WATCHLIST + `/${customerId}`, {});
  });
  return {
    profit: data?.data,
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

export const useGetProfileOtherUser = (id: number) => {
  const { data, run, refresh } = useRequest(
    () => {
      return requestPist.get(PUBLIC_GET_OTHER_USER_PROFILE(id));
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
      return privateRequest(requestPist.get, PRIVATE_GET_OTHER_USER_PROFILE(id));
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
