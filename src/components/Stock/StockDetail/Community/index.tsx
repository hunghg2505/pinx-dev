import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { IStockDetails } from '@components/Stock/type';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, formatNumber } from '@utils/common';

const WATCHING_INVESTING_ITEM_LIMIT = 4;

interface IStockCommunityProps {
  stockDetails?: IStockDetails;
  stockCode: string;
}

const StockCommunity = ({ stockDetails, stockCode }: IStockCommunityProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const router = useRouter();

  if (
    !stockDetails?.data.watchingInvestingList ||
    !stockDetails?.data.watchingInvestingList.length
  ) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <Text type='body-20-semibold'>{t('community')}</Text>
      <Text type='body-14-regular' className='mt-[16px] galaxy-max:text-[12px]'>
        {t('community_description')}
      </Text>

      <div className='mb-[8px] mt-[16px] flex items-center justify-between tablet:justify-start'>
        <CustomLink
          href={ROUTE_PATH.STOCK_SUBSCRIBER(stockCode)}
          className='flex gap-x-[10px] galaxy-max:gap-[6px]'
        >
          {stockDetails?.data.watchingInvestingList
            .slice(0, WATCHING_INVESTING_ITEM_LIMIT)
            .map((item, index) => (
              <div className='relative' key={index}>
                <img
                  src={item.avatar}
                  alt='Avatar'
                  className='h-[40px] w-[40px] rounded-full border border-solid border-[#EEF5F9] object-cover galaxy-max:h-[30px] galaxy-max:w-[30px]'
                />

                {item.isInvesting ? (
                  <img
                    src='/static/icons/iconTree.svg'
                    alt='Icon tree'
                    className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain galaxy-max:h-[20px] galaxy-max:w-[20px]'
                  />
                ) : (
                  <img
                    src='/static/icons/iconHeartActive.svg'
                    alt='Icon tree'
                    className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain galaxy-max:h-[20px] galaxy-max:w-[20px]'
                  />
                )}
              </div>
            ))}
        </CustomLink>

        <div
          onClick={() => router.push(ROUTE_PATH.STOCK_SUBSCRIBER(stockCode))}
          className='ml-[10px] flex h-[34px] min-w-[90px] cursor-pointer items-center justify-center rounded-full bg-[#F7F6F8] px-[16px] galaxy-max:px-[12px]'
        >
          <Text type='body-14-regular' className='text-[#0D0D0D]'>
            {formatNumber(stockDetails?.data.watchingInvestingNo)}
          </Text>
          <img
            src='/static/icons/iconBlackRight.svg'
            alt='Icon right'
            className='ml-[10px] h-[8px] w-[4px]'
          />
        </div>
      </div>
    </div>
  );
};

export default StockCommunity;
