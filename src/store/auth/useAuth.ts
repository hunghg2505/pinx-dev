/* eslint-disable unicorn/consistent-function-scoping */
import { HOME } from 'src/constant/route';
import { logoutTracking, reset } from 'src/mixpanel/mixpanel';

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
      reset();
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
