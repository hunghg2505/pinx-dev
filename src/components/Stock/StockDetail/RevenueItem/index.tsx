import React from 'react';

import Text from '@components/UI/Text';

interface IRevenueItem {
  color: string;
  label: string;
  value: number;
}

const RevenueItem = ({ label, value, color }: IRevenueItem) => {
  return (
    <div className='flex items-center border-solid border-[var(--neutral-7)] py-[16px] [&:not(:last-child)]:border-b'>
      <div className='h-[20px] w-[20px] rounded-full' style={{ backgroundColor: color }}></div>
      <Text
        type='body-14-semibold'
        className='mx-[10px] flex-1 text-[#0D0D0D] galaxy-max:text-[12px]'
      >
        {label}
      </Text>

      <Text type='body-14-semibold' className='ml-auto self-start galaxy-max:text-[12px]'>
        {value}%
      </Text>
    </div>
  );
};

export default RevenueItem;
