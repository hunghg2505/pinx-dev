import React, { useEffect, useState, useTransition } from 'react';

import { clearCache } from 'ahooks';
import dynamic from 'next/dynamic';

import { useGetPinedPost } from '@components/Home/service';
import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';
import { IPost } from '@components/Post/service';
import { viewTickerInfoTracking } from 'src/mixpanel/mixpanel';

const NewsFeed = dynamic(() => import('@components/Post/NewsFeed'), {
  loading: () => <NewsFeedSkeleton />,
});

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string) => {
  viewTickerInfoTracking(stockCode, 'Home screen', 'Pin post', 'Stock');
};
interface IProps {
  onTrackingViewTickerCmt: any;
}
const PinPost = (props: IProps) => {
  const { onTrackingViewTickerCmt } = props;
  const { pinedPost, refresh, loading } = useGetPinedPost();
  const [data, setData] = useState([]);
  const [, setIsTransition] = useTransition();

  useEffect(() => {
    setIsTransition(() => setData(pinedPost));
  }, [JSON.stringify(pinedPost)]);

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
            pinned={true}
            onRefreshList={onRefresh}
            loading={loading}
            onTrackingViewTicker={handleTrackingViewTicker}
            onTrackingViewTickerCmt={onTrackingViewTickerCmt}
          />
        );
      })}
    </>
  );
};

export default PinPost;
