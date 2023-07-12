import React from 'react';

import Text from '@components/UI/Text';

interface HoldingRatioItemProps {
  label: string;
  value: string;
}

const HoldingRatioItem = ({ label, value }: HoldingRatioItemProps) => {
  return (
    <div className='flex items-center justify-between gap-x-[52px] px-[20px] py-[16px] [&:not(:last-child)]:[border-bottom:1px_solid_#E6E6E6]'>
      <Text type='body-14-regular' className='text-[#999999]'>
        {label}
      </Text>

      <Text type='body-16-medium' className='text-[#0D0D0D]'>
        {value}
      </Text>
    </div>
  );
};

export default HoldingRatioItem;
