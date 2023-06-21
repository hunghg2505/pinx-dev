import { useRequest } from 'ahooks';
import request from 'umi-request';

import { API_PATH, PREFIX_API_PIST } from '@api/request';
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
  const requestLogout = useRequest(
    async (token: any) => {
      return request.post(`${PREFIX_API_PIST}${API_PATH.LOGOUT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      manual: true,
    },
  );

  const onLogout = async () => {
    try {
      const token = getAccessToken();
      requestLogout.run(token);
      deleteAuthCookies();
      window.location.href = ROUTE_PATH.LOGIN;
    } catch (error) {
      console.log('Logout error', error);
    }
  };

  const onLogin = (data: IAuth) => {
    console.log(data);
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
