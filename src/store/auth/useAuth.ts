/* eslint-disable unicorn/consistent-function-scoping */
import { useEffect, useState } from 'react';

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
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!!getAccessToken());
  }, []);

  const onLogout = (navigatePath?: string) => {
    try {
      deleteAuthCookies();
      localStorage.clear();
      window.location.href = navigatePath || ROUTE_PATH.HOME;
    } catch {}
  };

  const onLogin = (data: IAuth) => {
    try {
      setAuthCookies({
        token: `${data.token}`,
        refreshToken: data.refreshToken || '',
        expiredTime: data.expiredTime,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
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
    isLogin,
    onLogin,
    onLogout,
    onRegister,
  };
};
