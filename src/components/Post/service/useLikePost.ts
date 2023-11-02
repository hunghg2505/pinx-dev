import { useRequest } from 'ahooks';

import { likePost } from '@components/Post/service/likePost';

export const useLikePost = (postId: string) => {
  const { data, loading, run } = useRequest(() => likePost(postId), {
    manual: true,
    refreshDeps: [postId],
    debounceWait: 250,
  });

  const onLikePost = () => {
    run();
  };

  return {
    likePost: data,
    loading,
    onLikePost,
  };
};
