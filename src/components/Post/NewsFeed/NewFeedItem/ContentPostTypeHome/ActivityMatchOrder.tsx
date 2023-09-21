import React, { useLayoutEffect, useRef } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { ROUTE_PATH } from '@utils/common';

import useHeight from './useHeight';

export const ActivityMatchOrder = ({
  isReadMore,
  // onReadMore,
  postDetailUrl,
  postDetail,
  urlStock,
  onComment,
  messagePostFormat,
  pnlRate,
  onTrackingViewTicker,
}: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);
  const [readMore, setReadMore] = React.useState(false);
  const [showReadMore, setShowReadMore] = React.useState<boolean>(false);
  const userDetail = useAtomValue(userLoginInfoAtom);
  const [, setSearchSeo] = useAtom(searchSeoAtom);
  const onHandleClick = (e: any) => {
    const textContent = e?.target?.textContent;
    const classElement = e?.target?.className;
    const id = e?.target?.id;
    setSearchSeo(false);
    if (classElement === 'link') {
      return router.push({
        pathname: '/redirecting',
        query: { url: textContent },
      });
    }
    if (classElement === 'people') {
      const url =
        Number(userDetail?.id) === Number(id)
          ? ROUTE_PATH.MY_PROFILE
          : ROUTE_PATH.PROFILE_DETAIL(id);
      return router.push(url);
    }
    if (classElement === 'tagStock') {
      onTrackingViewTicker && onTrackingViewTicker(textContent);
      return router.push(ROUTE_PATH.STOCK_DETAIL(textContent));
    }
    if (classElement === 'hashtag') {
      const text = textContent.slice(1);
      return router.push(`${ROUTE_PATH.SEARCHSEO}?keyword=${text}`);
    }
    return onComment();
  };
  const onReadMore = () => {
    setReadMore(!readMore);
  };
  // React.useEffect(() => {
  //   const t = setTimeout(() => {
  //     const ele = document?.getElementById(`activityOrder-${postDetail.id}`);

  //     if (ele?.clientHeight) {
  //       if (window.innerWidth > 768) {
  //         setShowReadMore(ele?.clientHeight > 84);
  //       } else {
  //         setShowReadMore(ele?.clientHeight > 84);
  //       }
  //     }
  //     clearTimeout(t);
  //   }, 400);
  // }, []);

  const ref = useRef<HTMLDivElement>(null);
  const height = useHeight(ref);

  useLayoutEffect(() => {
    setShowReadMore(height > 84);
  }, [height]);

  return (
    <>
      <div
        className='ActivityMatchOrder cursor-pointer'
        onClick={(e: any) => onHandleClick(e)}
        id={`activityOrder-${postDetail.id}`}
      >
        <Text
          type='body-14-regular'
          color='neutral-1'
          className={classNames('mb-[16px] tablet:!text-[16px]', {
            'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
            'h-auto': isReadMore && readMore,
          })}
        >
          {/* {postDetail?.post?.message} */}
          <div
            ref={ref}
            className='messageFormat messageBody'
            dangerouslySetInnerHTML={{ __html: messagePostFormat }}
          ></div>
        </Text>
      </div>
      {!isPostDetailPath && (
        <Fade visible={showReadMore}>
          <Text
            type='body-14-regular'
            color='neutral-3'
            className='cursor-pointer'
            onClick={onReadMore}
          >
            {readMore ? t('see_less') : t('see_more')}
          </Text>
        </Fade>
      )}
      <CustomLink href={postDetailUrl}>
        <div className='relative w-full rounded-[10px] mobile:h-[204px] desktop:h-[309px]'>
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={postDetail?.post?.bgImage || '/static/images/postSellStock.png'}
            alt={postDetail?.seoMetadata?.imageSeo?.alt}
            title={postDetail?.seoMetadata?.imageSeo?.title}
            className='absolute right-0 top-0 h-full w-full rounded-[9px] object-cover'
          />
          <div className='absolute rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] mobile:bottom-[10px] mobile:left-[20px] mobile:h-[168px] mobile:w-[120px] desktop:bottom-[11px] desktop:left-[32px] desktop:h-[269px] desktop:w-[192px]'>
            <Image
              width='0'
              height='0'
              sizes='100vw'
              src={urlStock || '/static/icons/logoStock.svg'}
              alt={postDetail?.seoMetadata?.imageSeo?.alt}
              title={postDetail?.seoMetadata?.imageSeo?.title}
              className='absolute -top-[14px] left-2/4 mr-[6px] h-[36px] w-[36px] -translate-x-1/2 transform rounded-full object-contain desktop:-top-[24px] desktop:h-[48px] desktop:w-[48px]'
            />
            <div className='mt-[25px] flex flex-col items-center justify-center desktop:mt-[36px]'>
              <Text
                type='body-16-bold'
                color='neutral-1'
                className='desktop:!text-[24px] desktop:!leading-[32px]'
              >
                {postDetail?.post?.stockCode}
              </Text>
              <div className='flex h-[24px] w-[24px] flex-col items-center justify-center rounded-[10000px] bg-[#FFFFFF] desktop:my-[7px] desktop:h-[32px] desktop:w-[32px]'>
                <img
                  src='/static/icons/iconPostBuy.svg'
                  alt=''
                  className='w-[12px] desktop:w-[20px]'
                />
              </div>
              <Text
                type='body-12-medium'
                color='neutral-1'
                className={classNames(
                  'mb-[4px] mt-[4px] desktop:!text-[20px] desktop:!leading-[28px]',
                  { 'mt-[24px]': postDetail?.post?.type === 'BUY' },
                )}
              >
                {postDetail?.post?.type === 'BUY' ? t('bought') : t('sell')}
              </Text>
              {postDetail?.post?.type === 'SELL' && (
                <Text
                  type='body-16-medium'
                  className={classNames('desktop:!text-[24px] desktop:!leading-[32px]', {
                    'text-[#128F63]': pnlRate > 0,
                    'text-[#DB4444]': pnlRate < 0,
                  })}
                >
                  {pnlRate?.toFixed(2)}%
                </Text>
              )}

              <Text
                type='body-12-medium'
                color='neutral-3'
                className='mb-[2px] mt-[10px] desktop:mt-[24px] desktop:!text-[20px] desktop:!leading-[28px]'
              >
                {t('made_on_pinex')}
              </Text>
              <Text
                type='body-12-medium'
                color='neutral-3'
                className='desktop:!text-[20px] desktop:!leading-[28px]'
              >
                {dayjs(postDetail?.post?.tradingDate).format('DD/MM/YYYY')}
              </Text>
            </div>
          </div>
        </div>
      </CustomLink>
    </>
  );
};
