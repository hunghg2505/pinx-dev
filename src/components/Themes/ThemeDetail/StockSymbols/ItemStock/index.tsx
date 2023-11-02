import React from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import { IStockTheme } from '@components/Themes/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { formatStringToNumber, imageStock, toNonAccentVietnamese } from '@utils/common';
import { STOCK_DETAIL } from 'src/constant/route';
import { viewTickerInfoTracking } from 'src/mixpanel/mixpanel';

import style from './index.module.scss';

// tracking event view stock info
const handleTrackingViewTickerInfo = (stockCode: string) => {
  viewTickerInfoTracking(stockCode, 'Theme detail screen', 'Stock symbols tab', 'Stock');
};

const ItemStock = ({ data, isChangeStock }: { data: IStockTheme; isChangeStock: boolean }) => {
  const lastPrice = data?.lastPrice || data?.last_price;
  const change = data?.change || data?.change_price;
  const changePc = data?.changePc || data?.change_price_percent;
  const highest_price = data?.ref_price;
  const lowest_price = data?.ref_price;
  const isFloor = lastPrice === data?.floor_price;
  const isHigh = lastPrice === data?.ceil_price;
  const isDecrease = lastPrice < highest_price;
  const isIncrease = lastPrice > lowest_price;
  const isChange = Number(change) === 0 || Number(changePc) === 0;
  const unit = isDecrease ? '-' : '+';

  const code = data.stock_name
    ? `${data.stock_code.toLowerCase()}-${toNonAccentVietnamese(data.stock_name)
        .toLowerCase()
        .replaceAll(' ', '-')}`
    : data.stock_code;

  return (
    <>
      <CustomLink
        onClick={() => handleTrackingViewTickerInfo(data?.stock_code)}
        href={STOCK_DETAIL(code)}
      >
        <div className='item flex h-[82px] items-center justify-between rounded-[12px] bg-[#F7F6F8] px-[12px]'>
          <div className='flex w-[65%] items-center galaxy-max:flex-none'>
            <div className='mr-[10px] flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-[#ffffff] object-contain galaxy-max:flex-none'>
              <Image
                src={imageStock(data?.stock_code)}
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='block'
              />
            </div>
            <div>
              <div className='flex items-center'>
                <Text type='body-16-semibold' className='galaxy-max:text-[14px]' color='cbblack'>
                  {data?.stock_code}
                </Text>
                <Text
                  type='body-10-regular'
                  className='ml-[4px] rounded-[4px] border-[1px] border-solid border-[#DFDFDF] px-[3px] py-[5px] text-[#474D57] galaxy-max:text-[8px]'
                >
                  {data?.stock_exchange}
                </Text>
              </div>
              <Text
                type='body-12-regular'
                className='mt-[4px] line-clamp-2 text-[#666666] galaxy-max:text-[10px]'
              >
                {data?.stock_name}
              </Text>
            </div>
          </div>
          <div className='text-right'>
            <Text
              type='body-16-medium'
              className={classNames('mt-[5px] px-[5px] py-[2px] galaxy-max:text-[14px]', {
                'text-[#128F63]': isIncrease && !isHigh,
                'text-[#DB4444]': isDecrease && !isFloor && Number(lastPrice) !== 0,
                'text-[#08AADD]': isFloor,
                'text-[#B349C3]': isHigh,
                'text-[#E6A70A]  ': Math.ceil(Number(change)) === 0 && Number(lastPrice) !== 0,
                'text-[#474D57]': Number(lastPrice) === 0,
                [style.isIncrease]: isIncrease && !isHigh && isChangeStock && !isChange,
                [style.isDecrease]:
                  isDecrease && !isFloor && Number(lastPrice) !== 0 && isChangeStock && !isChange,
              })}
            >
              {Number(lastPrice) === 0 ? '-' : formatStringToNumber(lastPrice, true, 2)}
            </Text>

            <Text
              type='body-12-regular'
              className={classNames('mt-[5px] px-[5px] py-[2px] galaxy-max:text-[10px]', {
                'text-[#128F63]': isIncrease && !isHigh,
                'text-[#DB4444]': isDecrease && !isFloor && Number(lastPrice) !== 0,
                'text-[#08AADD]': isFloor,
                'text-[#B349C3]': isHigh,
                'text-[#E6A70A]  ': Math.ceil(Number(change)) === 0 && Number(lastPrice) !== 0,
                'text-[#474D57]': Number(lastPrice) === 0,
                [style.isIncrease]: isIncrease && !isHigh && isChangeStock && !isChange,
                [style.isDecrease]:
                  isDecrease && !isFloor && Number(lastPrice) !== 0 && isChangeStock && !isChange,
              })}
            >
              {isChange ? '' : unit}
              {isChange ? '-' : formatStringToNumber(change, true, 2)} / {isChange ? '' : unit}
              {isChange ? '-' : changePc && formatStringToNumber(changePc, true, 2)}%
            </Text>
          </div>
        </div>
      </CustomLink>
    </>
  );
};
export default ItemStock;
