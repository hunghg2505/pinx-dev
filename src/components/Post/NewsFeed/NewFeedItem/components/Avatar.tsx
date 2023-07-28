import { useMemo } from 'react';

import classNames from 'classnames';

import { TYPEPOST } from '@components/Post/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import { toNonAccentVietnamese } from '@utils/common';

export const Avatar = ({ postDetail }: any) => {
  const name =
    postDetail?.post?.customerInfo?.displayName &&
    toNonAccentVietnamese(postDetail?.post?.customerInfo?.displayName)?.charAt(0)?.toUpperCase();

  const url = useMemo(() => {
    if (
      [
        TYPEPOST.PinetreeDailyNews,
        TYPEPOST.PinetreeMarketBrief,
        TYPEPOST.PinetreeMorningBrief,
        TYPEPOST.PinetreePost,
        TYPEPOST.PinetreeWeeklyNews,
      ].includes(postDetail?.post.postType)
    ) {
      return '/static/logo/logoPintree.png';
    }

    if ([TYPEPOST.TNCKNews].includes(postDetail?.post?.postType)) {
      return 'https://static.pinetree.com.vn/upload/vendor_tnck_logo.png';
    }

    if (
      [
        TYPEPOST.POST,
        TYPEPOST.ActivityTheme,
        TYPEPOST.ActivityWatchlist,
        TYPEPOST.ActivityMatchOrder,
      ].includes(postDetail?.post.postType)
    ) {
      return postDetail?.post?.customerInfo?.avatar;
    }
    if (
      [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
        postDetail?.post.postType,
      )
    ) {
      return 'https://static.pinetree.com.vn/upload/vendor_vietstock_logo.png';
    }
    if ([TYPEPOST.CafeFNews].includes(postDetail?.post.postType)) {
      return '/static/logo/cafef-logo.png';
    }
  }, [postDetail?.post.postType]);

  if (postDetail?.post?.customerInfo?.avatar === '') {
    return <AvatarDefault name={name} />;
  }

  return (
    <>
      <img
        src={url}
        alt='avatar'
        sizes='100vw'
        className={classNames(
          'mr-2 rounded-full border border-solid border-[#ebebeb] object-contain mobile:h-[44px] mobile:w-[44px] desktop:h-[56px] desktop:w-[56px]',
          {
            'object-cover': [
              TYPEPOST.POST,
              TYPEPOST.ActivityTheme,
              TYPEPOST.ActivityWatchlist,
              TYPEPOST.ActivityMatchOrder,
            ].includes(postDetail?.post.postType),
          },
        )}
      />
    </>
  );
};
