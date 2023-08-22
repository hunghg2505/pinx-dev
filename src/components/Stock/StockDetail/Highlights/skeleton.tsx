/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const StockHighlightsSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='box-shadow card-style pb-[28px]'>
      <Text type='body-20-semibold' className='mb-[16px]'>
        {t('highlights')}
      </Text>

      <div className='flex flex-wrap gap-[12px]'>
        {[...new Array(12)].map((_, index) => (
          <Skeleton round wrapClassName='!inline-block' key={index} />
        ))}
      </div>
    </div>
  );
};

export default StockHighlightsSkeleton;
