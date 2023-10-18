import React, { memo } from 'react';

import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';

import PostAction from '@components/Post/NewsFeed/PostAction';
import { IPost } from '@components/Post/service';
import CustomLink from '@components/UI/CustomLink';
import IconLink from '@components/UI/Icon/IconPin';
import Text from '@components/UI/Text';
import { postThemeAtom } from '@store/postTheme/theme';
import { ROUTE_PATH } from '@utils/common';
import { clickAPostTracking } from 'src/mixpanel/mixpanel';

import HeadingNewsItem from './Heading';

interface INewsItemProps {
  className?: string;
  data: IPost;
}

const NewsItem = ({ className, data }: INewsItemProps) => {
  const router = useRouter();

  const bgTheme = useAtomValue(postThemeAtom);

  const { hashtags, ticker, link, themeName, postType } = React.useMemo(() => {
    const hashtags = data?.post?.hashtags || [];
    const ticker = data?.post?.tagStocks;
    const link = data?.post?.urlLinks || [];
    const themeActive = bgTheme?.find((item) => item.id === data?.post?.postThemeId);
    const themeName = themeActive?.name || '';
    const postType = data?.post?.postType;

    return {
      hashtags,
      ticker,
      link,
      themeName,
      postType,
    };
  }, [data]);

  const goToPostDetail = () => {
    clickAPostTracking(
      data?.id,
      postType,
      hashtags,
      ticker,
      link,
      themeName,
      'Stock detail screen',
    );
    router.push(ROUTE_PATH.HOME + data.seoMetadata.slug);
  };

  const renderThumbnail = () => {
    return data.post.headImageUrl ? (
      <CustomLink href={data.post.url} target='_blank'>
        <div className='relative cursor-pointer'>
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={data.post.headImageUrl}
            alt={data.post.title}
            className='h-[73px] w-[73px] rounded-[12px] object-cover'
          />

          <div className='absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgba(255,255,255,0.45)]'>
            <img
              src='/static/icons/iconLink.svg'
              alt='Icon link'
              className='h-[14px] w-[14px] object-contain'
            />
          </div>
        </div>
      </CustomLink>
    ) : (
      <CustomLink href={data.post.url} target='_blank'>
        <div className='relative'>
          <div className='h-[73px] w-[73px] rounded-[12px] border border-solid border-[#ccc] bg-[#EFF2F5] object-cover'></div>

          <div className='absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full'>
            <IconLink />
          </div>
        </div>
      </CustomLink>
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
        urlPost={`/${data?.seoMetadata?.slug}`}
        isLike={data.isLike}
        totalLikes={data.totalLikes}
        totalComments={data.totalChildren}
        onNavigate={goToPostDetail}
        postDetail={data}
      />
    </div>
  );
};

export default memo(NewsItem);
