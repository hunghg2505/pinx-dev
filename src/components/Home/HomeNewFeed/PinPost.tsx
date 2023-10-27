import React from 'react';

// import { clearCache } from 'ahooks';
import dynamic from 'next/dynamic';

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
  pinedPosts: any;
}
const PinPost = (props: IProps) => {
  const { onTrackingViewTickerCmt, pinedPosts } = props;
  // const { refresh, loading } = useGetPinedPost();

  // const onRefresh = () => {
  //   clearCache('data-pin-post');
  //   refresh();
  // };

  if (!pinedPosts) {
    return <NewsFeedSkeleton />;
  }

  return (
    <>
      {pinedPosts?.map((item: IPost) => {
        return (
          <NewsFeed
            data={item}
            key={`pined-post-${item.id}`}
            pinned={true}
            // onRefreshList={onRefresh}
            // loading={loading}
            onTrackingViewTicker={handleTrackingViewTicker}
            onTrackingViewTickerCmt={onTrackingViewTickerCmt}
            currentLocation='Pin post home page'
          />
        );
      })}
    </>
  );
};

export default PinPost;
