import React, { useEffect, useRef, useState } from 'react';

import NewsFeed from '@components/Post/NewsFeed';
import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';
import Loading from '@components/UI/Loading';
import useBottomScroll from '@hooks/useBottomScroll';

import Empty from '../Empty';
import { ResponseSearchPost, useSearchPost } from '../service';

interface PostTabProps {
  keyword: string;
  onTrackingViewTicker: (stockCode: string, locationDetail: string) => void;
  keywordFormat: string;
}

const SkeletonLoadingPost = () => {
  return <NewsFeedSkeleton />;
};

const PostsTab = ({ keyword, onTrackingViewTicker, keywordFormat }: PostTabProps) => {
  const [posts, setPosts] = useState<ResponseSearchPost | NonNullable<any>>();
  const ref = useRef(null);
  const requestGetPosts = useSearchPost({
    manual: true,
    onSuccess: ({ data }: ResponseSearchPost) => {
      setPosts((prev: any) => ({
        data: {
          list: [...(prev?.data.list || []), ...data?.list],
          hasNext: data?.hasNext,
          last: data.last,
        },
      }));
    },
    onError: () => {
      setPosts({});
    },
  });

  useEffect(() => {
    if (keyword.trim()) {
      requestGetPosts.run({
        keyword: keywordFormat,
      });
    }

    return () => {
      setPosts(undefined);
    };
  }, [keyword]);

  useBottomScroll(ref, () => {
    if (posts?.data.hasNext && !requestGetPosts.loading) {
      requestGetPosts.run({
        keyword,
        last: posts.data.last,
      });
    }
  });

  return posts?.data?.list && posts?.data.list.length > 0 ? (
    <div className='flex flex-col gap-y-[16px]' ref={ref}>
      {posts.data.list?.map((post: any) => {
        return (
          <NewsFeed
            key={`explore-search-${post?.id}`}
            data={post}
            isNewFeedExplore={false}
            hiddenComment={true}
            onTrackingViewTicker={(stockCode) => onTrackingViewTicker(stockCode, 'Posts tab')}
          />
        );
      })}

      {posts?.data.hasNext && requestGetPosts.loading && <SkeletonLoadingPost />}
    </div>
  ) : (
    <>
      {posts && keyword ? (
        <Empty keyword={keyword} />
      ) : (
        <div className='flex min-h-[150px] flex-row items-center justify-center'>
          <Loading />
        </div>
      )}
    </>
  );
};

export default PostsTab;
