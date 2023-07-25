import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const useGetInterest = () => {
  const { data, refresh, loading } = useRequest(() => {
    return privateRequest(requestPist.get, API_PATH.PRIVATE_SUGGESTED_STOCK);
  });
  return {
    interestStock: data?.data,
    refreshInterest: refresh,
    loadingInterest: loading,
  };
};
