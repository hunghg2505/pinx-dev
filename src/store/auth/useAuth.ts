/* eslint-disable unicorn/consistent-function-scoping */
import mixpanel from 'mixpanel-browser';

import { HOME } from 'src/constant/route';
import { logoutTracking } from 'src/mixpanel/mixpanel';

import { deleteAuthCookies, setAuthCookies, setRegisterCookies } from '.';

export interface IAuth {
  loading?: boolean;
  token: string | null;
  refreshToken?: string | null;
  expiredTime: number;
  isRegister?: boolean;
}

export const useAuth = () => {
  const onLogout = (navigatePath?: string) => {
    try {
      const date = new Date();
      deleteAuthCookies();
      localStorage.clear();
      window.location.href = navigatePath || HOME;
      logoutTracking(date);
      mixpanel.reset();
      // navigator.serviceWorker.getRegistrations().then(function (registrations) {
      //   for (const registration of registrations) {
      //     registration.unregister();
      //   }
      // });
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
    onLogin,
    onLogout,
    onRegister,
  };
};
