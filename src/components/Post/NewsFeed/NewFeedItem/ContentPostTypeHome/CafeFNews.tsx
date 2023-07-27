import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';

const ListStock = dynamic(import('./ListStock'), {
  ssr: false,
});

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

export const CafeFNews = ({
  onRef,
  isReadMore,
  onReadMore,
  readMore,
  postDetailUrl,
  postDetail,
  post_url,
  pinned,
  isPostDetailPath,
}: any) => {
  const { t } = useTranslation();

  return (
    <div className='CafeFNews'>
      {postDetail?.post.head && (
        <div
          ref={onRef}
          className={classNames({
            'line-clamp-4 h-[85px] overflow-hidden': !isPostDetailPath && isReadMore && !readMore,
            'line-clamp-3': isPostDetailPath,
            'h-auto': isReadMore && readMore,
          })}
        >
          <Text
            type='body-14-regular'
            color='neutral-1'
            className={classNames('mb-[16px] tablet:!text-[16px]')}
          >
            {postDetail?.post.head}
          </Text>
        </div>
      )}

      {isReadMore && !isPostDetailPath && (
        <Text
          type='body-14-regular'
          color='neutral-3'
          className='w-[75px] cursor-pointer'
          onClick={onReadMore}
        >
          {readMore ? t('see_less') : t('see_more')}
        </Text>
      )}

      {isPostDetailPath && (
        <div className='text-right'>
          <CustomLink href={`/redirecting?url=${post_url}`}>
            <div className='my-[8px] inline-flex items-center'>
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
          },
        )}
      >
        {postDetail?.post?.headImageUrl && (
          <CustomLink href={postDetailUrl} className='absolute left-0 top-0 z-[1] h-full w-full'>
            <ImageHeadPost headImageUrl={postDetail?.post?.headImageUrl} />
          </CustomLink>
        )}
        {!postDetail?.post?.headImageUrl && pinned && (
          <div className='absolute left-0 top-0 z-[1] h-full  w-full rounded-[9px] bg-neutral_07'></div>
        )}

        {!isPostDetailPath && (
          <CustomLink href={postDetailUrl} className='absolute bottom-0 left-0 z-[2]  w-full'>
            <div className='mb-[10px] w-full overflow-hidden pl-[8px]'>
              <ListStock listStock={postDetail?.post?.tagStocks} />
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
    </div>
  );
};
