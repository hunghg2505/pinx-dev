import React, { useMemo } from 'react';

import Image from 'next/image';

import { IStock } from '@components/Stock/type';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatStringToNumber, getStockColor, imageStock } from '@utils/common';

import PriceWrapper from './PriceWrapper';

interface IStockItemProps {
  data: IStock;
}

const StockItem = ({ data }: IStockItemProps) => {
  const { color, unit, changePrice, changePc, isChange } = useMemo(() => {
    const color = getStockColor(data?.lastPrice, data?.c, data?.f, data?.r);

    // check unit
    let unit: string;
    if (data.lastPrice < data.r) {
      unit = '-';
    } else if (data.lastPrice > data.r) {
      unit = '+';
    } else {
      unit = '';
    }

    // format data
    let changePrice = data.changePrice;
    if (data.changePrice.startsWith('+') || data.changePrice.startsWith('-')) {
      changePrice = data.changePrice.slice(1);
    }

    let changePc = data.changePc;
    if (data.changePc.startsWith('+') || data.changePc.startsWith('-')) {
      changePc = data.changePc.slice(1);
    }

    const isChange = !!(
      data.preLastPrice &&
      data.preChangePc &&
      data.preChangePrice &&
      data.lastPrice !== data.preLastPrice &&
      data.changePc !== data.preChangePc &&
      data.changePrice !== data.preChangePrice
    );

    return { color, unit, changePrice, changePc, isChange };
  }, [data]);

  const renderPricePc = () => {
    return (
      unit +
      formatStringToNumber(changePrice, true, 2) +
      ' / ' +
      unit +
      formatStringToNumber(changePc, true, 2) +
      '%'
    );
  };

  return (
    <CustomLink href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
      <div className='flex items-center rounded-[12px] bg-[#F7F6F8] py-[16px] pl-[12px] pr-[8px] galaxy-max:px-[8px] galaxy-max:py-[12px]'>
        <div className='flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-white object-contain galaxy-max:h-[32px] galaxy-max:w-[32px]'>
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={imageStock(data.stockCode)}
            // alt='Company logo'
            alt=''
            className='block'
          />
        </div>

        <div className='ml-[10px] '>
          <div className='flex items-center'>
            <Text type='body-16-semibold' className='text-[#0D0D0D] galaxy-max:text-[12px]'>
              {data.stockCode}
            </Text>

            <div className='ml-[8px] flex h-[22px] items-center justify-center rounded-[4px] border border-solid border-[#ccc] bg-white px-[12px] galaxy-max:px-[8px]'>
              <Text type='body-12-regular' className='text-[#808A9D] galaxy-max:text-[10px]'>
                {data.stockExchange}
              </Text>
            </div>
          </div>

          <Text
            type='body-12-regular'
            className='mt-[8px] text-[#808A9D] galaxy-max:mt-[2px] galaxy-max:text-[9px]'
          >
            Cap: {formatStringToNumber(data.marketCapital || 0) || 0}
          </Text>
        </div>

        <div className='ml-auto text-right' style={{ color: data.lastPrice ? color : '' }}>
          <div>
            <PriceWrapper
              isChange={isChange}
              lastPrice={data.lastPrice}
              ceilPrice={data.c}
              floorPrice={data.f}
              refPrice={data.r}
              className='inline-block p-[4px] galaxy-max:text-[14px]'
            >
              <Text type='body-16-medium'>
                {data.lastPrice ? formatStringToNumber(data.lastPrice, true, 2) : '-'}
              </Text>
            </PriceWrapper>
          </div>
          <div>
            <PriceWrapper
              isChange={isChange}
              lastPrice={data.lastPrice}
              ceilPrice={data.c}
              floorPrice={data.f}
              refPrice={data.r}
              className='mt-[2px] inline-block p-[4px] galaxy-max:mt-[4px] galaxy-max:text-[10px]'
            >
              <Text type='body-12-regular'>{data.lastPrice ? renderPricePc() : '- / -%'}</Text>
            </PriceWrapper>
          </div>
        </div>
      </div>
    </CustomLink>
  );
};

export default StockItem;
