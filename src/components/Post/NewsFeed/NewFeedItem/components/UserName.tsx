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
    <Text
      type='body-14-semibold'
      color='neutral-1'
      className='flex w-[5em] flex-1 items-center truncate tablet:text-[16px]'
    >
      <span className='max-w-[160px]'>{name}</span>

      {postDetail?.post?.customerInfo?.isKol && (
        <img
          src='/static/icons/iconTick.svg'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='ml-[4px] h-[16px] w-[16px] object-contain'
        />
      )}

      {postDetail?.post?.customerInfo?.isFeatureProfile && (
        <img
          src='/static/icons/iconKol.svg'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='ml-[4px] h-[16px] w-[16px] object-contain'
        />
      )}
    </Text>
  );
};
