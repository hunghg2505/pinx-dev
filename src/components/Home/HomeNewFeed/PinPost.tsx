import React from 'react';

import { clearCache } from 'ahooks';

import { useGetPinedPost } from '@components/Home/service';
import NewsFeed from '@components/Post/NewsFeed';
import { IPost } from '@components/Post/service';
import { ViewTickerInfo } from '@utils/dataLayer';

// tracking event view ticker info
const handleTrackingViewTicker = (stockCode: string) => {
  ViewTickerInfo(stockCode, 'Home screen', 'Pin post', 'Stock');
};
interface IProps {
  onTrackingViewTickerCmt: any;
}
const PinPost = (props: IProps) => {
  const { onTrackingViewTickerCmt } = props;
  const { pinedPost, refresh, loading } = useGetPinedPost();

  const onRefresh = () => {
    clearCache('data-pin-post');
    refresh();
  };

  return (
    <>
      {pinedPost?.map((item: IPost) => {
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
