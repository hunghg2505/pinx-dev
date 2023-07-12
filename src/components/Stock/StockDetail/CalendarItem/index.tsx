import React from 'react';

import Text from '@components/UI/Text';

const CalendarItem = () => {
  return (
    <div className='flex cursor-pointer items-center rounded-[8px] bg-[#F7F6F8] p-[8px]'>
      <div className='flex h-[73px] w-[68px] flex-col rounded-[8px] shadow-[0px_1px_2px_0px_#0000001F]'>
        <div className='flex h-[21px] items-center justify-center rounded-tl-[8px] rounded-tr-[8px] bg-[var(--primary-2)]'>
          <Text type='body-14-medium' color='cbwhite'>
            May
          </Text>
        </div>

        <div className='flex-1 rounded-bl-[8px] rounded-br-[8px] bg-white text-center'>
          <Text type='body-24-bold' color='primary-5'>
            1
          </Text>
          <Text type='body-14-medium' className='text-[#999999]'>
            2023
          </Text>
        </div>
      </div>

      <div className='ml-[16px] flex-1'>
        <Text type='body-16-semibold' className='!leading-[21px] text-[#0D0D0D]'>
          Earnings stock data company Q2 2021
        </Text>

        <Text type='body-12-regular' className='mt-[4px] text-[#474D57]'>
          HPG
        </Text>
      </div>
    </div>
  );
};

export default CalendarItem;
