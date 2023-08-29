import React from 'react';

import classNames from 'classnames';

import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatStringToNumber } from '@utils/common';

import { IWatchListItem } from '../../service';
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
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.stockCode?.length === 3 || data?.stockCode[0] !== 'C'
      ? data?.stockCode
      : data?.stockCode?.slice(1, 4)
  }.png`;

  return (
    <CustomLink href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
      <div className='mr-[16px] w-[120px]'>
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
            className={classNames('mt-[16px] px-[5px] py-[2px]', {
              'text-[#08AADD]': isFloor,
              'text-[#B349C3]': isHigh,
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DB4444]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
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
          <Text type='body-14-regular' color='primary-5' className={classNames('mt-[8px]')}>
            {data.stockCode}
          </Text>
          <div
            className={classNames('mt-[12px] px-[5px] py-[2px]', {
              'text-[#08AADD]': isFloor,
              'text-[#B349C3]': isHigh,
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DB4444]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
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
            <Text type='barlow-12-medium'>
              {isChange ? '' : unit}
              {isChange ? '-' : formatStringToNumber(data?.change, true, 2)} /{' '}
              {isChange ? '' : unit}
              {isChange
                ? '-'
                : (data?.changePc && formatStringToNumber(data?.changePc, true, 2)) ||
                  formatStringToNumber(data?.changePercent, true, 2)}
              %
            </Text>
          </div>
        </div>
      </div>
    </CustomLink>
  );
};
export default ItemStock;
