import { useRequest } from 'ahooks';

import { getTotalSharePost } from '@components/Post/service/getTotalSharePost';

export const useGetTotalSharePost = () => {
  const { data, run } = useRequest((url: string) => getTotalSharePost(url), {
    manual: true,
  });

  return {
    total: data?.shares?.all,
    onGetTotalShare: run,
  };
};
