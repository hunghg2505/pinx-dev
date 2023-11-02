import TokenManager from 'brainless-token-manager';

import { PREFIX_API_COMMUNITY } from '@api/request/constant';
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

export const requestFromServer = async (ctx: any, suffixUrl: string) => {
  const token = getAccessToken(ctx?.res, ctx?.req);

  return privateRequest(fetch, `${PREFIX_API_COMMUNITY}${suffixUrl}`, {
    token,
  }).then((r) => r.json());
};
