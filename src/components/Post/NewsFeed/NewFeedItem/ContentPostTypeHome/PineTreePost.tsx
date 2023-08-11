import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';

const ImageHeadPost = dynamic(
  import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ImgHeadPost'),
  {
    ssr: false,
    loading: () => (
      <img
        src='/static/images/img-blur.png'
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='absolute left-0 top-0 h-full w-full rounded-[9px] object-cover'
      />
    ),
  },
);

export const PineTreePost = ({
  onRef,
  isReadMore,
  onReadMore,
  readMore,
  // postDetailUrl,
  postDetail,
  post_url,
  isPostDetailPath,
}: any) => {
  const { t } = useTranslation();

  return (
    <>
      <div ref={onRef} className='PineTreePost'>
        <Text
          type='body-14-regular'
          color='neutral-1'
          className={classNames('mb-[16px] tablet:!text-[16px]', {
            'line-clamp-4 h-[85px] overflow-hidden': !isPostDetailPath && isReadMore && !readMore,
            // 'line-clamp-3': isPostDetailPath,
            'h-auto': (isReadMore && readMore) || isPostDetailPath,
          })}
        >
          {postDetail?.post.head}
        </Text>
      </div>
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
          <CustomLink href={`/redirecting?url=${post_url}`}>
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

      <div
        className={classNames(
          'relative flex h-[113px] w-full flex-col justify-end  rounded-[9px]',
          {
            'h-[250px] tablet:h-[360px] ': !!postDetail?.post?.headImageUrl,
            '!h-0': !postDetail?.post?.headImageUrl && isPostDetailPath,
          },
        )}
      >
        {postDetail?.post?.headImageUrl && (
          <CustomLink
            href={`/redirecting?url=${post_url}`}
            className='absolute left-0 top-0 z-[1]  h-full w-full'
          >
            <ImageHeadPost headImageUrl={postDetail?.post?.headImageUrl} />
          </CustomLink>
        )}

        {!postDetail?.post?.headImageUrl && (
          <div className='absolute left-0 top-0 z-[1] h-full  w-full rounded-[9px] bg-neutral_07'></div>
        )}

        {!isPostDetailPath && (
          <CustomLink
            href={`/redirecting?url=${post_url}`}
            className='absolute bottom-0 left-0 z-[2]  w-full'
          >
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
          href={`/redirecting?url=${post_url}`}
          className={classNames(
            'absolute z-[3] flex h-[36px] w-[36px] cursor-pointer flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]',
            {
              'right-[9px] top-[9px]': !isPostDetailPath,
              'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2': isPostDetailPath,
            },
          )}
        >
          <img
            src='/static/icons/iconLink.svg'
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='h-[18px] w-[18px]'
          />
        </CustomLink>
      </div>
    </>
  );
};
