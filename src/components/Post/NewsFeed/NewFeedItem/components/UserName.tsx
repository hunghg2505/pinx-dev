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
      ].includes(postDetail?.post?.postType)
    ) {
      return 'Pinetree';
    }
    if (
      [
        TYPEPOST.POST,
        TYPEPOST.ActivityTheme,
        TYPEPOST.ActivityWatchlist,
        TYPEPOST.ActivityMatchOrder,
      ].includes(postDetail?.post?.postType)
    ) {
      return postDetail?.post?.customerInfo?.displayName;
    }
    if (
      [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
        postDetail?.post?.postType,
      )
    ) {
      return 'Vietstock';
    }
    if ([TYPEPOST.CafeFNews].includes(postDetail?.post?.postType)) {
      return 'CafeF';
    }
    if ([TYPEPOST.TNCKNews].includes(postDetail?.post?.postType)) {
      return 'Tin nhanh chứng khoán';
    }
  }, []);

  return (
    <Text
      type='body-14-semibold'
      color='neutral-1'
      className='flex flex-1 items-center galaxy-max:text-[12px] tablet:text-[16px] overflow-hidden'
    >
      <span className='truncate'>{name}</span>

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
