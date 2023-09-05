import React from 'react';

import classNames from 'classnames';

import { IWatchListItem } from '@components/Home/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatStringToNumber, imageStock } from '@utils/common';

import style from '../index.module.scss';

const ItemStock = ({ data, isChangeStock }: { data: IWatchListItem; isChangeStock: boolean }) => {
  const highest_price = data?.refPrice;
  const lowest_price = data?.refPrice;
  const isFloor = data?.lastPrice === data?.floorPrice;
  const isHigh = data?.lastPrice === data?.ceilPrice;
  const isDecrease = data?.lastPrice < highest_price;
  const isIncrease = data?.lastPrice > lowest_price;
  const isChange = Number(data?.changePc) === 0 || Number(data?.changePercent) === 0;
  const unit = isDecrease ? '-' : '+';

  return (
    <>
      <div className='item mb-[26px] flex justify-between pb-[10px] [border-bottom:1px_solid_#ECECEC] last:border-none '>
        <div className='flex'>
          <CustomLink href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
            <div className='mr-[10px] flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full object-contain'>
              <img
                src={imageStock(data?.stockCode)}
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='block'
              />
            </div>
          </CustomLink>
          <div>
            <div className='flex items-center'>
              <CustomLink href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
                <Text type='body-14-bold' color='cbblack'>
                  {data?.stockCode}
                </Text>
              </CustomLink>
              <Text
                type='body-12-regular'
                className='ml-[4px] rounded-[4px] border-[1px] border-solid border-[#DFDFDF] px-[3px] py-[5px] text-[#474D57]'
              >
                {data?.stockExchange}
              </Text>
            </div>
            <Text type='body-12-regular' className='mt-[4px] text-[#666666]'>
              {data?.shortName}
            </Text>
          </div>
        </div>
        <div className='text-right'>
          <Text
            type='body-14-semibold'
            className={classNames('mt-[5px]', {
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DB4444]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
              'text-[#08AADD]': isFloor,
              'text-[#B349C3]': isHigh,
              'text-[#E6A70A]  ': Number(data?.change) === 0 && Number(data?.lastPrice) !== 0,
              'text-[#474D57]': Number(data?.lastPrice) === 0,
              [style.isIncrease]: isIncrease && !isHigh && isChangeStock && !isChange,
              [style.isDecrease]:
                isDecrease &&
                !isFloor &&
                Number(data?.lastPrice) !== 0 &&
                isChangeStock &&
                !isChange,
            })}
          >
            {Number(data?.lastPrice) === 0 ? '-' : formatStringToNumber(data?.lastPrice, true, 2)}
          </Text>

          <Text
            type='body-12-medium'
            className={classNames('mt-[5px]', {
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DB4444]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
              'text-[#08AADD]': isFloor,
              'text-[#B349C3]': isHigh,
              'text-[#E6A70A]  ': Number(data?.change) === 0 && Number(data?.lastPrice) !== 0,
              'text-[#474D57]': Number(data?.lastPrice) === 0,
              [style.isIncrease]: isIncrease && !isHigh && isChangeStock && !isChange,
              [style.isDecrease]:
                isDecrease &&
                !isFloor &&
                Number(data?.lastPrice) !== 0 &&
                isChangeStock &&
                !isChange,
            })}
          >
            {isChange ? '' : unit}
            {Number(data?.change) === 0 ? '-' : formatStringToNumber(data?.change, true, 2)} /{' '}
            {isChange ? '' : unit}
            {isChange
              ? '-'
              : (data?.changePc && formatStringToNumber(data?.changePc, true, 2)) ||
                formatStringToNumber(data?.changePercent, true, 2)}
            %
          </Text>
        </div>
      </div>
    </>
  );
};
export default ItemStock;
