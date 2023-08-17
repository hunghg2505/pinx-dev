import React, { memo, useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import useToggleClassStock from '@hooks/useToggleClassStock';
import { formatNumber, formatStringToNumber } from '@utils/common';

import { getColor } from '..';
import styles from '../index.module.scss';

interface ITableBidProps {
  stockData?: IStockData;
  preDataStock?: IStockData;
  className?: string;
}

const TableBid = ({ stockData, preDataStock, className }: ITableBidProps) => {
  const { t } = useTranslation(['stock', 'common']);

  const {
    buy_price_1,
    buy_volume_1,
    buy_price_2,
    buy_volume_2,
    buy_price_3,
    buy_volume_3,
    maxVolume,
  } = useMemo(() => {
    const [buy_price_1, buy_volume_1] = (stockData?.g1 || '').split('|');
    const [buy_price_2, buy_volume_2] = (stockData?.g2 || '').split('|');
    const [buy_price_3, buy_volume_3] = (stockData?.g3 || '').split('|');
    const [, sell_volume_1] = (stockData?.g4 || '').split('|');
    const [, sell_volume_2] = (stockData?.g5 || '').split('|');
    const [, sell_volume_3] = (stockData?.g6 || '').split('|');
    const maxVolume = Math.max(
      +buy_volume_1,
      +buy_volume_2,
      +buy_volume_3,
      +sell_volume_1,
      +sell_volume_2,
      +sell_volume_3,
    );

    return {
      buy_price_1,
      buy_volume_1,
      buy_price_2,
      buy_volume_2,
      buy_price_3,
      buy_volume_3,
      maxVolume,
      lot: stockData?.lot,
    };
  }, [stockData]);

  const {
    pre_buy_price_1,
    pre_buy_volume_1,
    pre_buy_price_2,
    pre_buy_volume_2,
    pre_buy_price_3,
    pre_buy_volume_3,
  } = useMemo(() => {
    const [pre_buy_price_1, pre_buy_volume_1] = (preDataStock?.g1 || '').split('|');
    const [pre_buy_price_2, pre_buy_volume_2] = (preDataStock?.g2 || '').split('|');
    const [pre_buy_price_3, pre_buy_volume_3] = (preDataStock?.g3 || '').split('|');
    const [pre_sell_price_1, pre_sell_volume_1] = (preDataStock?.g4 || '').split('|');
    const [pre_sell_price_2, pre_sell_volume_2] = (preDataStock?.g5 || '').split('|');
    const [pre_sell_price_3, pre_sell_volume_3] = (preDataStock?.g6 || '').split('|');

    return {
      pre_buy_price_1,
      pre_buy_volume_1,
      pre_buy_price_2,
      pre_buy_volume_2,
      pre_buy_price_3,
      pre_buy_volume_3,
      pre_sell_price_1,
      pre_sell_volume_1,
      pre_sell_price_2,
      pre_sell_volume_2,
      pre_sell_price_3,
      pre_sell_volume_3,
      pre_lot: preDataStock?.lot,
    };
  }, [preDataStock]);

  return (
    <div
      className={classNames(
        'flex items-center overflow-hidden rounded-[12px] border border-solid border-[#EBEBEB]',
        className,
      )}
    >
      <div className='flex w-[100px] items-center justify-center self-stretch border-r border-solid border-[#EBEBEB] text-center'>
        <Text type='body-14-semibold' color='neutral-darkgray'>
          {t('bid')}
        </Text>
      </div>

      <div className={classNames('flex-1', styles.stockAskBid)}>
        <div className='flex h-[41px] items-center justify-between'>
          <div
            className='flex h-full flex-col justify-center pl-[16px]'
            style={{ color: getColor(+buy_price_1, stockData?.r || 0)?.color }}
          >
            <Text
              type='body-12-semibold'
              className={classNames(
                'inline-block self-start p-[4px]',
                useToggleClassStock(
                  buy_price_1 !== pre_buy_price_1 && +buy_price_1 > (stockData?.r || 0),
                  buy_price_1 !== pre_buy_price_1 && +buy_price_1 < (stockData?.r || 0),
                  buy_price_1 !== pre_buy_price_1 && +buy_price_1 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {Number.isNaN(+buy_price_1)
                ? buy_price_1
                : formatStringToNumber(buy_price_1, true, 2)}
            </Text>
            <div
              className='absolute -bottom-[1px] left-0 h-[3px] border-none'
              style={{
                width: (+buy_volume_1 / maxVolume) * 100 + '%',
                backgroundColor: getColor(+buy_price_1, stockData?.r || 0)?.backgroundColor,
              }}
            ></div>
          </div>

          <div className='pr-[16px]'>
            <Text
              type='body-12-regular'
              className={classNames(
                'inline-block self-end p-[4px] text-[#474D57]',
                useToggleClassStock(
                  buy_volume_1 !== pre_buy_volume_1 && +buy_price_1 > (stockData?.r || 0),
                  buy_volume_1 !== pre_buy_volume_1 && +buy_price_1 < (stockData?.r || 0),
                  buy_volume_1 !== pre_buy_volume_1 && +buy_price_1 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {formatNumber((Number(buy_volume_1) || 0) * 10)}
            </Text>
          </div>
        </div>

        <div className='flex h-[41px] items-center justify-between'>
          <div
            className='flex h-full flex-col justify-center pl-[16px]'
            style={{ color: getColor(+buy_price_2, stockData?.r || 0)?.color }}
          >
            <Text
              type='body-12-semibold'
              className={classNames(
                'inline-block self-start p-[4px]',
                useToggleClassStock(
                  buy_price_2 !== pre_buy_price_2 && +buy_price_2 > (stockData?.r || 0),
                  buy_price_2 !== pre_buy_price_2 && +buy_price_2 < (stockData?.r || 0),
                  buy_price_2 !== pre_buy_price_2 && +buy_price_2 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {Number.isNaN(+buy_price_2)
                ? buy_price_2
                : formatStringToNumber(buy_price_2, true, 2)}
            </Text>
            <div
              className='absolute -bottom-[1px] left-0 h-[3px] border-none'
              style={{
                width: (+buy_volume_2 / maxVolume) * 100 + '%',
                backgroundColor: getColor(+buy_price_2, stockData?.r || 0)?.backgroundColor,
              }}
            ></div>
          </div>

          <div className='pr-[16px]'>
            <Text
              type='body-12-regular'
              className={classNames(
                'inline-block self-end p-[4px] text-[#474D57]',
                useToggleClassStock(
                  buy_volume_2 !== pre_buy_volume_2 && +buy_price_2 > (stockData?.r || 0),
                  buy_volume_2 !== pre_buy_volume_2 && +buy_price_2 < (stockData?.r || 0),
                  buy_volume_2 !== pre_buy_volume_2 && +buy_price_2 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {formatNumber((Number(buy_volume_2) || 0) * 10)}
            </Text>
          </div>
        </div>

        <div className='flex h-[41px] items-center justify-between'>
          <div
            className='flex h-full flex-col justify-center pl-[16px]'
            style={{ color: getColor(+buy_price_3, stockData?.r || 0)?.color }}
          >
            <Text
              type='body-12-semibold'
              className={classNames(
                'inline-block self-start p-[4px]',
                useToggleClassStock(
                  buy_price_3 !== pre_buy_price_3 && +buy_price_3 > (stockData?.r || 0),
                  buy_price_3 !== pre_buy_price_3 && +buy_price_3 < (stockData?.r || 0),
                  buy_price_3 !== pre_buy_price_3 && +buy_price_3 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {Number.isNaN(+buy_price_3)
                ? buy_price_3
                : formatStringToNumber(buy_price_3, true, 2)}
            </Text>
            <div
              className='absolute -bottom-[1px] left-0 h-[3px] border-none'
              style={{
                width: (+buy_volume_3 / maxVolume) * 100 + '%',
                backgroundColor: getColor(+buy_price_3, stockData?.r || 0)?.backgroundColor,
              }}
            ></div>
          </div>

          <div className='pr-[16px]'>
            <Text
              type='body-12-regular'
              className={classNames(
                'inline-block self-end p-[4px] text-[#474D57]',
                useToggleClassStock(
                  buy_volume_3 !== pre_buy_volume_3 && +buy_price_3 > (stockData?.r || 0),
                  buy_volume_3 !== pre_buy_volume_3 && +buy_price_3 < (stockData?.r || 0),
                  buy_volume_3 !== pre_buy_volume_3 && +buy_price_3 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {formatNumber((Number(buy_volume_3) || 0) * 10)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TableBid);
