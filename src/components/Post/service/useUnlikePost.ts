import { useRequest } from 'ahooks';

import { unlikePost } from '@components/Post/service/unlikePost';

export const useUnlikePost = (postId: string) => {
  const { data, loading, run } = useRequest(() => unlikePost(postId), {
    manual: true,
    refreshDeps: [postId],
    debounceWait: 250,
  });

  const onUnlikePost = () => {
    run();
  };

  return {
    unlikePost: data,
    loading,
    onUnlikePost,
  };
};
