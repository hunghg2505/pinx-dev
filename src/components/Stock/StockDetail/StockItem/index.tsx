import React, { useMemo } from 'react';

import classNames from 'classnames';

import { IStock } from '@components/Stock/type';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { useToggleClassStock2 } from '@hooks/useToggleClassStock';
import {
  ROUTE_PATH,
  formatNumber,
  formatStringToNumber,
  getStockColor,
  imageStock,
} from '@utils/common';

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
        <img
          src={imageStock(data.stockCode)}
          // alt='Company logo'
          alt=''
          className='block h-[36px] w-[36px] rounded-full bg-white object-contain galaxy-max:h-[32px] galaxy-max:w-[32px]'
        />

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
            Cap: {formatNumber(data.marketCapital || 0)}
          </Text>
        </div>

        <div className='ml-auto text-right' style={{ color: data.lastPrice ? color : '' }}>
          <div>
            <Text
              className={classNames(
                'inline-block p-[4px] galaxy-max:text-[14px]',
                useToggleClassStock2(isChange, data.lastPrice, data.c, data.f, data.r),
              )}
              type='body-16-medium'
            >
              {data.lastPrice ? formatStringToNumber(data.lastPrice, true, 2) : '-'}
            </Text>
          </div>
          <div>
            <Text
              type='body-12-regular'
              className={classNames(
                'mt-[2px] inline-block p-[4px] galaxy-max:mt-[4px] galaxy-max:text-[10px]',
                useToggleClassStock2(isChange, data.lastPrice, data.c, data.f, data.r),
              )}
            >
              {data.lastPrice ? renderPricePc() : '- / -%'}
            </Text>
          </div>
        </div>
      </div>
    </CustomLink>
  );
};

export default StockItem;
