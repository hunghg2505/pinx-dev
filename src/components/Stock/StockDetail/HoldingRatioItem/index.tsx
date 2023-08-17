import React from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';

interface HoldingRatioItemProps {
  label: string;
  value: string;
  className?: string;
}

const HoldingRatioItem = ({ label, value, className }: HoldingRatioItemProps) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-between gap-x-[12px] px-[20px] py-[16px]  [&:not(:last-child)]:[border-bottom:1px_solid_#E6E6E6]',
        className,
      )}
    >
      <Text type='body-14-regular' className='uppercase text-[#999999] galaxy-max:text-[12px]'>
        {label}
      </Text>

      <Text type='body-16-medium' className='text-[#0D0D0D] galaxy-max:text-[14px]'>
        {value}
      </Text>
    </div>
  );
};

export default HoldingRatioItem;
