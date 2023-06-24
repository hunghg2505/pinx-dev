import { useRouter } from 'next/router';

import { ROUTE_PATH } from '@utils/common';

import { deleteAuthCookies, getAccessToken, setAuthCookies } from '.';

export interface IAuth {
  loading?: boolean;
  token: string | null;
  refreshToken?: string | null;
  expiredTime: number;
  isRegister?: boolean;
}

export const useAuth = () => {
  const router = useRouter();
  const onLogout = () => {
    try {
      deleteAuthCookies();
      if (router.pathname !== ROUTE_PATH.LOGIN) {
        window.location.href = ROUTE_PATH.LOGIN;
      }
    } catch (error) {
      console.log('Logout error', error);
    }
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onLogin = (data: IAuth) => {
    try {
      setAuthCookies({
        token: `${data.token}`,
        refreshToken: data.refreshToken || '',
        expiredTime: data.expiredTime,
      });
      // requestGetProfile();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLogin: !!getAccessToken(),
    onLogin,
    onLogout,
  };
};
