/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const StockHoldingRatioSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold'>{t('holding_ratio_title')}</Text>

      <div className='mt-[16px]'>
        {[...new Array(6)].map((_, index) => (
          <div
            className='flex items-center justify-between border-solid border-[#E6E6E6] py-[12px] [&:not(:last-child)]:border-b'
            key={index}
          >
            <Skeleton />
            <Skeleton width={50} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockHoldingRatioSkeleton;
