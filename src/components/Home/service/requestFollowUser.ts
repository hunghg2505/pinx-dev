import { PRIVATE_FOLLOW_USER } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

// folow user
export const requestFollowUser = (id: number) => {
  return privateRequest(requestPist.post, PRIVATE_FOLLOW_USER + `?idFriend=${id}`);
};
