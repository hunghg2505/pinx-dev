import { PRIVATE_HIDE_POST } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const requestHidePost = (id: string) => {
  return privateRequest(requestCommunity.put, PRIVATE_HIDE_POST + `?mappingId=${id}`);
};
