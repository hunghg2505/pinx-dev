import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';
import { getAccessToken } from '@store/auth';

interface IOptions {
  onSuccess?: (res: any) => void;
  onError?: (error: any) => void;
}

export const useGetSearchRecent = () => {
  const params = {
    textSearch: '',
    type: '',
    page: 0,
    pageSize: 10,
  };
  const { data, refresh, loading } = useRequest(() => {
    const isLogin = !!getAccessToken();
    return isLogin
      ? privateRequest(requestCommunity.get, API_PATH.PRIVATE_SEARCH_SEO_SUGGEST, { params })
      : requestCommunity.get(API_PATH.PUBLIC_SEARCH_SEO_SUGGEST,{ params });
  });
  return {
    listRecent: data?.data,
    refreshSearchRecent: refresh,
    loadingSearchRecent: loading,
  };
};

export const useSearchPublic = (options?: IOptions) => {
  const { data, run, loading, refresh, mutate } = useRequest(
    (params) => {
      return requestCommunity.get(API_PATH.PUBLIC_SEARCH_SEO_RESULT, { params });
    },
    {
      manual: true,
      ...options,
    }
  );
  return {
    data,
    search: run,
    loading,
    refresh,
    mutate
  };
};
