import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';

import { API_PATH } from '@api/constant';
import { requestCommunity } from '@api/request';

import { postThemeAtom } from './theme';

export const usePostThemeInitial = () => {
  const [, setPostTheme] = useAtom(postThemeAtom);

  const requestGetTheme = useRequest(
    async () => {
      return requestCommunity.get(API_PATH.PUBLIC_THEME);
    },
    {
      onSuccess: (res) => {
        setPostTheme(res?.data);
      },
      onError: () => {},
    },
  );
  return {
    requestGetTheme,
  };
};
