import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { ROUTE_PATH, formatMsgPost } from '@utils/common';

export const ActivityWatchlist = ({
  onRef,
  isReadMore,
  onReadMore,
  readMore,
  postDetailUrl,
  postDetail,
  urlStock,
  onComment,
  messagePostFormat,
  onTrackingViewTicker,
}: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const userDetail = useAtomValue(userLoginInfoAtom);
  const [, setSearchSeo] = useAtom(searchSeoAtom);
  const onHandleClick = (e: any) => {
    const textContent = e?.target?.textContent;
    const classElement = e?.target?.className;
    const id = e?.target?.id;
    setSearchSeo(false);
    if (classElement === 'link') {
      // return router.push({
      //   pathname: '/redirecting',
      //   query: { url: textContent },
      // });
      return window.open(textContent);
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
  return (
    <div className='ActivityWatchlist'>
      <div className='cursor-pointer' onClick={(e: any) => onHandleClick(e)} ref={onRef}>
        <Text
          type='body-14-regular'
          color='neutral-1'
          className={classNames('mb-[16px] tablet:!text-[16px]', {
            'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
            'h-auto': isReadMore && readMore,
          })}
        >
          {/* {message} */}
          <div
            className='messageFormat messageBody'
            dangerouslySetInnerHTML={{ __html: messagePostFormat }}
          ></div>
        </Text>
      </div>
      {isReadMore && (
        <Text
          type='body-14-regular'
          color='neutral-3'
          className='cursor-pointer'
          onClick={onReadMore}
        >
          {readMore ? t('see_less') : t('see_more')}
        </Text>
      )}

      <CustomLink
        href={postDetailUrl}
        onClick={() => {
          setSearchSeo(false);
          onTrackingViewTicker && onTrackingViewTicker(postDetail?.post.stockCode);
        }}
      >
        <div className='relative w-full rounded-[10px] mobile:h-[204px] desktop:h-[309px]'>
          {postDetail?.post?.bgImage && (
            <Image
              width='0'
              height='0'
              sizes='100vw'
              src={postDetail?.post?.bgImage}
              alt={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.alt)}
              title={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.title)}
              className='absolute right-0 top-0 h-full object-cover'
            />
          )}

          <div className='absolute rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] mobile:bottom-[10px] mobile:left-[20px] mobile:h-[168px] mobile:w-[120px] desktop:bottom-[11px] desktop:left-[32px] desktop:h-[269px] desktop:w-[192px]'>
            <div className='absolute -top-[14px] left-2/4 mr-[6px] flex h-[36px] w-[36px] -translate-x-1/2 transform items-center justify-center overflow-hidden rounded-full bg-white object-contain tablet:-top-[24px] tablet:h-[48px] tablet:w-[48px]'>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                src={urlStock || '/static/icons/logoStock.svg'}
                alt=''
                className='block'
              />
            </div>
            <div className='mt-[26px] flex flex-col items-center justify-center tablet:mt-[36px]'>
              <Text
                type='body-16-bold'
                color='neutral-1'
                className='mb-[4px] desktop:!text-[24px] desktop:!leading-[32px]'
              >
                {postDetail?.post.stockCode}
              </Text>
              {postDetail?.post.action === 'ADD' ? (
                <img
                  src='/static/icons/iconHeartActive.svg'
                  alt=''
                  className='h-[24px] w-[24px] desktop:h-[32px] desktop:w-[32px]'
                />
              ) : (
                <img
                  src='/static/icons/iconHeart.svg'
                  alt=''
                  className='h-[24px] w-[24px] desktop:h-[32px] desktop:w-[32px]'
                />
              )}
              <Text
                type='body-12-medium'
                color='neutral-1'
                className='mt-[24px] desktop:mt-[36px] desktop:!text-[20px] desktop:!leading-[28px]'
              >
                {postDetail?.post.action === 'ADD' ? t('watching') : t('unwatch')}
              </Text>
              <Text
                type='body-12-medium'
                color='neutral-3'
                className='mb-[2px] mt-[12px] desktop:mt-[19px] desktop:!text-[20px] desktop:!leading-[28px]'
              >
                {t('made_on_pinex')}
              </Text>
              <Text
                type='body-12-medium'
                color='neutral-3'
                className='desktop:!text-[20px] desktop:!leading-[28px]'
              >
                {postDetail?.timeString && dayjs(postDetail?.timeString).format('DD/MM/YYYY')}
              </Text>
            </div>
          </div>
        </div>
      </CustomLink>
    </div>
  );
};
