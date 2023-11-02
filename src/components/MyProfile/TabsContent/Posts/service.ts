import { GET_MY_POST } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export async function getMyPost(nextId: string): Promise<any> {
  const r = await privateRequest(requestCommunity.get, GET_MY_POST, {
    params: {
      limit: 3,
      last: nextId ?? '',
    },
  });

  return {
    list: r?.data?.list,
    nextId: r?.data?.hasNext ? r?.data?.last : false,
  };
}
