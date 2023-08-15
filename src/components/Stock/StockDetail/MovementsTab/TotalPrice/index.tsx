import React, { useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

import styles from '../index.module.scss';

interface ITotalPriceProps {
  stockData?: IStockData;
  preDataStock?: IStockData;
}

const TotalPrice = ({ stockData, preDataStock }: ITotalPriceProps) => {
  const {
    isLastPriceGreaterThanRefPrice,
    isRefPriceGreaterThanLastPrice,
    isLastPriceEqualRefPrice,
    isTotalVolChange,
    isTotalValChange,
    isFbVolChange,
    isFRoomChange,
    isFsVolumeChange,
  } = useMemo(() => {
    const isLastPriceGreaterThanRefPrice =
      stockData?.lastPrice && stockData.r && stockData.lastPrice > stockData.r;

    const isRefPriceGreaterThanLastPrice =
      stockData?.lastPrice && stockData.r && stockData.lastPrice < stockData.r;

    const isLastPriceEqualRefPrice =
      stockData?.lastPrice && stockData.r && stockData.lastPrice === stockData.r;

    const isTotalVolChange =
      stockData?.lot && preDataStock?.lot && stockData?.lot !== preDataStock?.lot;

    const totalVal = (stockData?.lot || 0) * Number(stockData?.avePrice);
    const preTotalVal = (preDataStock?.lot || 0) * Number(preDataStock?.avePrice);
    const isTotalValChange = stockData?.lot && preDataStock?.lot && totalVal !== preTotalVal;

    const isFbVolChange =
      stockData?.fBVol &&
      preDataStock?.fBVol &&
      stockData?.fBVol !== preDataStock?.fBVol &&
      stockData?.fBVol > preDataStock?.fBVol;

    const isFRoomChange =
      stockData?.fRoom &&
      preDataStock?.fRoom &&
      stockData?.fRoom !== preDataStock?.fRoom &&
      stockData?.fRoom > preDataStock?.fRoom;

    const isFsVolumeChange =
      stockData?.fSVolume &&
      preDataStock?.fSVolume &&
      stockData?.fSVolume !== preDataStock?.fSVolume &&
      stockData?.fSVolume > preDataStock?.fSVolume;

    return {
      isLastPriceGreaterThanRefPrice,
      isRefPriceGreaterThanLastPrice,
      isLastPriceEqualRefPrice,
      isTotalVolChange,
      isTotalValChange,
      isFbVolChange,
      isFRoomChange,
      isFsVolumeChange,
    };
  }, [stockData, preDataStock]);

  const { t } = useTranslation(['stock', 'common']);
  return (
    <div className='flex flex-wrap'>
      <div className='w-1/2 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_vol')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
            [styles.isDecrease]: isTotalVolChange && isRefPriceGreaterThanLastPrice,
            [styles.isIncrease]: isTotalVolChange && isLastPriceGreaterThanRefPrice,
            [styles.isInEqual]: isTotalVolChange && isLastPriceEqualRefPrice,
          })}
          type='body-12-regular'
        >
          {formatStringToNumber((Number(stockData?.lot || 0) * 10).toString())}
        </Text>
      </div>

      <div className='w-1/2 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_val')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
            [styles.isDecrease]: isTotalValChange && isRefPriceGreaterThanLastPrice,
            [styles.isIncrease]: isTotalValChange && isLastPriceGreaterThanRefPrice,
            [styles.isInEqual]: isTotalValChange && isLastPriceEqualRefPrice,
          })}
          type='body-12-regular'
        >
          {formatStringToNumber(
            (Number(stockData?.lot) * Number(stockData?.avePrice) * 10_000).toString(),
          )}
        </Text>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.foreign_buy')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
            [styles.isDecrease]: isFbVolChange && isRefPriceGreaterThanLastPrice,
            [styles.isIncrease]: isFbVolChange && isLastPriceGreaterThanRefPrice,
            [styles.isInEqual]: isFbVolChange && isLastPriceEqualRefPrice,
          })}
          type='body-12-regular'
        >
          {formatStringToNumber(((Number(stockData?.fBVol) || 0) * 10).toString())}
        </Text>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_room')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
            [styles.isDecrease]: isFRoomChange && isRefPriceGreaterThanLastPrice,
            [styles.isIncrease]: isFRoomChange && isLastPriceGreaterThanRefPrice,
            [styles.isInEqual]: isFRoomChange && isLastPriceEqualRefPrice,
          })}
          type='body-12-regular'
        >
          {formatStringToNumber(((Number(stockData?.fRoom) || 0) * 10).toString())}
        </Text>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.foreign_sell')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
            [styles.isDecrease]: isFsVolumeChange && isRefPriceGreaterThanLastPrice,
            [styles.isIncrease]: isFsVolumeChange && isLastPriceGreaterThanRefPrice,
            [styles.isInEqual]: isFsVolumeChange && isLastPriceEqualRefPrice,
          })}
          type='body-12-regular'
        >
          {formatStringToNumber(((Number(stockData?.fSVolume) || 0) * 10).toString())}
        </Text>
      </div>
    </div>
  );
};

export default TotalPrice;
