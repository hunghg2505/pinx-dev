import { useRequest } from 'ahooks';

import { PRIVATE_SEARCH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { ISearch } from '@components/Home/service/type';

export const useSearch = () => {
  const { data, run, loading } = useRequest(
    (payload: ISearch) => {
      return privateRequest(requestPist.post, PRIVATE_SEARCH, {
        data: payload,
      });
    },
    {
      manual: true,
    },
  );
  return {
    data,
    search: run,
    loading,
  };
};
