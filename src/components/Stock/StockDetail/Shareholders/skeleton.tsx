/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const StockShareholdersSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-bold'>{t('shareholders_title')}</Text>

      <div className='mt-[28px] flex flex-col-reverse justify-between gap-x-[12px] gap-y-[28px] tablet:flex-row tablet:items-center'>
        <div className='grid flex-1 grid-cols-1 gap-x-[12px] gap-y-[24px] self-start tablet:grid-cols-2 tablet:self-center'>
          {[...new Array(6)].map((_, index) => (
            <div className='self-start' key={index}>
              <Skeleton height={15} round width={80} />
              <Skeleton height={15} width={130} wrapClassName='mt-[8px]' round />
            </div>
          ))}
        </div>

        <div className='mx-auto'>
          <Skeleton width={183} height={183} round />
        </div>
      </div>
    </div>
  );
};

export default StockShareholdersSkeleton;
