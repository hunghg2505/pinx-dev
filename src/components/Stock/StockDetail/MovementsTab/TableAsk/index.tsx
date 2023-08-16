import React, { memo, useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import useToggleClassStock from '@hooks/useToggleClassStock';
import { formatNumber, formatStringToNumber } from '@utils/common';

import { getColor } from '..';
import styles from '../index.module.scss';

interface ITableAskProps {
  stockData?: IStockData;
  preDataStock?: IStockData;
  className?: string;
}

const TableAsk = ({ stockData, preDataStock, className }: ITableAskProps) => {
  const { t } = useTranslation(['stock', 'common']);

  const {
    sell_price_1,
    sell_volume_1,
    sell_price_2,
    sell_volume_2,
    sell_price_3,
    sell_volume_3,
    maxVolume,
  } = useMemo(() => {
    const [, buy_volume_1] = (stockData?.g1 || '').split('|');
    const [, buy_volume_2] = (stockData?.g2 || '').split('|');
    const [, buy_volume_3] = (stockData?.g3 || '').split('|');
    const [sell_price_1, sell_volume_1] = (stockData?.g4 || '').split('|');
    const [sell_price_2, sell_volume_2] = (stockData?.g5 || '').split('|');
    const [sell_price_3, sell_volume_3] = (stockData?.g6 || '').split('|');
    const maxVolume = Math.max(
      +buy_volume_1,
      +buy_volume_2,
      +buy_volume_3,
      +sell_volume_1,
      +sell_volume_2,
      +sell_volume_3,
    );

    return {
      sell_price_1,
      sell_volume_1,
      sell_price_2,
      sell_volume_2,
      sell_price_3,
      sell_volume_3,
      maxVolume,
      lot: stockData?.lot,
    };
  }, [stockData]);

  const {
    pre_sell_price_1,
    pre_sell_volume_1,
    pre_sell_price_2,
    pre_sell_volume_2,
    pre_sell_price_3,
    pre_sell_volume_3,
  } = useMemo(() => {
    const [pre_sell_price_1, pre_sell_volume_1] = (preDataStock?.g4 || '').split('|');
    const [pre_sell_price_2, pre_sell_volume_2] = (preDataStock?.g5 || '').split('|');
    const [pre_sell_price_3, pre_sell_volume_3] = (preDataStock?.g6 || '').split('|');

    return {
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
        'overflow-hidden rounded-[12px] border border-solid border-[#E6E6E6]',
        className,
      )}
    >
      <div className='hidden border-b border-solid border-[#ebebeb] bg-primary_blue_light py-[10px] text-center tablet:block'>
        <Text type='body-14-semibold' color='neutral-darkgray'>
          {t('ask')}
        </Text>
      </div>

      <div className={styles.stockAsk}>
        <div className='flex h-[36px] items-center justify-between'>
          <div
            className='flex h-full flex-col justify-center pl-[6px]'
            style={{ color: getColor(+sell_price_3, stockData?.r || 0)?.color }}
          >
            <Text
              type='body-12-semibold'
              className={classNames(
                'inline-block self-start p-[4px]',
                useToggleClassStock(
                  sell_price_3 !== pre_sell_price_3 && +sell_price_3 > (stockData?.r || 0),
                  sell_price_3 !== pre_sell_price_3 && +sell_price_3 < (stockData?.r || 0),
                  sell_price_3 !== pre_sell_price_3 && +sell_price_3 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {Number.isNaN(+sell_price_3)
                ? sell_price_3
                : formatStringToNumber(sell_price_3, true, 2)}
            </Text>

            <div
              className='absolute -bottom-[1px] left-0 h-[3px] border-none'
              style={{
                width: (+sell_volume_3 / maxVolume) * 100 + '%',
                backgroundColor: getColor(+sell_price_3, stockData?.r || 0)?.backgroundColor,
              }}
            ></div>
          </div>
          <div className='pr-[6px] text-right'>
            <Text
              type='body-12-regular'
              className={classNames(
                'inline-block p-[4px] text-[#474D57]',
                useToggleClassStock(
                  sell_volume_3 !== pre_sell_volume_3 && +sell_price_3 > (stockData?.r || 0),
                  sell_volume_3 !== pre_sell_volume_3 && +sell_price_3 < (stockData?.r || 0),
                  sell_volume_3 !== pre_sell_volume_3 && +sell_price_3 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {formatNumber((Number(sell_volume_3) || 0) * 10)}
            </Text>
          </div>
        </div>

        <div className='flex h-[36px] items-center justify-between'>
          <div
            className='flex h-full flex-col justify-center pl-[6px]'
            style={{ color: getColor(+sell_price_2, stockData?.r || 0)?.color }}
          >
            <Text
              type='body-12-semibold'
              className={classNames(
                'inline-block self-start p-[4px]',
                useToggleClassStock(
                  sell_price_2 !== pre_sell_price_2 && +sell_price_2 > (stockData?.r || 0),
                  sell_price_2 !== pre_sell_price_2 && +sell_price_2 < (stockData?.r || 0),
                  sell_price_2 !== pre_sell_price_2 && +sell_price_2 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {Number.isNaN(+sell_price_2)
                ? sell_price_2
                : formatStringToNumber(sell_price_2, true, 2)}
            </Text>

            <div
              className='absolute -bottom-[1px] left-0 h-[3px] border-none'
              style={{
                width: (+sell_volume_2 / maxVolume) * 100 + '%',
                backgroundColor: getColor(+sell_price_2, stockData?.r || 0)?.backgroundColor,
              }}
            ></div>
          </div>
          <div className='pr-[6px] text-right'>
            <Text
              type='body-12-regular'
              className={classNames(
                'inline-block p-[4px] text-[#474D57]',
                useToggleClassStock(
                  sell_volume_2 !== pre_sell_volume_2 && +sell_price_2 > (stockData?.r || 0),
                  sell_volume_2 !== pre_sell_volume_2 && +sell_price_2 < (stockData?.r || 0),
                  sell_volume_2 !== pre_sell_volume_2 && +sell_price_2 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {formatNumber((Number(sell_volume_2) || 0) * 10)}
            </Text>
          </div>
        </div>

        <div className='flex h-[36px] items-center justify-between'>
          <div
            className='flex h-full flex-col justify-center pl-[6px]'
            style={{ color: getColor(+sell_price_1, stockData?.r || 0)?.color }}
          >
            <Text
              type='body-12-semibold'
              className={classNames(
                'inline-block self-start p-[4px]',
                useToggleClassStock(
                  sell_price_1 !== pre_sell_price_1 && +sell_price_1 > (stockData?.r || 0),
                  sell_price_1 !== pre_sell_price_1 && +sell_price_1 < (stockData?.r || 0),
                  sell_price_1 !== pre_sell_price_1 && +sell_price_1 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {Number.isNaN(+sell_price_1)
                ? sell_price_1
                : formatStringToNumber(sell_price_1, true, 2)}
            </Text>

            <div
              className='absolute -bottom-[1px] left-0 h-[3px] border-none'
              style={{
                width: (+sell_volume_1 / maxVolume) * 100 + '%',
                backgroundColor: getColor(+sell_price_1, stockData?.r || 0)?.backgroundColor,
              }}
            ></div>
          </div>
          <div className='pr-[6px] text-right'>
            <Text
              type='body-12-regular'
              className={classNames(
                'inline-block p-[4px] text-[#474D57]',
                useToggleClassStock(
                  sell_volume_1 !== pre_sell_volume_1 && +sell_price_1 > (stockData?.r || 0),
                  sell_volume_1 !== pre_sell_volume_1 && +sell_price_1 < (stockData?.r || 0),
                  sell_volume_1 !== pre_sell_volume_1 && +sell_price_1 === (stockData?.r || 0),
                  stockData,
                ),
              )}
            >
              {formatNumber((Number(sell_volume_1) || 0) * 10)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TableAsk);
