import React, { memo, useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import useToggleClassStock from '@hooks/useToggleClassStock';
import { formatStringToNumber } from '@utils/common';

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
      <div className='w-1/2 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center small-mobile-max:w-full tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_vol')}
        </Text>
        <Text
          className={classNames(
            'mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]',
            useToggleClassStock(
              !!(isTotalVolChange && isLastPriceGreaterThanRefPrice),
              !!(isTotalVolChange && isRefPriceGreaterThanLastPrice),
              !!(isTotalVolChange && isLastPriceEqualRefPrice),
              stockData,
            ),
          )}
          type='body-12-regular'
        >
          {formatStringToNumber((Number(stockData?.lot || 0) * 10).toString())}
        </Text>
      </div>

      <div className='w-1/2 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center small-mobile-max:w-full tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_val')}
        </Text>
        <Text
          className={classNames(
            'mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]',
            useToggleClassStock(
              !!(isTotalValChange && isLastPriceGreaterThanRefPrice),
              !!(isTotalValChange && isRefPriceGreaterThanLastPrice),
              !!(isTotalValChange && isLastPriceEqualRefPrice),
              stockData,
            ),
          )}
          type='body-12-regular'
        >
          {formatStringToNumber(
            (Number(stockData?.lot) * Number(stockData?.avePrice) * 10_000).toString(),
          )}
        </Text>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center small-mobile-max:w-full tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.foreign_buy')}
        </Text>
        <Text
          className={classNames(
            'mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]',
            useToggleClassStock(
              !!(isFbVolChange && isLastPriceGreaterThanRefPrice),
              !!(isFbVolChange && isRefPriceGreaterThanLastPrice),
              !!(isFbVolChange && isLastPriceEqualRefPrice),
              stockData,
            ),
          )}
          type='body-12-regular'
        >
          {formatStringToNumber(((Number(stockData?.fBVol) || 0) * 10).toString())}
        </Text>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center small-mobile-max:w-full tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_room')}
        </Text>
        <Text
          className={classNames(
            'mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]',
            useToggleClassStock(
              !!(isFRoomChange && isLastPriceGreaterThanRefPrice),
              !!(isFRoomChange && isRefPriceGreaterThanLastPrice),
              !!(isFRoomChange && isLastPriceEqualRefPrice),
              stockData,
            ),
          )}
          type='body-12-regular'
        >
          {formatStringToNumber(((Number(stockData?.fRoom) || 0) * 10).toString())}
        </Text>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center small-mobile-max:w-full tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.foreign_sell')}
        </Text>
        <Text
          className={classNames(
            'mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]',
            useToggleClassStock(
              !!(isFsVolumeChange && isLastPriceGreaterThanRefPrice),
              !!(isFsVolumeChange && isRefPriceGreaterThanLastPrice),
              !!(isFsVolumeChange && isLastPriceEqualRefPrice),
              stockData,
            ),
          )}
          type='body-12-regular'
        >
          {formatStringToNumber(((Number(stockData?.fSVolume) || 0) * 10).toString())}
        </Text>
      </div>
    </div>
  );
};

export default memo(TotalPrice);
