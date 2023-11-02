// unfollow user

import { PRIVATE_UNFOLLOW_USER } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';

export const requestUnFollowUser = (id: number) => {
  return privateRequest(requestPist.put, PRIVATE_UNFOLLOW_USER + `?idFriend=${id}`);
};
