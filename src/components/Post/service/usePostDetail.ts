import { useRequest } from 'ahooks';

import { PUCLIC_MAPPING_POST_DETAIL } from '@api/constant';
import { requestCommunity } from '@api/request';
import { getPostDetail } from '@components/Post/service/getPostDetail';
import { getAccessToken } from '@store/auth';

export const usePostDetail = (postId: string, option = {}) => {
  const { data, loading, refresh, run } = useRequest(
    () => {
      const isLogin = !!getAccessToken();
      return isLogin
        ? getPostDetail(postId)
        : requestCommunity.get(PUCLIC_MAPPING_POST_DETAIL(postId));
    },
    {
      refreshDeps: [postId],
      loadingDelay: 300,
      ...option,
      // manual: true,
    },
  );
  return {
    postDetail: data,
    loading,
    refresh,
    run,
  };
};
