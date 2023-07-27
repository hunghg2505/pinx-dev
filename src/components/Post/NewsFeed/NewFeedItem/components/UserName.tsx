/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo } from 'react';

import { TYPEPOST } from '@components/Post/service';
import Text from '@components/UI/Text';

export const UserName = ({ postDetail }: any) => {
  const name = useMemo(() => {
    if (
      [
        TYPEPOST.PinetreeDailyNews,
        TYPEPOST.PinetreeMarketBrief,
        TYPEPOST.PinetreeMorningBrief,
        TYPEPOST.PinetreePost,
        TYPEPOST.PinetreeWeeklyNews,
      ].includes(postDetail?.post.postType)
    ) {
      return 'Pinetree';
    }
    if (
      [
        TYPEPOST.POST,
        TYPEPOST.ActivityTheme,
        TYPEPOST.ActivityWatchlist,
        TYPEPOST.ActivityMatchOrder,
      ].includes(postDetail?.post.postType)
    ) {
      return postDetail?.post?.customerInfo?.displayName;
    }
    if (
      [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
        postDetail?.post.postType,
      )
    ) {
      return 'Vietstock';
    }
    if ([TYPEPOST.CafeFNews].includes(postDetail?.post.postType)) {
      return 'CafeF';
    }
    if ([TYPEPOST.TNCKNews].includes(postDetail?.post.postType)) {
      return 'Tin nhanh chứng khoán';
    }
  }, []);

  return (
    <Text type='body-14-semibold' color='neutral-1' className='tablet:text-[16px] truncate flex-1 w-[5em]'>
      {name}
    </Text>
  );
};
