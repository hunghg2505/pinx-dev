import { useRequest } from 'ahooks';

import { NEWFEED_LIST } from '@api/constant';
import { requestCommunity } from '@api/request';
import { requestGetList } from '@components/Home/service/requestGetList';
import { IOptionsRequest } from '@components/Home/service/type';
import { getAccessToken } from '@store/auth';

export const useGetListNewFeed = (options?: IOptionsRequest) => {
  const { data, run, refresh, loading } = useRequest(
    (type: any, last?: string) => {
      const isLogin = !!getAccessToken();

      const params: any = {
        filterType: type,
        last,
      };
      for (const key of Object.keys(params)) {
        if (params[key] === null || params[key] === undefined || params[key] === '') {
          delete params[key];
        }
      }
      return isLogin ? requestGetList(params) : requestCommunity.get(NEWFEED_LIST, { params });
    },
    {
      ...options,
      manual: true,
      loadingDelay: 500,
    },
  );
  return {
    listNewFeed: data?.data,
    run,
    refresh,
    loading,
  };
};
