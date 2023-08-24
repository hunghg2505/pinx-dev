import React from 'react';

import { useTranslation } from 'next-i18next';

import { useFinancialIndex } from '@components/Stock/service';
import { FinancialIndexKey, IFinancialIndex } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

import StockFinancialIndexSkeleton from './skeleton';
import HoldingRatioItem from '../HoldingRatioItem';

interface IStockFinancialIndexProps {
  stockCode: string;
}

const StockFinancialIndex = ({ stockCode }: IStockFinancialIndexProps) => {
  const { t } = useTranslation(['stock', 'common']);

  const { financialIndex, loading } = useFinancialIndex(stockCode);

  const manualTranslate = (value: string) => {
    switch (value) {
      case FinancialIndexKey.marketCap: {
        return t('financial_index.market_cap');
      }
      case FinancialIndexKey.volume: {
        return t('financial_index.volume');
      }
      case FinancialIndexKey.pe: {
        return t('financial_index.p/e');
      }
      case FinancialIndexKey.roe: {
        return t('financial_index.roe');
      }
      default: {
        return '';
      }
    }
  };

  const convertFinancialIndexData = (data?: IFinancialIndex) => {
    if (data) {
      const onlyKeys = new Set([
        FinancialIndexKey.marketCap,
        FinancialIndexKey.volume,
        FinancialIndexKey.pe,
        FinancialIndexKey.roe,
      ]);

      const arr = Object.keys(data);
      arr.push(arr.splice(arr.indexOf(FinancialIndexKey.roe), 1)[0]);

      return arr
        .filter((item) => onlyKeys.has(item))
        .map((item) => ({
          label: manualTranslate(item),
          value: formatStringToNumber(data[item as keyof IFinancialIndex] || 0).toString(),
        }));
    }

    return [];
  };

  if (loading) {
    return <StockFinancialIndexSkeleton />;
  }

  if (!financialIndex?.data) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold'>{t('financial_index_title')}</Text>

      <div className='mt-[16px] rounded-[12px] bg-[#F7F6F8]'>
        {convertFinancialIndexData(financialIndex?.data).map((item, index) => (
          <HoldingRatioItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
};

export default StockFinancialIndex;
