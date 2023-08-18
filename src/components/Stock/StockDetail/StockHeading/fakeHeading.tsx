import React from 'react';

import Text from '@components/UI/Text';

const FakeStockHeading = () => {
  return (
    <div className='mt-[12px] flex items-center justify-between'>
      <div className='flex flex-1 flex-col gap-y-[8px] tablet:flex-row tablet:gap-x-[12px]'>
        <div className='flex h-[44px] w-[44px] items-center rounded-[12px] border border-solid border-[#EEF5F9] bg-white px-[5px] shadow-[0_1px_2px_0_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
          <img loading='lazy' src='' alt='' className='block' />
        </div>
      </div>

      <div className='flex flex-col gap-y-[8px] tablet:flex-row tablet:gap-x-[24px]'>
        <div className='rounded-[4px] py-[6px] text-right'>
          <Text type='body-16-medium' className='p-[4px]'>
            -
          </Text>
          <Text type='body-12-regular' className='p-[4px]'>
            -/-%
          </Text>
        </div>
      </div>
    </div>
  );
};

export default FakeStockHeading;
