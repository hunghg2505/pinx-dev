/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const StockCalendarSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold' className='mb-[16px]'>
        {t('financial_calendar_title')}
      </Text>

      <Text type='body-14-regular' className='mb-[12px] galaxy-max:text-[12px]'>
        {t('financial_calendar_desc')}
      </Text>

      <div className='grid grid-cols-1 gap-x-[15px] gap-y-[12px] tablet:grid-cols-2'>
        {[...new Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            height={89}
            wrapClassName='w-full'
            className='!w-full !rounded-[8px]'
          />
        ))}
      </div>
    </div>
  );
};

export default StockCalendarSkeleton;
