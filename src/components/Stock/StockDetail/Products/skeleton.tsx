/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const StockProductSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='card-style box-shadow'>
      <div className='mb-[16px]'>
        <Text type='body-20-semibold'>{t('brand_awareness')}</Text>
      </div>

      <div className='flex gap-x-[14px] overflow-x-hidden'>
        {[...new Array(10)].map((_, index) => (
          <div key={index}>
            <Skeleton width={112} height={112} className='!rounded-[24px]' />
            <Skeleton className='mt-[12px] !w-full' round />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockProductSkeleton;
