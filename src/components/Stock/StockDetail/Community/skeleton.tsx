import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const StockCommunitySkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold'>{t('community')}</Text>
      <Text type='body-14-regular' className='mt-[16px] galaxy-max:text-[12px]'>
        {t('community_description')}
      </Text>

      <div className='mb-[8px] mt-[16px] flex items-center justify-between tablet:justify-start'>
        <Skeleton
          rows={4}
          wrapClassName='!flex-row !gap-x-[10px] mr-[16px]'
          width={40}
          height={40}
          avatar
        />

        <Skeleton round height={34} />
      </div>
    </div>
  );
};

export default StockCommunitySkeleton;
