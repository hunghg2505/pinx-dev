import { PRIVATE_MAPPING_UNLIKE_POST } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const unlikePost = async (postId: string) => {
  return privateRequest(requestCommunity.post, PRIVATE_MAPPING_UNLIKE_POST(postId));
};
