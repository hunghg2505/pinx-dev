import { useRequest } from 'ahooks';

import { PUBLIC_GET_TRENDING } from '@api/constant';
import { requestPist } from '@api/request';

export const useGetTrending = (options = {}) => {
  const { data, loading } = useRequest(
    () => {
      return requestPist.get(PUBLIC_GET_TRENDING);
    },
    { ...options },
  );
  return {
    dataTrending: data?.data,
    loading,
  };
};
