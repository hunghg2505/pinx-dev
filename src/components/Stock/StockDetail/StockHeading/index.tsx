import React, { memo, useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStock, IStockData, IStockDetails } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatStringToNumber, getStockColor, imageStock } from '@utils/common';

import styles from './index.module.scss';

interface StockHeadingProps {
  stockCode: string;
  stockDetails?: IStockDetails;
  stockDetail?: {
    data?: IStock;
  };
  dataStock?: IStockData;
  preDataStock?: IStockData;
}

const StockHeading = ({
  stockCode,
  stockDetails,
  stockDetail,
  dataStock,
  preDataStock,
}: StockHeadingProps) => {
  const { i18n } = useTranslation();

  const isPriceChange = useMemo(() => {
    if (
      !dataStock ||
      !dataStock.lastPrice ||
      !dataStock.ot ||
      !dataStock.changePc ||
      !preDataStock ||
      !preDataStock.lastPrice ||
      !preDataStock.ot ||
      !preDataStock.changePc
    ) {
      return;
    }

    const isChange =
      dataStock.lastPrice !== preDataStock.lastPrice ||
      dataStock.ot !== preDataStock.ot ||
      dataStock.changePc !== preDataStock.changePc;

    return isChange;
  }, [dataStock, preDataStock]);

  const { unitOt, unitChangePc } = useMemo(() => {
    const refPrice = dataStock?.r;
    const isDecrease = (dataStock?.lastPrice || 0) < (refPrice || 0);
    const unit = isDecrease ? '-' : '+';
    const unitOt = dataStock?.ot && +dataStock.ot !== 0 ? unit : '';
    const unitChangePc = dataStock?.changePc && +dataStock.changePc !== 0 ? unit : '';

    return {
      unitOt,
      unitChangePc,
    };
  }, [dataStock]);

  return (
    <div className='mt-[12px] flex items-center justify-between'>
      <div className='flex flex-1 flex-col gap-y-[8px] tablet:flex-row tablet:gap-x-[12px]'>
        <div className='flex h-[44px] w-[44px] items-center rounded-[12px] border border-solid border-[#EEF5F9] bg-white px-[5px] shadow-[0_1px_2px_0_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
          <img
            src={imageStock(stockCode)}
            // alt={`Logo ${stockDetail?.data?.name}`}
            alt=''
            className='block'
          />
        </div>

        <div>
          <div className='flex items-center'>
            <Text type='body-24-semibold' className='text-[#0D0D0D]'>
              {stockDetail?.data?.stockCode}
            </Text>

            <button className='ml-[8px] h-[20px] min-w-[48px] cursor-text rounded-[4px] border border-solid border-[var(--neutral-7)] px-[10px]'>
              <Text type='body-10-regular' className='text-[#808A9D]'>
                {stockDetail?.data?.stockExchange}
              </Text>
            </button>
          </div>

          <Text type='body-12-regular' className='primary-5'>
            {i18n.language === 'vi' ? stockDetail?.data?.nameVi : stockDetail?.data?.nameEn}
          </Text>
        </div>
      </div>

      <div className='flex flex-col gap-y-[8px] tablet:flex-row tablet:gap-x-[24px]'>
        {stockDetails?.data && stockDetails?.data.watchingNo > 0 && (
          <div className='flex items-center justify-end'>
            <Text type='body-12-regular' className='primary-5 mr-[4px]'>
              {stockDetails?.data.watchingNo}+
            </Text>

            <div className='flex items-center'>
              {stockDetails?.data.watchingList
                .slice(0, 3)
                .reverse()
                .map((item, index) => (
                  <img
                    key={index}
                    src={item.avatar}
                    alt='Subscriber user'
                    className='block h-[28px] w-[28px] rounded-full border border-solid border-[#EEF5F9] object-cover [&:not(:first-child)]:-ml-[8px]'
                  />
                ))}
            </div>
          </div>
        )}

        {!dataStock?.lastPrice || dataStock.lastPrice === 0 ? (
          <div className='rounded-[4px] px-[4px] py-[6px] text-right'>
            <Text type='body-16-medium'>-</Text>
            <Text type='body-12-regular'>-/-%</Text>
          </div>
        ) : (
          <div
            className={classNames('rounded-[4px] px-[4px] py-[6px] text-right', {
              [styles.isPriceChange]: isPriceChange,
            })}
            style={{
              color: getStockColor(
                dataStock?.lastPrice || 0,
                dataStock?.c || 0,
                dataStock?.f || 0,
                dataStock?.r || 0,
              ),
              backgroundColor: isPriceChange
                ? getStockColor(
                    dataStock?.lastPrice || 0,
                    dataStock?.c || 0,
                    dataStock?.f || 0,
                    dataStock?.r || 0,
                  )
                : 'transparent',
            }}
          >
            <Text type='body-16-medium'>{formatStringToNumber(dataStock?.lastPrice, true, 2)}</Text>
            <Text type='body-12-regular'>
              {`${unitOt}${formatStringToNumber(
                String(dataStock?.ot),
                true,
                dataStock?.ot && +dataStock?.ot !== 0 ? 2 : 0,
              )}`}{' '}
              /{' '}
              {`${unitChangePc}${formatStringToNumber(
                String(dataStock?.changePc),
                true,
                dataStock?.changePc && +dataStock?.changePc !== 0 ? 2 : 0,
              )}`}
              %
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(StockHeading);
