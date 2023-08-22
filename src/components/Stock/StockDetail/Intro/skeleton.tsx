import React from 'react';

import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

const IntroSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold' className='mb-[16px]'>
        {t('intro')}
      </Text>
      <Skeleton rows={4} height={15} className='!w-full' />
    </div>
  );
};

export default IntroSkeleton;
