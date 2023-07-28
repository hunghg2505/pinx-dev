import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export async function getOtherPeoplePost(customerId: string, last?: string): Promise<any> {
  const r = await privateRequest(requestCommunity.get, API_PATH.GET_USER_POST, {
    params: {
      customerId,
      limit: 10,
      last,
    },
  });

  return {
    list: r?.data?.list,
    nextId: r?.data?.hasNext ? r?.data?.last : false,
  };
}
