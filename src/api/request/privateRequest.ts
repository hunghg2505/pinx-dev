import TokenManager from 'brainless-token-manager';

import { getAccessToken } from '@store/auth';

export interface IOptions {
  onSuccess?: (r: any, params: any) => void;
  onError?: (e: any) => void;
}

const tokenManager = new TokenManager({
  getAccessToken: async () => {
    const token = getAccessToken();

    return `${token}`;
  },
  getRefreshToken: async () => {
    const token = getAccessToken();
    return `${token}`;
  },
  onInvalidRefreshToken: () => {},
  isValidToken: async () => {
    return true;
  },
  isValidRefreshToken: async () => {
    return true;
  },
});

export const privateRequest = async (request: any, suffixUrl: string, configs?: any) => {
  const token: string = configs?.token ?? ((await tokenManager.getToken()) as string);
  if (token) {
    return request(suffixUrl, {
      headers: {
        Authorization: token,
      },
      ...configs,
    });
  }
};
