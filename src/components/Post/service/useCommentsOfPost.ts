import { useRequest } from 'ahooks';

import { getCommentsOfPost } from '@components/Post/service/getCommentsOfPost';
import { getCommentsOfPostAuth } from '@components/Post/service/getCommentsOfPostAuth';
import { getAccessToken } from '@store/auth';

export const useCommentsOfPost = (postId: string, option = {}) => {
  const { data, loading, refresh, run } = useRequest(
    async () => {
      const isLogin = !!getAccessToken();
      return isLogin ? getCommentsOfPostAuth(postId) : getCommentsOfPost(postId);
    },
    {
      refreshDeps: [postId],
      ...option,
    },
  );
  return {
    commentsOfPost: data,
    loading,
    refreshCommentOfPost: refresh,
    getDataComment: run,
  };
};
