import React from 'react';

import classNames from 'classnames';

import { IStockTheme } from '@components/Themes/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatStringToNumber } from '@utils/common';

import style from './index.module.scss';

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
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.stock_code?.length === 3 || data?.stock_code[0] !== 'C'
      ? data?.stock_code
      : data?.stock_code?.slice(1, 4)
  }.png`;
  return (
    <>
      <CustomLink href={ROUTE_PATH.STOCK_DETAIL(data.stock_code)}>
        <div className='item flex h-[82px] items-center justify-between rounded-[12px] bg-[#F7F6F8] px-[12px]'>
          <div className='flex w-[65%] items-center'>
            <img
              src={url}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='mr-[10px] h-[36px] w-[36px] rounded-full bg-[#ffffff] object-contain'
            />
            <div>
              <div className='flex items-center'>
                <Text type='body-16-semibold' color='cbblack'>
                  {data?.stock_code}
                </Text>
                <Text
                  type='body-10-regular'
                  className='ml-[4px] rounded-[4px] border-[1px] border-solid border-[#DFDFDF] px-[3px] py-[5px] text-[#474D57]'
                >
                  {data?.stock_exchange}
                </Text>
              </div>
              <Text type='body-12-regular' className='mt-[4px] line-clamp-2 text-[#666666]'>
                {data?.stock_name}
              </Text>
            </div>
          </div>
          <div className='text-right'>
            <Text
              type='body-16-medium'
              className={classNames('mt-[5px] px-[5px] py-[2px]', {
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
              className={classNames('mt-[5px] px-[5px] py-[2px]', {
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
              {Number(change) === 0 ? '-' : formatStringToNumber(change, true, 2)} /{' '}
              {isChange ? '' : unit}
              {isChange
                ? '-'
                : (changePc && formatStringToNumber(changePc, true, 2)) ||
                  formatStringToNumber(changePc, true, 2)}
              %
            </Text>
          </div>
        </div>
      </CustomLink>
    </>
  );
};
export default ItemStock;
