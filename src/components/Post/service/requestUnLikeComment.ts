import { PRIVATE_UNLIKE_COMMENT } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

// unlike comment
export const requestUnLikeComment = (id: string) => {
  return privateRequest(requestCommunity.post, PRIVATE_UNLIKE_COMMENT(id));
};
