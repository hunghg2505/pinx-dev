import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity, requestPist } from '@api/request';

export const useGetMYPost = () => {
  const { data, refresh, run, loading } = useRequest(async (data = [], lastid?: string) => {
    const last = {
      last: lastid || undefined,
    };
    const limit = data ? data.length + 20 : 20;
    const res = await privateRequest(requestCommunity.get, API_PATH.GET_MY_POST, {
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
