import React from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';

import HeadingNewsItem from './Heading';

interface INewsItemProps {
  className?: string;
}

const NewsItem = ({ className }: INewsItemProps) => {
  return (
    <div
      className={classNames(
        'border-b border-solid border-[var(--neutral-7)] px-[16px] py-[12px] tablet:px-[24px] tablet:pt-[12px]',
        className,
      )}
    >
      <HeadingNewsItem className='tablet:hidden' />

      <div className='flex gap-x-[40px] py-[12px] tablet:items-center'>
        <div className='flex-1'>
          <HeadingNewsItem className='hidden tablet:mb-[4px] tablet:flex' />
          <Text type='body-14-semibold' className='flex-1'>
            Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
          </Text>
        </div>

        <div className='relative'>
          <img
            src='https://picsum.photos/300/500'
            alt='News thumbnail'
            className='h-[73px] w-[73px] rounded-[12px] object-cover'
          />

          <div className='absolute left-1/2 top-1/2 flex h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.45)]'>
            <img
              src='/static/icons/iconLink.svg'
              alt='Icon link'
              className='h-[14px] w-[14px] object-contain'
            />
          </div>
        </div>
      </div>

      <div className='flex justify-between tablet:justify-start tablet:gap-x-[27px]'>
        <div className='flex items-center'>
          <img
            src='/static/icons/iconLike.svg'
            alt='Icon like'
            className='h-[14px] w-[16px] object-contain'
          />
          <Text type='body-12-regular' color='primary-1' className='ml-[8px]'>
            31 Like
          </Text>
        </div>

        <div className='flex items-center'>
          <img
            src='/static/icons/iconComment.svg'
            alt='Icon like'
            className='h-[14px] w-[16px] object-contain'
          />
          <Text type='body-12-regular' color='primary-5' className='ml-[8px]'>
            0 Comment
          </Text>
        </div>

        <div className='flex items-center'>
          <img
            src='/static/icons/iconShare.svg'
            alt='Icon like'
            className='h-[14px] w-[16px] object-contain'
          />
          <Text type='body-12-regular' color='primary-5' className='ml-[8px]'>
            0 Share
          </Text>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
