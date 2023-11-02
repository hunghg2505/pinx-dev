import { PUBLIC_MAPPING_POST_COMMENTS } from '@api/constant';
import { requestCommunity } from '@api/request';

export const getCommentsOfPost = (postId: string, params?: any) => {
  return requestCommunity.get(PUBLIC_MAPPING_POST_COMMENTS(postId), { params });
};
