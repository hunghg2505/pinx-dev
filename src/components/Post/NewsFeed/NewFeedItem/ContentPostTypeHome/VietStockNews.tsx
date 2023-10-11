import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import IconLink from '@components/UI/Icon/IconPin';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatMsgPost } from '@utils/common';
import { readNewsTracking } from 'src/mixpanel/mixpanel';

const ListStock = dynamic(import('./ListStock'), {
  ssr: false,
});

const ImageHeadPost = dynamic(
  import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ImgHeadPost'),
  {
    ssr: false,
    loading: () => (
      <Image
        width='0'
        height='0'
        sizes='100vw'
        src='/static/images/img-blur.png'
        alt=''
        className='absolute left-0 top-0 h-full w-full rounded-[9px] object-cover'
      />
    ),
  },
);

export const VietStockNews = ({
  onRef,
  isReadMore,
  onReadMore,
  readMore,
  postDetailUrl,
  postDetail,
  post_url,
  pinned,
  isPostDetailPath,
  onTrackingViewTicker,
}: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const calcLocation = () => {
    if (router.pathname.includes(ROUTE_PATH.POST_DETAIL_PATH)) {
      return 'Post Detail Screen';
    }
    if (router.pathname.includes(ROUTE_PATH.EXPLORE)) {
      return 'Explore Screen';
    }
    if (router.pathname.includes(ROUTE_PATH.PROFILE)) {
      return 'User Detail Screen';
    }
    return 'Home Screen';
  };

  const onTrackingReadNews = () => {
    const curPostData = postDetail?.post;
    readNewsTracking(
      curPostData.postType,
      curPostData.vendorInfo.name,
      curPostData.newsCategoryCode,
      curPostData.tagStocks,
      calcLocation(),
    );
  };

  const renderThumbnail = () => {
    if (!postDetail?.post?.headImageUrl) {
      return (
        <div
          className={'flex overflow-hidden rounded-[12px] border-[1px] border-solid border-[#CCC]'}
        >
          <CustomLink target='_blank' href={`${post_url}`} onClick={onTrackingReadNews}>
            <div className='flex h-[95px] w-[95px] items-center justify-center bg-[#EFF2F5] tablet:h-[100px] tablet:w-[100px]'>
              <div className='scale-[0.6]'>
                <IconLink />
              </div>
            </div>
          </CustomLink>

          <div className=' flex w-full flex-1 flex-col items-start justify-center gap-y-[10px] px-[8px] py-[8px] [border-left:1px_solid_#CCC] tablet:px-[12px]'>
            <CustomLink target='_blank' href={`${post_url}`} onClick={onTrackingReadNews}>
              <Text
                type='body-14-bold'
                color='cbblack'
                className='line-clamp-2 tablet:!text-[16px]'
              >
                {postDetail?.post?.title}
              </Text>
            </CustomLink>

            <div className='w-full max-w-[700px] overflow-hidden'>
              <ListStock
                onTrackingViewTicker={onTrackingViewTicker}
                listStock={postDetail?.post?.tagStocks}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={classNames(
          'relative flex h-[113px] w-full flex-col justify-end  rounded-[9px]',
          {
            'h-[250px] tablet:h-[360px] ': !!postDetail?.post?.headImageUrl,
            '!h-0': isPostDetailPath && !postDetail?.post?.headImageUrl,
          },
        )}
      >
        {postDetail?.post?.headImageUrl && (
          <CustomLink
            target='_blank'
            href={`${post_url}`}
            className='absolute left-0 top-0 z-[1] h-full  w-full'
            onClick={onTrackingReadNews}
          >
            <ImageHeadPost
              priority={pinned}
              alt={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.alt)}
              title={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.title)}
              headImageUrl={postDetail?.post?.headImageUrl}
            />
          </CustomLink>
        )}

        {!postDetail?.post?.headImageUrl && pinned && (
          <div className='absolute left-0 top-0 z-[1] h-full  w-full rounded-[9px] bg-neutral_07'></div>
        )}

        {!isPostDetailPath && (
          <CustomLink href={`${postDetailUrl}`} className='absolute bottom-0 left-0 z-[2]  w-full'>
            <div className='mb-[10px] w-full max-w-[700px] overflow-hidden pl-[8px]'>
              <ListStock
                onTrackingViewTicker={onTrackingViewTicker}
                listStock={postDetail?.post?.tagStocks}
              />
            </div>

            <div
              className={
                'relative top-[8px] z-[3] min-h-[44px] w-full rounded-[8px] bg-white px-[12px] [border:1px_solid_#EBEBEB] mobile:py-[10px] tablet:py-[16px]'
              }
            >
              <Text type='body-16-bold' color='cbblack' className='line-clamp-2'>
                {postDetail?.post?.title}
              </Text>
            </div>
          </CustomLink>
        )}

        <CustomLink
          target='_blank'
          href={`${post_url}`}
          className={classNames(
            'absolute z-[3] flex h-[36px] w-[36px] cursor-pointer flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]',
            {
              'right-[9px] top-[9px]': !isPostDetailPath,
              'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2': isPostDetailPath,
            },
          )}
          onClick={onTrackingReadNews}
        >
          <img src='/static/icons/iconLink.svg' alt='' className='h-[18px] w-[18px]' />
        </CustomLink>
      </div>
    );
  };

  return (
    <div className='VietStockNews'>
      <CustomLink href={postDetailUrl}>
        {(postDetail?.post.head || postDetail?.post?.contentText) && (
          <div
            ref={onRef}
            className={classNames({
              // 'line-clamp-3': isPostDetailPath,
              'line-clamp-4 h-[85px] overflow-hidden': !isPostDetailPath && isReadMore && !readMore,
              'h-auto': (isReadMore && readMore) || isPostDetailPath,
            })}
          >
            <Text
              type='body-14-regular'
              color='neutral-1'
              className={classNames('mb-[16px] tablet:!text-[16px]')}
            >
              {postDetail?.post.head || postDetail?.post?.contentText}
            </Text>
          </div>
        )}
      </CustomLink>
      {isReadMore && !isPostDetailPath && (
        <Text
          type='body-14-regular'
          color='neutral-3'
          className='cursor-pointer'
          onClick={onReadMore}
        >
          {readMore ? t('see_less') : t('see_more')}
        </Text>
      )}

      {isPostDetailPath && (
        <div className='mb-[6px] text-right '>
          <CustomLink target='_blank' href={`${post_url}`} onClick={onTrackingReadNews}>
            <div
              className={classNames('inline-flex items-center', {
                'mb-[8px]': !!postDetail?.post?.headImageUrl,
              })}
            >
              <Text type='body-14-regular' color='primary-1'>
                {t('see_more')}
              </Text>

              <img
                src='/static/icons/chevronRightPrimaryLight.svg'
                alt='Icon chevron right'
                className='h-[20px] w-[20px] object-contain'
              />
            </div>
          </CustomLink>
        </div>
      )}

      {renderThumbnail()}
    </div>
  );
};
