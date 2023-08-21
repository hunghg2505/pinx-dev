import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';
import { getAccessToken } from '@store/auth';

export async function getOtherPeoplePost(customerId: string, last?: string): Promise<any> {
  const isLogin = !!getAccessToken();
  const params = {
    customerId,
    limit: 3,
    last,
  };
  const r = isLogin
    ? await privateRequest(requestCommunity.get, API_PATH.GET_USER_POST, {
        params,
      })
    : await requestCommunity.get(API_PATH.PUBLIC_GET_USER_POST, { params });
  return {
    list: r?.data?.list,
    nextId: r?.data?.hasNext ? r?.data?.last : false,
  };
}
