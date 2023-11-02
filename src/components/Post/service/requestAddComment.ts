import { PRIVATE_ADD_COMMENT_V2 } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const requestAddComment = (payload: any) => {
  return privateRequest(requestCommunity.post, PRIVATE_ADD_COMMENT_V2, {
    data: payload,
  });
};
