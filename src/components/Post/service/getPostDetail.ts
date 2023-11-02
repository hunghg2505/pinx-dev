import { PRIVATE_MAPPING_POST_DETAIL } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const getPostDetail = async (postId: string) => {
  return privateRequest(requestCommunity.get, PRIVATE_MAPPING_POST_DETAIL(postId));
};
