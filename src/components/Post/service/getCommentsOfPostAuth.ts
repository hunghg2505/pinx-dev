import { PRIVATE_MAPPING_POST_COMMENTS } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';

export const getCommentsOfPostAuth = async (postId: string, params?: any) => {
  return privateRequest(requestCommunity.get, PRIVATE_MAPPING_POST_COMMENTS(postId), {
    params,
  });
};
