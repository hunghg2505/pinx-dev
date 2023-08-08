import React, { useMemo } from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import { IStock } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatNumber, imageStock } from '@utils/common';

interface IStockItemProps {
  data: IStock;
}

const StockItem = ({ data }: IStockItemProps) => {
  const { isFloor, isHigh, isDecrease, isIncrease } = useMemo(() => {
    const highest_price = data?.r;
    const lowest_price = data?.r;
    const isFloor = data?.lastPrice === data?.f;
    const isHigh = data?.lastPrice === data?.c;
    const isDecrease = data?.lastPrice < highest_price;
    const isIncrease = data?.lastPrice > lowest_price;

    return {
      isFloor,
      isHigh,
      isDecrease,
      isIncrease,
    };
  }, [data]);

  const renderPricePc = () => {
    const changePc = (+data.changePrice > 0 ? '+' : '') + (+data.changePrice).toFixed(2);
    return changePc + '/' + data.changePc + '%';
  };

  return (
    <Link href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
      <div className='flex items-center rounded-[12px] bg-[#F7F6F8] px-[12px] py-[16px]'>
        <img
          src={imageStock(data.stockCode)}
          alt='Company logo'
          className='block h-[36px] w-[36px] rounded-full bg-white object-contain'
        />

        <div className='ml-[10px]'>
          <div className='flex items-center'>
            <Text type='body-16-semibold' className='text-[#0D0D0D]'>
              {data.stockCode}
            </Text>

            <div className='ml-[8px] flex h-[22px] items-center justify-center rounded-[4px] border border-solid border-[#ccc] bg-white px-[12px]'>
              <Text type='body-12-regular' className='text-[#808A9D]'>
                {data.stockExchange}
              </Text>
            </div>
          </div>

          <Text type='body-12-regular' className='mt-[8px] text-[#808A9D]'>
            Cap: {formatNumber(data.marketCapital || 0)}
          </Text>
        </div>

        <div
          className={classNames('ml-auto text-right text-[#0D0D0D]', {
            'text-[#08AADD]': isFloor,
            'text-[#B349C3]': isHigh,
            'text-[#128F63]': isIncrease,
            'text-[#DB4444]': isDecrease,
            'text-[#E6A70A]': Math.ceil(+data?.changePc) === 0,
          })}
        >
          <Text type='body-16-medium'>{data.lastPrice.toFixed(2)}</Text>
          <Text type='body-12-regular' className='mt-[8px]'>
            {renderPricePc()}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default StockItem;
