import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';

import styles from '../../index.module.scss';

const StockThemesSkeleton = () => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <div className='box-shadow card-style'>
      <div className='mb-[16px]'>
        <Text type='body-20-semibold'>{t('featured_in_themes')}</Text>
      </div>

      <div className={classNames('flex gap-x-[12px] overflow-x-auto', styles.noScrollbar)}>
        <Skeleton
          width={149}
          height={214}
          rows={10}
          wrapClassName='!flex-row gap-x-[12px]'
          className='!rounded-[12px]'
        />
      </div>
    </div>
  );
};

export default StockThemesSkeleton;
