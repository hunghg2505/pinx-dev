import React from 'react';

import Text from '@components/UI/Text';

const StockItem = () => {
  return (
    <div className='flex items-center p-[12px]'>
      <img
        src='/static/images/mbs_logo.png'
        alt='Mbs logo'
        className='block h-[57px] w-[57px] object-contain'
      />

      <div className='ml-[10px]'>
        <div className='mb-[4px] flex items-center'>
          <Text type='body-16-semibold' className='text-[#0D0D0D]'>
            MBS
          </Text>

          <div className='ml-[4px] flex h-[20px] min-w-[36px] items-center justify-center rounded-[4px] bg-[#F7F6F8] px-[6px]'>
            <Text type='body-10-regular' className='text-[#999999]'>
              HNX
            </Text>
          </div>
        </div>
        <Text type='body-12-regular' className='text-[#999999]'>
          MB Securities JSC
        </Text>
      </div>

      <div className='ml-auto flex items-center'>
        <Text type='body-16-semibold' className='text-[#0D0D0D]'>
          43.95%
        </Text>

        <div className='px-[7px]'>
          <img
            src='/static/icons/iconBlackRight.svg'
            alt='Chevron right icon'
            className='h-[9px] w-[5px] object-contain'
          />
        </div>
      </div>
    </div>
  );
};

export default StockItem;
