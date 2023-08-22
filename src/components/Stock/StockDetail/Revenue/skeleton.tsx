/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const StockRevenueSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold' className='mb-[16px]'>
        {t('revenue_sources')}
      </Text>

      <div className='tablet:flex tablet:items-center tablet:justify-between tablet:gap-x-[63px]'>
        <div className='flex flex-col items-center'>
          <div className='galaxy-max:scale-[0.7]'>
            <Skeleton width={319} round height={319} />
          </div>

          <Skeleton className='mt-[28px]' round />
        </div>

        <div className='tablet:flex-1'>
          <div className='mt-[8px]'>
            {[...new Array(6)].map((_, index) => (
              <div
                key={index}
                className='flex items-center border-solid border-[var(--neutral-7)] py-[16px] [&:not(:last-child)]:border-b'
              >
                <Skeleton avatar width={20} height={20} />

                <Skeleton height={15} className='!w-full' wrapClassName='!w-full mx-[10px]' round />

                <Skeleton height={15} round width={80} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockRevenueSkeleton;
