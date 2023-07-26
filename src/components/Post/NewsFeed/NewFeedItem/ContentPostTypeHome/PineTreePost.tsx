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
        className='absolute left-0 top-0 h-full w-full rounded-bl-none rounded-br-none rounded-tl-[9px] rounded-tr-[9px] object-cover'
      />
    ),
  },
);

export const PineTreePost = ({
  onRef,
  isReadMore,
  onReadMore,
  readMore,
  postDetailUrl,
  postDetail,
  post_url,
}: any) => {
  const { t } = useTranslation();

  return (
    <>
      <div ref={onRef} className='PineTreePost'>
        <Text
          type='body-14-regular'
          color='neutral-1'
          className={classNames('mb-[16px] tablet:!text-[16px]', {
            'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
            'h-auto': isReadMore && readMore,
          })}
        >
          {postDetail?.post.head}
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

      <div
        className={classNames(
          'relative flex h-[113px] w-full flex-col justify-end  rounded-[9px]',
          {
            'h-[250px] tablet:h-[360px] ': !!postDetail?.post?.headImageUrl,
          },
        )}
      >
        {postDetail?.post?.headImageUrl && (
          <CustomLink href={postDetailUrl} className='absolute left-0 top-0 z-[1]  h-full w-full'>
            <ImageHeadPost headImageUrl={postDetail?.post?.headImageUrl} />
          </CustomLink>
        )}

        <CustomLink href={postDetailUrl} className='absolute bottom-0 left-0 z-[2]  w-full'>
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

        <CustomLink
          href={`/redirecting?url=${post_url}`}
          className='absolute right-[9px] top-[9px] z-[3] flex h-[36px] w-[36px] cursor-pointer flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]'
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
