import { useRequest } from 'ahooks';

import { FILTER_LIST } from '@api/constant';
import { requestCommunity } from '@api/request';

export const useGetListFillter = () => {
  const { data, refresh } = useRequest(() => {
    return requestCommunity.get(FILTER_LIST);
  });

  return {
    data,
    refresh,
  };
};
