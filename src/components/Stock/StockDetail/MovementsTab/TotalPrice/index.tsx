import React, { memo, useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

import TotalPriceItem from './TotalPriceItem';

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
        <TotalPriceItem
          dependencies={stockData}
          isChange={!!isTotalVolChange}
          isLastPriceGTRefPrice={!!isLastPriceGreaterThanRefPrice}
          isRefPriceGTLastPrice={!!isRefPriceGreaterThanLastPrice}
          isEqual={!!isLastPriceEqualRefPrice}
        >
          <Text type='body-12-regular'>
            {formatStringToNumber((Number(stockData?.lot || 0) * 10).toString()) || 0}
          </Text>
        </TotalPriceItem>
      </div>

      <div className='w-1/2 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center small-mobile-max:w-full tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_val')}
        </Text>
        <TotalPriceItem
          dependencies={stockData}
          isChange={!!isTotalValChange}
          isLastPriceGTRefPrice={!!isLastPriceGreaterThanRefPrice}
          isRefPriceGTLastPrice={!!isRefPriceGreaterThanLastPrice}
          isEqual={!!isLastPriceEqualRefPrice}
        >
          <Text type='body-12-regular'>
            {formatStringToNumber(
              (Number(stockData?.lot) * Number(stockData?.avePrice) * 10_000).toString(),
            ) || 0}
          </Text>
        </TotalPriceItem>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center small-mobile-max:w-full tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.foreign_buy')}
        </Text>
        <TotalPriceItem
          dependencies={stockData}
          isChange={!!isFbVolChange}
          isLastPriceGTRefPrice={!!isLastPriceGreaterThanRefPrice}
          isRefPriceGTLastPrice={!!isRefPriceGreaterThanLastPrice}
          isEqual={!!isLastPriceEqualRefPrice}
        >
          <Text type='body-12-regular'>
            {formatStringToNumber(((Number(stockData?.fBVol) || 0) * 10).toString()) || 0}
          </Text>
        </TotalPriceItem>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center small-mobile-max:w-full tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_room')}
        </Text>
        <TotalPriceItem
          dependencies={stockData}
          isChange={!!isFRoomChange}
          isLastPriceGTRefPrice={!!isLastPriceGreaterThanRefPrice}
          isRefPriceGTLastPrice={!!isRefPriceGreaterThanLastPrice}
          isEqual={!!isLastPriceEqualRefPrice}
        >
          <Text type='body-12-regular'>
            {formatStringToNumber(((Number(stockData?.fRoom) || 0) * 10).toString()) || 0}
          </Text>
        </TotalPriceItem>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center small-mobile-max:w-full tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.foreign_sell')}
        </Text>
        <TotalPriceItem
          dependencies={stockData}
          isChange={!!isFsVolumeChange}
          isLastPriceGTRefPrice={!!isLastPriceGreaterThanRefPrice}
          isRefPriceGTLastPrice={!!isRefPriceGreaterThanLastPrice}
          isEqual={!!isLastPriceEqualRefPrice}
        >
          <Text type='body-12-regular'>
            {formatStringToNumber(((Number(stockData?.fSVolume) || 0) * 10).toString()) || 0}
          </Text>
        </TotalPriceItem>
      </div>
    </div>
  );
};

export default memo(TotalPrice);
