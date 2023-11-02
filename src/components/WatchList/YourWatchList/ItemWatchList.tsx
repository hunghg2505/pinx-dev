import React from 'react';

import { useRequest, clearCache } from 'ahooks';
import classNames from 'classnames';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import { PRIVATE_REMOVE_STOCK } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { IWatchListItem } from '@components/Home/service';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { formatStringToNumber, getStockUrl } from '@utils/common';
import { STOCK_DETAIL } from 'src/constant/route';
import { removeTickerTracking } from 'src/mixpanel/mixpanel';

import styles from '../index.module.scss';

const ItemWatchList = ({
  data,
  isEdit,
  refreshYourWatchList,
  refreshInterest,
  isChangeColor,
  totalStock,
  onTrackingEventViewTickerInfo,
}: {
  data: IWatchListItem;
  isEdit: boolean;
  refreshYourWatchList: any;
  refreshInterest?: any;
  isChangeColor?: boolean;
  totalStock: number;
  onTrackingEventViewTickerInfo?: (stockCode: string, location: string) => void;
}) => {
  const { i18n } = useTranslation();
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

  const useRemoveStock = useRequest(
    (code) => {
      return privateRequest(requestPist.put, PRIVATE_REMOVE_STOCK(code));
    },
    {
      manual: true,
      onSuccess: () => {
        refreshInterest && refreshInterest();
        refreshYourWatchList && refreshYourWatchList();
        clearCache('watchList');

        // gtm
        removeTickerTracking(
          data?.stockCode,
          'Stock',
          'Watchlist',
          'Default',
          totalStock && totalStock - 1,
        );
      },
    },
  );

  const onRemoveStock = () => {
    useRemoveStock.run(data?.stockCode);
  };
  const code = getStockUrl(data);

  return (
    <>
      <div
        className={classNames(
          'flex items-center gap-x-[10px] galaxy-max:flex-1 galaxy-max:gap-[6px]',
        )}
      >
        <CustomLink
          onClick={() => {
            onTrackingEventViewTickerInfo &&
              onTrackingEventViewTickerInfo(data?.stockCode, 'Watch list');
          }}
          linkClassName='flex-none'
          href={STOCK_DETAIL(code)}
        >
          <div className='flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-white object-contain galaxy-max:h-[30px] galaxy-max:w-[30px] tablet:h-[48px] tablet:w-[48px]'>
            <Image width='0' height='0' sizes='100vw' src={url} alt='' className='block' />
          </div>
        </CustomLink>
        <div className='flex flex-col gap-y-[4px]'>
          <div className='flex gap-x-[4px]'>
            <CustomLink
              onClick={() => {
                onTrackingEventViewTickerInfo &&
                  onTrackingEventViewTickerInfo(data?.stockCode, 'Watch list');
              }}
              href={STOCK_DETAIL(code)}
            >
              <Text type='body-16-semibold' className='text-[#0D0D0D] galaxy-max:text-[14px]'>
                {data?.stockCode}
              </Text>
            </CustomLink>
            <Text
              type='body-10-regular'
              className='text-#394251 rounded-[4px] border-[1px] border-solid border-[#EBEBEB] bg-[#fff] px-[7px] py-[2px] leading-[16px] galaxy-max:px-[5px] galaxy-max:py-[1px] galaxy-max:text-[8px]'
            >
              {data?.stockExchange}
            </Text>
          </div>
          <Text
            type='body-12-regular'
            className={classNames('galaxy-max:text-[10px]', {
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
          <img
            loading='lazy'
            src='/static/icons/iconSwitch.svg'
            alt=''
            className='h-[21px] w-[20px]'
          />
          <img
            src='/static/icons/iconCloseBlue.svg'
            alt=''
            className='absolute -right-2 -top-2 h-[18px] w-[18px] cursor-pointer'
            onClick={onRemoveStock}
          />
        </div>
      ) : (
        <div className='flex flex-col items-end gap-y-[5px] whitespace-nowrap'>
          <Text
            type='body-14-semibold'
            className={classNames('px-[5px] py-[2px] galaxy-max:text-[12px]', {
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DA314F]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
              'text-[#22D1E9]': isFloor,
              'text-[#782AF9]': isHigh,
              'text-[#F1BA09]': Number(data?.change) === 0 && Number(data?.lastPrice) !== 0,
              'text-[#474D57]': Number(data?.lastPrice) === 0,
              [styles.isIncrease]: isIncrease && !isHigh && !isChange && isChangeColor,
              [styles.isDecrease]:
                isDecrease &&
                !isFloor &&
                Number(data?.lastPrice) !== 0 &&
                !isChange &&
                isChangeColor,
            })}
          >
            {Number(data?.lastPrice) === 0 ? '-' : formatStringToNumber(data?.lastPrice, true, 2)}
          </Text>
          <Text
            type='body-12-medium'
            className={classNames('px-[5px] py-[2px] galaxy-max:text-[8px]', {
              'text-[#128F63]': isIncrease && !isHigh,
              'text-[#DA314F]': isDecrease && !isFloor && Number(data?.lastPrice) !== 0,
              'text-[#22D1E9]': isFloor,
              'text-[#782AF9]': isHigh,
              'text-[#F1BA09]  ': Number(data?.change) === 0 && Number(data?.lastPrice) !== 0,
              'text-[#474D57]': Number(data?.lastPrice) === 0,
              [styles.isIncrease]: isIncrease && !isHigh && !isChange && isChangeColor,
              [styles.isDecrease]:
                isDecrease &&
                !isFloor &&
                Number(data?.lastPrice) !== 0 &&
                !isChange &&
                isChangeColor,
            })}
          >
            {isChange ? '' : unit}
            {isChange ? '-' : formatStringToNumber(data?.change, true, 2)} / {isChange ? '' : unit}
            {isChange
              ? '-'
              : (data?.changePc && formatStringToNumber(data?.changePc, true, 2)) ||
                formatStringToNumber(data?.changePercent, true, 2)}
            %
          </Text>
        </div>
      )}
    </>
  );
};
export default ItemWatchList;
