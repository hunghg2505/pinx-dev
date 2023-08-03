import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { requestCommunity } from '@api/request';

export const useGetSearchRecent = () => {
  const params = {
    textSearch: '',
    type: '',
    page: 0,
    pageSize: 10,
  };
  const { data, refresh, loading } = useRequest(() => {
    return requestCommunity.get(API_PATH.PUBLIC_SEARCH_SEO_SUGGEST,{ params });
  });
  return {
    listRecent: data?.data,
    refreshSearchRecent: refresh,
    loadingSearchRecent: loading,
  };
};
