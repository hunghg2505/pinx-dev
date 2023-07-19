import React from 'react';

import dayjs from 'dayjs';

import Rating from '@components/Stock/Rating';
import { IReview } from '@components/Stock/type';
import Text from '@components/UI/Text';

interface IReviewItemProps {
  data: IReview;
  isLatestReview?: boolean;
}

const ReviewItem = ({ data, isLatestReview }: IReviewItemProps) => {
  return (
    <div>
      <div className='mb-[4px] flex items-center'>
        <img
          src={data.customerInfo.avatar}
          alt='Reviewer avatar'
          className='h-[28px] w-[28px] rounded-full border border-[#EEF5F9] object-cover'
        />

        <Text type='body-14-semibold' className='ml-[12px] text-[#0D0D0D]'>
          {data.customerInfo.displayName}
        </Text>

        <Text type='body-12-regular' className='ml-auto text-[#999999]'>
          {isLatestReview ? 'LATEST REVIEW' : dayjs().format('DD/MM/YYYY')}
        </Text>
      </div>

      <div className='rounded-[12px] bg-[#F7F6F8] px-[16px] py-[12px]'>
        <div className='flex items-center justify-between'>
          <div className='px-[4px] py-[5px]'>
            <img
              src='/static/icons/iconQuotes.svg'
              alt='Icon quotes'
              className='h-[18px] w-[21px] object-contain'
            />
          </div>

          {/* star */}
          <Rating star={data.rateValue} disabled className='!h-[16px] !w-[16px]' />
        </div>

        <Text type='body-14-regular' className='mt-[12px] text-[#0D0D0D]'>
          {data.message}
        </Text>
      </div>
    </div>
  );
};

export default ReviewItem;
