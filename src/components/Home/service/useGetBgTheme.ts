import { useRequest } from 'ahooks';

import { PUBLIC_THEME } from '@api/constant';
import { requestCommunity } from '@api/request';

// get list theme

export const useGetBgTheme = () => {
  const { data } = useRequest(() => {
    return requestCommunity.get(PUBLIC_THEME);
  });
  return {
    bgTheme: data?.data,
  };
};
