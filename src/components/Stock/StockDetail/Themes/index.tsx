import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { useThemesOfStock } from '@components/Stock/service';
import Text from '@components/UI/Text';

import StockThemesSkeleton from './skeleton';
import styles from '../../index.module.scss';
import ThemeItem from '../ThemeItem';

interface IStockThemesProps {
  stockCode: string;
}

const StockThemes = ({ stockCode }: IStockThemesProps) => {
  const { t } = useTranslation(['stock', 'common']);

  const { stockThemes, loading: loadingTheme } = useThemesOfStock(stockCode);

  if (loadingTheme) {
    return <StockThemesSkeleton />;
  }

  if (!stockThemes || stockThemes.data.length === 0) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <div className='mb-[16px]'>
        <Text type='body-20-semibold'>{t('featured_in_themes')}</Text>
      </div>

      <div className={classNames('flex gap-x-[12px] overflow-x-auto', styles.noScrollbar)}>
        {stockThemes?.data.map((item, index) => (
          <ThemeItem key={index} data={item} />
        ))}
      </div>
    </div>
  );
};

export default StockThemes;
