import React from 'react';

import Text from '@components/UI/Text';

const StockItem = () => {
  return (
    <div className='flex items-center rounded-[12px] bg-[#F7F6F8] px-[12px] py-[16px]'>
      <img
        src='https://picsum.photos/200/100'
        alt='Company logo'
        className='block h-[36px] w-[36px] rounded-full bg-white object-cover'
      />

      <div className='ml-[10px]'>
        <div className='flex items-center'>
          <Text type='body-16-semibold' className='text-[#0D0D0D]'>
            VNM
          </Text>

          <div className='ml-[8px] flex h-[22px] items-center justify-center rounded-[4px] border border-solid border-[#ccc] bg-white px-[12px]'>
            <Text type='body-12-regular' className='text-[#808A9D]'>
              HOSE
            </Text>
          </div>
        </div>

        <Text type='body-12-regular' className='mt-[8px] text-[#808A9D]'>
          Cap: 196,036.28
        </Text>
      </div>

      <div className='ml-auto text-right text-[#DA314F]'>
        <Text type='body-16-medium'>43.95</Text>
        <Text type='body-12-regular' className='mt-[8px]'>
          -0.45 / -1.02%
        </Text>
      </div>
    </div>
  );
};

export default StockItem;
