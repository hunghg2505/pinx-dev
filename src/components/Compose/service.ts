import { API_PATH } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const requestAddPost = (payload: any) => {
  return privateRequest(requestCommunity.post, API_PATH.PRIVATE_ADD_POST, {
    data: payload,
  });
};
