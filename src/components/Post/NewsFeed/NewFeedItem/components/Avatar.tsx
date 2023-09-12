import { useMemo } from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import { TYPEPOST } from '@components/Post/service';
import AvatarDefault from '@components/UI/AvatarDefault';
import { isUrlValid, replaceImageError, toNonAccentVietnamese } from '@utils/common';

export const Avatar = ({ postDetail, isNewFeedExplore }: any) => {
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
      ].includes(postDetail?.post?.postType)
    ) {
      return postDetail?.post?.vendorInfo?.logo || '/static/logo/logoPintree.png';
    }

    if ([TYPEPOST.TNCKNews].includes(postDetail?.post?.postType)) {
      return (
        postDetail?.post?.vendorInfo?.logo ||
        'https://static.pinetree.com.vn/upload/vendor_tnck_logo.png'
      );
    }

    if (
      [
        TYPEPOST.POST,
        TYPEPOST.ActivityTheme,
        TYPEPOST.ActivityWatchlist,
        TYPEPOST.ActivityMatchOrder,
      ].includes(postDetail?.post?.postType)
    ) {
      return postDetail?.post?.customerInfo?.avatar;
    }
    if (
      [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
        postDetail?.post?.postType,
      )
    ) {
      return (
        postDetail?.post?.vendorInfo?.logo ||
        'https://static.pinetree.com.vn/upload/vendor_vietstock_logo.png'
      );
    }
    if ([TYPEPOST.CafeFNews].includes(postDetail?.post?.postType)) {
      return postDetail?.post?.vendorInfo?.logo || '/static/logo/cafef-logo.png';
    }
  }, [postDetail?.post?.postType]);

  if (
    postDetail?.post?.postType === TYPEPOST.POST &&
    !isUrlValid(postDetail?.post?.customerInfo?.avatar)
  ) {
    return (
      <div className='mr-2 object-contain mobile:h-[44px] mobile:w-[44px] desktop:h-[56px] desktop:w-[56px]'>
        <AvatarDefault name={name} />
      </div>
    );
  }

  return (
    <>
      <Image
        width='0'
        height='0'
        src={url}
        alt='avatar'
        sizes='100vw'
        onError={replaceImageError}
        className={classNames(
          'mr-2 rounded-full border border-solid border-[#ebebeb] object-contain mobile:h-[44px] mobile:w-[44px]  desktop:h-[56px] desktop:w-[56px]',
          {
            'object-cover': [
              TYPEPOST.POST,
              TYPEPOST.ActivityTheme,
              TYPEPOST.ActivityWatchlist,
              TYPEPOST.ActivityMatchOrder,
            ].includes(postDetail?.post?.postType),
          },
          {
            'galaxy-max:h-[36px] galaxy-max:w-[36px]': isNewFeedExplore,
          },
        )}
      />
    </>
  );
};
