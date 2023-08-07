import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';
import { getAccessToken } from '@store/auth';

interface IOptions {
  onSuccess?: (res: any) => void;
  onError?: (error: any) => void;
}

export const useGetSearchRecent = (options?: IOptions) => {
  const params = {
    textSearch: '',
    type: '',
    page: 0,
    pageSize: 10,
  };
  const { data, run, refresh, loading } = useRequest(
    () => {
    const isLogin = !!getAccessToken();
    return isLogin
      ? privateRequest(requestCommunity.get, API_PATH.PRIVATE_SEARCH_SEO_SUGGEST, { params })
      : requestCommunity.get(API_PATH.PUBLIC_SEARCH_SEO_SUGGEST,{ params });
    },
    {
      manual: true,
      ...options,
    }
  );
  return {
    listRecent: data?.data,
    runRecent: run,
    refreshSearchRecent: refresh,
    loadingSearchRecent: loading,
  };
};

export const useCreateSearch = (options?: IOptions) => {
  const initPayloads = {
    link: '',
    postId: [],
    stockCode: [],
    themeId: [],
    typeSearch: 'ALL',
  };
  const { run } = useRequest(
    (textSearch) => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestCommunity.post, API_PATH.PRIVATE_SEARCH_SEO_CREATE, { data: { ...initPayloads, ...textSearch } })
        : requestCommunity.post(API_PATH.PUBLIC_SEARCH_SEO_CREATE,{ data: { ...initPayloads, ...textSearch } });
    },
    {
      manual: true,
      ...options,
    }
  );
  return {
    run,
  };
};

export const useSearchPublic = (options?: IOptions) => {
  const initParam = {
    textSearch: '',
    type: '',
    page: 0,
    pageSize: 10,
  };
  const { data, run, loading, refresh, mutate } = useRequest(
    (params) => {
      return requestCommunity.get(API_PATH.PUBLIC_SEARCH_SEO_RESULT, { params:{ ...initParam, ...params } });
    },
    {
      manual: true,
      ...options,
    }
  );
  return {
    data,
    searchPublic: run,
    loading,
    refresh,
    mutate
  };
};
