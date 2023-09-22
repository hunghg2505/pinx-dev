import React, { useState } from 'react';

import { useRouter } from 'next/router';

import NewFeedItem from '@components/Post/NewsFeed/NewFeedItem';
import { IPost, useCommentsOfPost } from '@components/Post/service';
import { ViewTickerInfo } from '@utils/dataLayer';

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string) => {
  ViewTickerInfo(stockCode, 'Explore screen', 'Trending on pinex post', 'Stock');
};

interface IProps {
  data: IPost;
  refreshTrendingOnPinex: () => void;
}
const TrendingOnnPinex = ({ data, refreshTrendingOnPinex }: IProps) => {
  const [dataPost, setdataPost] = useState(data);
  React.useEffect(() => {
    setdataPost(data);
  }, [data]);
  const router = useRouter();
  const onNavigate = () => {
    router.push(`/post/${dataPost?.id}`);
    globalThis?.sessionStorage.setItem('scrollPosition', String(window?.scrollY));
  };
  const { commentsOfPost } = useCommentsOfPost(String(dataPost?.id));
  const totalComments = commentsOfPost?.data?.list?.length;
  const commentChild = commentsOfPost?.data?.list?.reduce(
    (acc: any, current: any) => acc + current?.totalChildren,
    0,
  );
  const countComment = totalComments + commentChild;

  const onRefreshPostDetail = (newData: IPost) => {
    setdataPost(newData);
  };

  return (
    <div className='box-shadow card-style'>
      <NewFeedItem
        onNavigate={onNavigate}
        postDetail={dataPost}
        totalComments={countComment}
        onRefreshPostDetail={onRefreshPostDetail}
        isExplore={true}
        refreshTrendingOnPinex={refreshTrendingOnPinex}
        onTrackingViewTicker={handleTrackingViewTicker}
      />
    </div>
  );
};
export default TrendingOnnPinex;
