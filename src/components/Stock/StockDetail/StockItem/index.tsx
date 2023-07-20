import React from 'react';

import classNames from 'classnames';
import Link from 'next/link';

import { IStock } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatNumber, imageStock } from '@utils/common';

interface IStockItemProps {
  data: IStock;
}

const StockItem = ({ data }: IStockItemProps) => {
  const renderPricePc = () => {
    if (data.volume) {
      const changePc = (+data.changePrice > 0 ? '+' : '') + (+data.changePrice).toFixed(2);
      return changePc + '/' + data.changePc + '%';
    } else {
      return '-/-%';
    }
  };

  return (
    <Link href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
      <div className='flex items-center rounded-[12px] bg-[#F7F6F8] px-[12px] py-[16px]'>
        <img
          src={imageStock(data.stockCode)}
          alt='Company logo'
          className='block h-[36px] w-[36px] rounded-full bg-white object-cover'
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
            Cap: {formatNumber(data.marketCapital)}
          </Text>
        </div>

        <div
          className={classNames('ml-auto text-right text-[#0D0D0D]', {
            'text-orange': +data.changePc === 0 && +data.changePrice === 0,
            'text-[#DA314F]': +data.changePc < 0 && +data.changePrice < 0,
            'text-[#128F63]': +data.changePc > 0 && +data.changePrice > 0,
          })}
        >
          <Text type='body-16-medium'>{data.volume ? data.lastPrice.toFixed(2) : '-'}</Text>
          <Text type='body-12-regular' className='mt-[8px]'>
            {renderPricePc()}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default StockItem;
