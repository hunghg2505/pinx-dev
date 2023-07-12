import React from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';

interface INewsItemProps {
  className?: string;
}

const NewsItem = ({ className }: INewsItemProps) => {
  return (
    <div
      className={classNames(
        'border-b border-solid border-[var(--neutral-7)] px-[16px] py-[12px]',
        className,
      )}
    >
      <div className='flex items-center'>
        <img
          src='https://static.pinetree.com.vn/upload/vendor_vietstock_logo.png'
          alt='VietStock logo'
          className='h-[24px] w-[24px] object-contain'
        />
        <Text type='body-12-regular' className='ml-[8px]' color='primary-5'>
          Vietstock
        </Text>

        <Text type='body-12-regular' className='ml-auto text-[#999999]'>
          15 hours ago
        </Text>
      </div>

      <div className='flex gap-x-[40px] py-[12px]'>
        <Text type='body-14-semibold' className='flex-1'>
          Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
        </Text>

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

      <div className='flex justify-between'>
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
