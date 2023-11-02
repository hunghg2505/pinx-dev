import { PRIVATE_ADD_POST_V2_COMMUNITY, PRIVATE_UPDATE_POST_V2 } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const serviceAddPost = (payload: any) => {
  return privateRequest(requestCommunity.post, PRIVATE_ADD_POST_V2_COMMUNITY, {
    data: payload,
  });
};

export const serviceUpdatePost = (id: string, payload: any) => {
  return privateRequest(requestCommunity.post, PRIVATE_UPDATE_POST_V2(id), {
    data: payload,
  });
};
