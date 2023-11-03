import { get, remove, set } from '@utils/cookies';

export const getAccessToken = () => {
  return get('accessToken') || '';
};

export const getRefreshToken = () => {
  return get('accessRefreshToken') || '';
};

export const setAuthCookies = ({
  token,
  refreshToken,
  expiredTime,
}: {
  token: string;
  refreshToken: string;
  expiredTime?: number;
}) => {
  set('accessToken', token, {
    expires: 365,
  });
  set('accessRefreshToken', refreshToken, {
    expires: 365,
  });
  set('tokenExpiredTime', expiredTime || 0, {
    expires: 365,
  });
};

export const deleteAuthCookies = () => {
  remove('accessToken');
  remove('accessRefreshToken');
  remove('tokenExpiredTime');
};

export const getRegisterToken = () => {
  return get('registerToken') || '';
};

export const getRefreshRegisterToken = () => {
  return get('refreshRegisterToken') || '';
};

export const setRegisterCookies = ({
  token,
  refreshToken,
  expiredTime,
}: {
  token: string;
  refreshToken: string;
  expiredTime?: number;
}) => {
  set('registerToken', token, {
    expires: 365,
  });
  set('refreshRegisterToken', refreshToken, {
    expires: 365,
  });
  set('registertokenExpiredTime', expiredTime || 0, {
    expires: 365,
  });
};

export const deleteRegisterCookies = () => {
  remove('registerToken');
  remove('refreshRegisterToken');
  remove('registertokenExpiredTime');
};
