import { PRIVATE_MAPPING_LIKE_POST } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const likePost = async (postId: string) => {
  return privateRequest(requestCommunity.post, PRIVATE_MAPPING_LIKE_POST(postId));
};
