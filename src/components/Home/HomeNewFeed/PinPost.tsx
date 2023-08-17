import React, { useMemo } from 'react';

import { clearCache } from 'ahooks';

import { useGetPinedPost } from '@components/Home/service';
import NewsFeed from '@components/Post/NewsFeed';
import { IPost } from '@components/Post/service';
import SkeletonLoading from '@components/UI/Skeleton';

const PinPost = ({ pinPostDataInitial }: any) => {
  const { pinedPost, refresh, loading } = useGetPinedPost();

  const data = useMemo(() => {
    if (pinedPost?.length) {
      return pinedPost;
    }

    return pinPostDataInitial?.data;
  }, [pinPostDataInitial?.data, pinedPost]);

  const onRefresh = () => {
    clearCache('data-pin-post');
    refresh();
  };
  if (loading) {
    return <SkeletonLoading />;
  }
  return (
    <>
      {data?.map((item: IPost) => {
        return (
          <NewsFeed
            data={item}
            key={`pined-post-${item.id}`}
            pinned={true}
            onRefreshList={onRefresh}
          />
        );
      })}
    </>
  );
};

export default PinPost;
