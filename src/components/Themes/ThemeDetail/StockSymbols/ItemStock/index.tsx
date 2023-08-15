import React from 'react';

import classNames from 'classnames';

import { IStockTheme } from '@components/Themes/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

const ItemStock = ({ data }: { data: IStockTheme }) => {
  const highest_price = data?.ref_price;
  const lowest_price = data?.ref_price;
  const isFloor = data?.last_price === data?.floor_price;
  const isHigh = data?.last_price === data?.ceil_price;
  const isDecrease = data?.last_price < highest_price;
  const isIncrease = data?.last_price > lowest_price;
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
              className={classNames('mt-[5px]', {
                'text-[#128F63]': isIncrease && !isHigh,
                'text-[#DB4444]': isDecrease && !isFloor,
                'text-[#08AADD]': isFloor,
                'text-[#B349C3]': isHigh,
                'text-[#E6A70A]  ': Math.ceil(data?.change_price) === 0,
              })}
            >
              {data?.last_price?.toFixed(2)}
            </Text>

            <Text
              type='body-12-regular'
              className={classNames('mt-[5px]', {
                'text-[#128F63]': isIncrease && !isHigh,
                'text-[#DB4444]': isDecrease && !isFloor,
                'text-[#08AADD]': isFloor,
                'text-[#B349C3]': isHigh,
                'text-[#E6A70A]  ': Math.ceil(data?.change_price) === 0,
              })}
            >
              {Math.ceil(data?.change_price) !== 0 && unit}
              {Math.ceil(data?.change_price) === 0 ? '-' : data?.change_price} /{' '}
              {Math.ceil(data?.change_price) !== 0 && unit}
              {Math.ceil(data?.change_price) === 0 ? '-' : data?.change_price_percent}%
            </Text>
          </div>
        </div>
      </CustomLink>
    </>
  );
};
export default ItemStock;
