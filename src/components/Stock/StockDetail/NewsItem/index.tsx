import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import PostAction from '@components/Post/NewsFeed/PostAction';
import { IPost } from '@components/Post/service';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

import HeadingNewsItem from './Heading';

interface INewsItemProps {
  className?: string;
  data: IPost;
  onRefreshNews: () => void;
}

const NewsItem = ({ className, data, onRefreshNews }: INewsItemProps) => {
  const router = useRouter();

  const urlPost = window.location.origin + '/post/' + data.id;

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

  return (
    <div
      className={classNames(
        'border-b border-solid border-[var(--neutral-7)] px-[16px] py-[12px] tablet:px-[24px] tablet:pt-[12px]',
        className,
      )}
    >
      <HeadingNewsItem
        isReport={data.isReport}
        onRefreshNews={onRefreshNews}
        data={data}
        className='tablet:hidden'
      />

      <div className='flex gap-x-[40px] py-[12px] tablet:items-center'>
        <div className='flex-1'>
          <HeadingNewsItem
            isReport={data.isReport}
            onRefreshNews={onRefreshNews}
            data={data}
            className='hidden tablet:mb-[4px] tablet:flex'
          />
          <Text type='body-14-semibold' className='flex-1 cursor-pointer' onClick={goToPostDetail}>
            {data.post.title}
          </Text>
        </div>

        <div className='relative cursor-pointer'>
          <img
            src={data.post.headImageUrl}
            alt={data.post.title}
            className='h-[73px] w-[73px] rounded-[12px] object-cover'
            onClick={goToPostDetail}
          />

          <div
            onClick={handleOpenLink}
            className='absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.45)]'
          >
            <img
              src='/static/icons/iconLink.svg'
              alt='Icon link'
              className='h-[14px] w-[14px] object-contain'
            />
          </div>
        </div>
      </div>

      <PostAction
        idPost={data.id}
        urlPost={urlPost}
        isLike={data.isLike}
        totalLikes={data.totalLikes}
        totalComments={data.totalChildren}
        // onRefreshPostDetail={onRefreshNews}
        onNavigate={goToPostDetail}
      />
    </div>
  );
};

export default NewsItem;
