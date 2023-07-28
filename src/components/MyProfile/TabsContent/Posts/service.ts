import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export async function getMyPost(nextId: string): Promise<any> {
  const r = await privateRequest(requestCommunity.get, API_PATH.GET_MY_POST, {
    params: {
      limit: 5,
      last: nextId ?? '',
    },
  });

  return {
    list: r?.data?.list,
    nextId: r?.data?.hasNext ? r?.data?.last : false,
  };
}
