import React from 'react';

import classNames from 'classnames';
// import Link from 'next/link';

import Text from '@components/UI/Text';
// import { ROUTE_PATH } from '@utils/common';

import { IWatchListItem } from '../../service';

const ItemStock = ({ data }: { data: IWatchListItem }) => {
  const highest_price = data?.hp || data?.refPrice;
  const lowest_price = data?.lp || data?.refPrice;
  const isFloor = data?.lastPrice === data?.floorPrice;
  const isHigh = data?.lastPrice === data?.ceilPrice;
  const isDecrease = data?.lastPrice < highest_price;
  const isIncrease = data?.lastPrice > lowest_price;
  const unit = data?.cl === 'd' || data?.cl === 'f' || isDecrease ? '-' : '+';
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.stockCode?.length === 3 || data?.stockCode[0] !== 'C'
      ? data?.stockCode
      : data?.stockCode?.slice(1, 4)
  }.png`;

  return (
    // <Link href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
    <div className='mr-[16px] w-[104px]'>
      <div className='mb-[20px] flex flex-col items-center justify-center rounded-[15px] bg-[#FDFDFD] px-[5px] py-[14px] [box-shadow:0px_4px_20px_rgba(0,_0,_0,_0.07)]'>
        {url && (
          <img
            src={url}
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='h-[40px] w-[40px] rounded-full object-contain'
          />
        )}

        <Text
          type='barlow-16-medium'
          className={classNames('mt-[16px]', {
            'text-[#08AADD]': isFloor,
            'text-[#B349C3]': isHigh,
            'text-[#128F63]': isIncrease,
            'text-[#DB4444]': isDecrease,
            'text-[#E6A70A] ': Math.ceil(data?.change) === 0,
          })}
        >
          {data?.lastPrice?.toFixed(2)}
        </Text>
        <Text type='body-14-regular' color='primary-5' className={classNames('mt-[8px]')}>
          {data.stockCode}
        </Text>

        <div
          className={classNames('mt-[12px]', {
            'text-[#08AADD]': isFloor,
            'text-[#B349C3]': isHigh,
            'text-[#128F63]': isIncrease,
            'text-[#DB4444]': isDecrease,
            'text-[#E6A70A]  ': Math.ceil(data?.change) === 0,
          })}
        >
          <Text type='barlow-12-medium'>
            {unit}
            {data?.change} / {unit}
            {data?.changePc || data?.changePercent}%
          </Text>
        </div>
      </div>
    </div>
    // </Link>
  );
};
export default ItemStock;
