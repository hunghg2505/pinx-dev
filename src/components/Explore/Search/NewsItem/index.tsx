import React from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import PostAction from '@components/Post/NewsFeed/PostAction';
import CustomLink from '@components/UI/CustomLink';
import IconLink from '@components/UI/Icon/IconPin';
import Text from '@components/UI/Text';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
// import { ROUTE_PATH } from '@utils/common';
import { ROUTE_PATH } from '@utils/common';
import { readNewsTracking } from 'src/mixpanel/mixpanel';

const IconLink2 = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30' fill='none'>
    <rect width='30' height='30' rx='15' fill='white' fillOpacity='0.45' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M9.55556 9.55556V20.4444H20.4444V15H22V20.4444C22 21.3039 21.3039 22 20.4444 22H9.55556C8.69611 22 8 21.3039 8 20.4444V9.55556C8 8.69611 8.69611 8 9.55556 8H15V9.55556H9.55556ZM16.5564 9.55556V8H22.0009V13.4444H20.4453V10.6561L12.7998 18.3017L11.6992 17.2011L19.3448 9.55556H16.5564Z'
      fill='white'
    />
  </svg>
);

dayjs.extend(relativeTime);

const NewsItem = ({
  data,
  middle,
  showComment,
  isForceNavigate,
}: {
  data: any;
  middle?: boolean;
  showComment?: boolean;
  isForceNavigate?: boolean;
}) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [, setSearchSeo] = useAtom(searchSeoAtom);
  const onGoToDetail = () => {
    router.push(ROUTE_PATH.POST_DETAIL(data?.seoMetadata?.slug));
  };
  const url = data?.post?.url;
  const onTrackingReadNews = () => {
    const curPostData = data?.post;
    readNewsTracking(
      curPostData.postType,
      curPostData.vendorInfo.name,
      curPostData.category,
      curPostData.tagStocks,
      'Search Box',
    );
  };

  const renderThumbnail = () => {
    return data?.post?.thumbImageUrl ? (
      <div className='relative cursor-pointer' onClick={onTrackingReadNews}>
        <Image
          width='0'
          height='0'
          sizes='100vw'
          src={data?.post?.thumbImageUrl}
          alt=''
          className='h-[73px] w-[73px] rounded-[12px] object-cover'
        />
        <div className='absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 transform'>
          <IconLink2 />
        </div>
      </div>
    ) : (
      <div className='relative cursor-pointer' onClick={onTrackingReadNews}>
        <div className='h-[73px] w-[73px] rounded-[12px] border border-solid border-[#ccc] bg-[#EFF2F5] object-cover'></div>

        <div className='absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full'>
          <IconLink />
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={classNames('flex', {
          'items-center': middle,
        })}
      >
        <div
          className='mr-[16px] w-[calc(100%_-_73px)] cursor-pointer'
          onClick={() => {
            setSearchSeo(false);
            onGoToDetail();
          }}
        >
          <div className='flex items-center galaxy-max:gap-[4px]'>
            <img
              src={data?.post?.vendorInfo?.logo}
              alt=''
              className='mr-[8px] h-[24px] w-[24px] rounded-full object-contain galaxy-max:mr-0 galaxy-max:h-[20px] galaxy-max:w-[20px] '
            />
            <Text
              type='body-12-regular'
              color='primary-5'
              className='mr-[8px] galaxy-max:mr-0 galaxy-max:text-[10px]'
            >
              {data?.post?.vendorInfo?.name}
            </Text>
            <Text type='body-12-regular' className='galaxy-max:text-[8px]' color='neutral-gray'>
              {data?.timeString && dayjs(data?.timeString)?.locale(i18n.language)?.fromNow()}
            </Text>
          </div>
          <Text type='body-14-semibold' className='galaxy-max:text-[12px]' color='cbblack'>
            {data?.post?.title}
          </Text>
        </div>
        <CustomLink target='_blank' href={`${url}`}>
          {renderThumbnail()}
        </CustomLink>
      </div>
      {showComment && (
        <PostAction
          idPost={data.id}
          urlPost={ROUTE_PATH.POST_DETAIL(data?.seoMetadata?.slug)}
          isLike={data.isLike}
          totalLikes={data.totalLikes}
          totalComments={data.totalChildren}
          onNavigate={() => {
            onGoToDetail();
            setSearchSeo(false);
          }}
          isForceNavigate={isForceNavigate}
          postDetail={data}
        />
      )}
    </>
  );
};
export default NewsItem;
