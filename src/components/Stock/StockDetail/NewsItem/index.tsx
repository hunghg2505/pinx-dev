import React, { memo } from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import PostAction from '@components/Post/NewsFeed/PostAction';
import { IPost } from '@components/Post/service';
import IconLink from '@components/UI/Icon/IconPin';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import HeadingNewsItem from './Heading';

interface INewsItemProps {
  className?: string;
  data: IPost;
}

const NewsItem = ({ className, data }: INewsItemProps) => {
  const router = useRouter();

  const handleOpenLink = () => {
    router.push({
      pathname: ROUTE_PATH.REDIRECT,
      query: {
        url: data.post.url,
      },
    });
  };

  const goToPostDetail = () => {
    router.push(ROUTE_PATH.POST_DETAIL(data.id));
  };

  const renderThumbnail = () => {
    return data.post.headImageUrl ? (
      <div className='relative cursor-pointer'>
        <img
          src={data.post.headImageUrl}
          alt={data.post.title}
          className='h-[73px] w-[73px] rounded-[12px] object-cover'
          onClick={goToPostDetail}
        />

        <div
          onClick={handleOpenLink}
          className='absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(255,255,255,0.45)]'
        >
          <img
            src='/static/icons/iconLink.svg'
            alt='Icon link'
            className='h-[14px] w-[14px] object-contain'
          />
        </div>
      </div>
    ) : (
      <div className='relative'>
        <div className='h-[73px] w-[73px] rounded-[12px] border border-solid border-[#ccc] bg-[#EFF2F5] object-cover'></div>

        <div
          onClick={handleOpenLink}
          className='absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full'
        >
          <IconLink />
        </div>
      </div>
    );
  };

  return (
    <div
      className={classNames('border-b border-solid border-[var(--neutral-7)] pt-[12px]', className)}
    >
      <HeadingNewsItem data={data} className='tablet:hidden' />

      <div className='flex gap-x-[40px] py-[12px] galaxy-max:gap-[24px] tablet:items-center'>
        <div className='flex-1'>
          <HeadingNewsItem data={data} className='hidden tablet:mb-[4px] tablet:flex' />
          <Text
            type='body-14-semibold'
            className='flex-1 cursor-pointer galaxy-max:text-[12px]'
            onClick={goToPostDetail}
          >
            {data.post.title}
          </Text>
        </div>

        {renderThumbnail()}
      </div>

      <PostAction
        idPost={data.id}
        urlPost={'/post/' + data.id}
        isLike={data.isLike}
        totalLikes={data.totalLikes}
        totalComments={data.totalChildren}
        onNavigate={goToPostDetail}
      />
    </div>
  );
};

export default memo(NewsItem);
