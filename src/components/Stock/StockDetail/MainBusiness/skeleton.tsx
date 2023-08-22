/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const MainBusinessSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='card-style box-shadow'>
      <div className='mb-[4px]'>
        <Text type='body-20-semibold'>{t('main_business')}</Text>
      </div>

      <div>
        {[...new Array(3)].map((_, index) => (
          <div
            key={index}
            className='flex border-[var(--neutral-7)] py-[12px] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-solid'
          >
            <Skeleton width={24} height={24} />

            <Skeleton round wrapClassName='ml-[8px]' />

            <Skeleton width={20} height={20} wrapClassName='ml-auto' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainBusinessSkeleton;
