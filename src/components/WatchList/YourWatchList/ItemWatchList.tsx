import React from 'react';

import { useRequest } from 'ahooks';
import classNames from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { IWatchListItem } from '@components/Home/service';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

const ItemWatchList = ({
  data,
  isEdit,
  refreshYourWatchList,
  refreshInterest,
}: {
  data: IWatchListItem;
  isEdit: boolean;
  refreshYourWatchList: any;
  refreshInterest?: any;
}) => {
  const { i18n } = useTranslation();
  const highest_price = data?.refPrice;
  const lowest_price = data?.refPrice;
  const isFloor = data?.lastPrice === data?.floorPrice;
  const isHigh = data?.lastPrice === data?.ceilPrice;
  const isDecrease = data?.lastPrice < highest_price;
  const isIncrease = data?.lastPrice > lowest_price;
  const unit = isDecrease ? '-' : '+';
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    data?.stockCode?.length === 3 || data?.stockCode[0] !== 'C'
      ? data?.stockCode
      : data?.stockCode?.slice(1, 4)
  }.png`;

  const useRemoveStock = useRequest(
    (code) => {
      return privateRequest(requestPist.put, API_PATH.PRIVATE_REMOVE_STOCK(code));
    },
    {
      manual: true,
      onSuccess: () => {
        refreshInterest && refreshInterest();
        refreshYourWatchList && refreshYourWatchList();
      },
    },
  );

  const onRemoveStock = () => {
    useRemoveStock.run(data?.stockCode);
  };

  return (
    <>
      <div className={classNames('flex items-center gap-x-[10px]')}>
        <Link href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
          <img
            src={url}
            alt=''
            className='h-[36px] w-[36px] rounded-full bg-white object-contain tablet:h-[48px] tablet:w-[48px]'
          />
        </Link>
        <div className='flex flex-col gap-y-[4px]'>
          <div className='flex gap-x-[4px]'>
            <Link href={ROUTE_PATH.STOCK_DETAIL(data.stockCode)}>
              <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                {data?.stockCode}
              </Text>
            </Link>
            <Text
              type='body-10-regular'
              className='text-#394251 rounded-[4px] border-[1px] border-solid border-[#EBEBEB] bg-[#fff] px-[7px] py-[2px] leading-[16px]'
            >
              {data?.stockExchange}
            </Text>
          </div>
          <Text
            type='body-12-regular'
            className={classNames({
              'max-w-[155px] text-[#474D57] tablet:max-w-[100%]': isEdit,
              'max-w-[155px] text-[#999] tablet:max-w-[100%] ': !isEdit,
            })}
          >
            {i18n.language === 'vi' ? data?.name : data?.nameEn}
          </Text>
        </div>
      </div>
      {isEdit ? (
        <div className='flex pr-[12px]'>
          <img src='/static/icons/iconSwitch.svg' alt='' className='h-[21px] w-[20px]' />
          <img
            src='/static/icons/iconCloseBlue.svg'
            alt=''
            className='absolute -right-2 -top-2 h-[18px] w-[18px] cursor-pointer'
            onClick={onRemoveStock}
          />
        </div>
      ) : (
        <div className='flex flex-col items-end gap-y-[5px]'>
          <Text
            type='body-14-semibold'
            className={classNames({
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DB4444]': isDecrease && !isFloor,
              'text-[#08AADD]': isFloor,
              'text-[#B349C3]': isHigh,
              'text-[#E6A70A]  ': Math.ceil(data?.change) === 0,
            })}
          >
            {data?.lastPrice?.toFixed(2)}
          </Text>
          <Text
            type='body-12-medium'
            className={classNames({
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DB4444]': isDecrease && !isFloor,
              'text-[#08AADD]': isFloor,
              'text-[#B349C3]': isHigh,
              'text-[#E6A70A]  ': Math.ceil(data?.change) === 0,
            })}
          >
            {unit}
            {data?.change} / {unit}
            {data?.changePc || data?.changePercent}%
          </Text>
        </div>
      )}
    </>
  );
};
export default ItemWatchList;
