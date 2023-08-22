import React from 'react';

import { useTranslation } from 'next-i18next';

import { useHoldingRatio } from '@components/Stock/service';
import Text from '@components/UI/Text';

import StockHoldingRatioSkeleton from './skeleton';
import HoldingRatioItem from '../HoldingRatioItem';

interface IStockHoldingRatioProps {
  stockCode: string;
}

const StockHoldingRatio = ({ stockCode }: IStockHoldingRatioProps) => {
  const { t } = useTranslation(['stock', 'common']);

  const { holdingRatio, loading } = useHoldingRatio(stockCode);

  if (loading) {
    return <StockHoldingRatioSkeleton />;
  }

  if (!holdingRatio?.data || !holdingRatio?.data.length) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold'>{t('holding_ratio_title')}</Text>

      <div className='mt-[16px] rounded-[12px] bg-[#F7F6F8]'>
        {holdingRatio?.data.map((item, index) => (
          <HoldingRatioItem key={index} label={item.name} value={`${item.rate}%`} />
        ))}
      </div>
    </div>
  );
};

export default StockHoldingRatio;
