import { useRequest } from 'ahooks';

import { PRIVATE_COMMENT_OF_COMMENT, PUBLIC_COMMENT_OF_COMMENT } from '@api/constant';
import { privateRequest, requestCommunity } from '@api/request';
import { getAccessToken } from '@store/auth';

export const useCommentOfComment = (option = {}) => {
  const { data, loading, refresh, run, mutate } = useRequest(
    async (commentId: string) => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? privateRequest(requestCommunity.get, PRIVATE_COMMENT_OF_COMMENT(commentId))
        : requestCommunity.get(PUBLIC_COMMENT_OF_COMMENT(commentId));
    },
    {
      // manual: true,
      ...option,
    },
  );
  return {
    data: data?.data?.list,
    loading,
    run,
    mutate,
    refreshCommentOfComment: refresh,
  };
};
