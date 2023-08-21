/* eslint-disable unicorn/no-useless-spread */
import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const StockNewsSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='box-shadow card-style'>
      <div className='mb-[4px]'>
        <Text type='body-20-semibold'>{t('recent_news')}</Text>
      </div>

      <div>
        {[...new Array(3)].map((_, index) => (
          <div
            key={index}
            className='flex items-center gap-x-[12px] border-solid border-[#EBEBEB] py-[12px] [&:not(:last-child)]:border-b'
          >
            <div className='flex-1'>
              <div className='mb-[12px] flex items-center gap-x-[8px]'>
                <Skeleton width={24} height={24} round />
                <Skeleton round height={12} />
              </div>

              <Skeleton height={12} rows={2} className='!w-full' wrapClassName='w-full' />
            </div>

            <Skeleton width={73} height={73} className='!rounded-[12px]' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockNewsSkeleton;
