import React from 'react';

import Text from '@components/UI/Text';

interface IRevenueItem {
  label: string;
  value: number;
}

const RevenueItem = ({ label, value }: IRevenueItem) => {
  return (
    <div className='flex items-center border-b border-solid border-[var(--neutral-7)] py-[16px]'>
      <div className='h-[20px] w-[20px] rounded-full bg-[#08AADD]'></div>
      <Text type='body-14-semibold' className='ml-[10px] flex-1 text-[#0D0D0D]'>
        {label}
      </Text>

      <Text type='body-14-semibold' className='ml-auto'>
        {value}%
      </Text>
    </div>
  );
};

export default RevenueItem;