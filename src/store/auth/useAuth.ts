/* eslint-disable unicorn/consistent-function-scoping */
import { useRouter } from 'next/router';

import { useProfileInitial } from '@store/profile/useProfileInitial';
import { ROUTE_PATH } from '@utils/common';

import { deleteAuthCookies, getAccessToken, setAuthCookies, setRegisterCookies } from '.';

export interface IAuth {
  loading?: boolean;
  token: string | null;
  refreshToken?: string | null;
  expiredTime: number;
  isRegister?: boolean;
}

export const useAuth = () => {
  const router = useRouter();
  const { run } = useProfileInitial({ manual: true });
  const onLogout = () => {
    try {
      deleteAuthCookies();
      localStorage.clear();
      if (router.pathname !== ROUTE_PATH.LOGIN) {
        window.location.href = ROUTE_PATH.LOGIN;
      }
    } catch {}
  };

  const onLogin = (data: IAuth) => {
    try {
      setAuthCookies({
        token: `${data.token}`,
        refreshToken: data.refreshToken || '',
        expiredTime: data.expiredTime,
      });
      run();
      // requestGetProfile();
    } catch {}
  };

  const onRegister = (data: IAuth) => {
    try {
      setRegisterCookies({
        token: `${data.token}`,
        refreshToken: data.refreshToken || '',
        expiredTime: data.expiredTime,
      });
      // requestGetProfile();
    } catch {}
  };

  return {
    isLogin: !!getAccessToken(),
    onLogin,
    onLogout,
    onRegister,
  };
};
