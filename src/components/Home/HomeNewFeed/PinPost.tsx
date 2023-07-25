/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo } from 'react';

import { clearCache } from 'ahooks';

import { useGetPinedPost } from '@components/Home/service';
import NewsFeed from '@components/Post/NewsFeed';
import { IPost } from '@components/Post/service';

const PinPost = ({ refresh, onHidePost, pinPostDataInitial }: any) => {
  const { pinedPost } = useGetPinedPost();

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

  return (
    <>
      {data?.map((item: IPost) => {
        return (
          <NewsFeed
            data={item}
            key={`pined-post-${item.id}`}
            id={item.id}
            refresh={onRefresh}
            onHidePost={onHidePost}
            pinned={true}
          />
        );
      })}
    </>
  );
};

export default PinPost;