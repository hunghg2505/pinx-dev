import React from 'react';

import Rating from '@components/Stock/Rating';
import Text from '@components/UI/Text';

const ReviewItem = () => {
  return (
    <div>
      <div className='mb-[4px] flex items-center'>
        <img
          src='https://picsum.photos/100/200'
          alt='Reviewer avatar'
          className='h-[28px] w-[28px] rounded-full border border-[#EEF5F9] object-cover'
        />

        <Text type='body-14-semibold' className='ml-[12px] text-[#0D0D0D]'>
          Robbin Klevar
        </Text>

        <Text type='body-12-regular' className='ml-auto text-[#999999]'>
          LATEST REVIEW
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
          <Rating star={45} disabled className='!h-[16px] !w-[16px]' />
        </div>

        <Text type='body-14-regular' className='mt-[12px] text-[#0D0D0D]'>
          Per conubia nostra, per inceptos no more himenaeos.
        </Text>
      </div>
    </div>
  );
};

export default ReviewItem;
