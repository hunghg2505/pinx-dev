import { PRIVATE_LIKE_COMMENT } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

// like comment
export const requestLikeComment = (id: string) => {
  return privateRequest(requestCommunity.post, PRIVATE_LIKE_COMMENT(id));
};
