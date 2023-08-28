/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const StockAlsoOwnSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='card-style box-shadow mb-[28px]'>
      <Text type='body-20-semibold' className='mb-[8px]'>
        {t('also_own')}
      </Text>

      <div className='flex flex-col gap-y-[12px]'>
        {[...new Array(2)].map((_, index) => (
          <div key={index} className='flex items-center'>
            <Skeleton width={81} height={81} />

            <div className='mx-[10px] flex flex-col gap-y-[12px]'>
              <Skeleton round width={50} />
              <Skeleton round width={100} />
            </div>

            <Skeleton round width={50} wrapClassName='ml-auto' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockAlsoOwnSkeleton;
