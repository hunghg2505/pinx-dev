import React, { useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatNumber, formatStringToNumber } from '@utils/common';

import styles from './index.module.scss';

interface IMovementsTabProps {
  stockData?: IStockData;
  preDataStock?: IStockData;
}

export const getColor = (price: number, ref: number) => {
  if (price === ref) {
    return {
      color: '#EAA100',
      backgroundColor: '#F4E7CD',
    };
  }

  if (price < ref) {
    return {
      color: '#DA314F',
      backgroundColor: '#F5E4E7',
    };
  }

  if (price > ref) {
    return {
      color: '#128F63',
      backgroundColor: '#B6DFD1',
    };
  }

  return {
    color: '#474D57',
    backgroundColor: '#CCCCCC',
  };
};

const MovementsTab = ({ stockData, preDataStock }: IMovementsTabProps) => {
  const { t } = useTranslation(['stock', 'common']);

  const {
    buy_price_1,
    buy_volume_1,
    buy_price_2,
    buy_volume_2,
    buy_price_3,
    buy_volume_3,
    sell_price_1,
    sell_volume_1,
    sell_price_2,
    sell_volume_2,
    sell_price_3,
    sell_volume_3,
    maxVolume,
  } = useMemo(() => {
    const [buy_price_1, buy_volume_1] = (stockData?.g1 || '').split('|');
    const [buy_price_2, buy_volume_2] = (stockData?.g2 || '').split('|');
    const [buy_price_3, buy_volume_3] = (stockData?.g3 || '').split('|');
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
      buy_price_1,
      buy_volume_1,
      buy_price_2,
      buy_volume_2,
      buy_price_3,
      buy_volume_3,
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

  const {
    isTotalVolIncrease,
    isTotalVolDecrease,
    isFbVolIncrease,
    isFbVolDecrease,
    isFRoomIncrease,
    isFRoomDecrease,
    isFsVolumeIncrease,
    isFsVolumeDecrease,
  } = useMemo(() => {
    const isTotalVolIncrease =
      stockData?.lot &&
      preDataStock?.lot &&
      stockData?.lot !== preDataStock?.lot &&
      stockData?.lot > preDataStock?.lot;

    const isTotalVolDecrease =
      stockData?.lot &&
      preDataStock?.lot &&
      stockData?.lot !== preDataStock?.lot &&
      stockData?.lot < preDataStock?.lot;

    const isFbVolIncrease =
      stockData?.fBVol &&
      preDataStock?.fBVol &&
      stockData?.fBVol !== preDataStock?.fBVol &&
      stockData?.fBVol > preDataStock?.fBVol;

    const isFbVolDecrease =
      stockData?.fBVol &&
      preDataStock?.fBVol &&
      stockData?.fBVol !== preDataStock?.fBVol &&
      stockData?.fBVol < preDataStock?.fBVol;

    const isFRoomIncrease =
      stockData?.fRoom &&
      preDataStock?.fRoom &&
      stockData?.fRoom !== preDataStock?.fRoom &&
      stockData?.fRoom > preDataStock?.fRoom;

    const isFRoomDecrease =
      stockData?.fRoom &&
      preDataStock?.fRoom &&
      stockData?.fRoom !== preDataStock?.fRoom &&
      stockData?.fRoom < preDataStock?.fRoom;

    const isFsVolumeIncrease =
      stockData?.fSVolume &&
      preDataStock?.fSVolume &&
      stockData?.fSVolume !== preDataStock?.fSVolume &&
      stockData?.fSVolume > preDataStock?.fSVolume;

    const isFsVolumeDecrease =
      stockData?.fSVolume &&
      preDataStock?.fSVolume &&
      stockData?.fSVolume !== preDataStock?.fSVolume &&
      stockData?.fSVolume < preDataStock?.fSVolume;

    return {
      isTotalVolIncrease,
      isTotalVolDecrease,
      isFbVolIncrease,
      isFbVolDecrease,
      isFRoomIncrease,
      isFRoomDecrease,
      isFsVolumeIncrease,
      isFsVolumeDecrease,
    };
  }, [stockData, preDataStock]);

  return (
    <>
      <div className=''>
        <div className='flex justify-between'>
          <table className='flex-1'>
            <tbody>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    {t('movements.high')}
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#0D0D0D]'>
                    {stockData?.highPrice}
                  </Text>
                </td>
              </tr>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    {t('movements.low')}
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#0D0D0D]'>
                    {stockData?.lowPrice}
                  </Text>
                </td>
              </tr>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='text-[#474D57]'>
                    {t('movements.last_price')}
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#0D0D0D]'>
                    {stockData?.lastPrice}
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>

          <table
            className={classNames(
              'w-[55%] border-separate border-spacing-0 overflow-hidden rounded-[12px] border border-solid border-[#E6E6E6] laptop-max:w-[51.5vw]',
              styles.tableRedBorder,
            )}
          >
            <tbody>
              <tr className='h-[32px]'>
                <td
                  className='pl-[16px] align-middle'
                  style={{ color: getColor(+sell_price_3, stockData?.r || 0)?.color }}
                >
                  <Text
                    type='body-12-semibold'
                    className={classNames('inline-block px-[4px]', {
                      [styles.isIncrease]:
                        sell_price_3 !== pre_sell_price_3 && +sell_price_3 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        sell_price_3 !== pre_sell_price_3 && +sell_price_3 < (stockData?.r || 0),
                      [styles.isEqual]:
                        sell_price_3 !== pre_sell_price_3 && +sell_price_3 === (stockData?.r || 0),
                    })}
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
                </td>
                <td className='pr-[8px] text-right align-middle'>
                  <Text
                    type='body-10-regular'
                    className={classNames('inline-block px-[4px] text-[#474D57]', {
                      [styles.isIncrease]:
                        sell_volume_3 !== pre_sell_volume_3 && +sell_price_3 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        sell_volume_3 !== pre_sell_volume_3 && +sell_price_3 < (stockData?.r || 0),
                      [styles.isEqual]:
                        sell_volume_3 !== pre_sell_volume_3 &&
                        +sell_price_3 === (stockData?.r || 0),
                    })}
                  >
                    {formatNumber((Number(sell_volume_3) || 0) * 10)}
                  </Text>
                </td>
              </tr>

              <tr className='h-[32px]'>
                <td
                  className='pl-[16px] align-middle'
                  style={{ color: getColor(+sell_price_2, stockData?.r || 0)?.color }}
                >
                  <Text
                    type='body-12-semibold'
                    className={classNames('inline-block px-[4px]', {
                      [styles.isIncrease]:
                        sell_price_2 !== pre_sell_price_2 && +sell_price_2 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        sell_price_2 !== pre_sell_price_2 && +sell_price_2 < (stockData?.r || 0),
                      [styles.isEqual]:
                        sell_price_2 !== pre_sell_price_2 && +sell_price_2 === (stockData?.r || 0),
                    })}
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
                </td>
                <td className='pr-[8px] text-right align-middle'>
                  <Text
                    type='body-10-regular'
                    className={classNames('inline-block px-[4px] text-[#474D57]', {
                      [styles.isIncrease]:
                        sell_volume_2 !== pre_sell_volume_2 && +sell_price_2 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        sell_volume_2 !== pre_sell_volume_2 && +sell_price_2 < (stockData?.r || 0),
                      [styles.isEqual]:
                        sell_volume_2 !== pre_sell_volume_2 &&
                        +sell_price_2 === (stockData?.r || 0),
                    })}
                  >
                    {formatNumber((Number(sell_volume_2) || 0) * 10)}
                  </Text>
                </td>
              </tr>

              <tr className='h-[32px]'>
                <td
                  className='pl-[16px] align-middle'
                  style={{ color: getColor(+sell_price_1, stockData?.r || 0)?.color }}
                >
                  <Text
                    type='body-12-semibold'
                    className={classNames('inline-block px-[4px]', {
                      [styles.isIncrease]:
                        sell_price_1 !== pre_sell_price_1 && +sell_price_1 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        sell_price_1 !== pre_sell_price_1 && +sell_price_1 < (stockData?.r || 0),
                      [styles.isEqual]:
                        sell_price_1 !== pre_sell_price_1 && +sell_price_1 === (stockData?.r || 0),
                    })}
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
                </td>
                <td className='pr-[8px] text-right align-middle'>
                  <Text
                    type='body-10-regular'
                    className={classNames('inline-block px-[4px] text-[#474D57]', {
                      [styles.isIncrease]:
                        sell_volume_1 !== pre_sell_volume_1 && +sell_price_1 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        sell_volume_1 !== pre_sell_volume_1 && +sell_price_1 < (stockData?.r || 0),
                      [styles.isEqual]:
                        sell_volume_1 !== pre_sell_volume_1 &&
                        +sell_price_1 === (stockData?.r || 0),
                    })}
                  >
                    {formatNumber((Number(sell_volume_1) || 0) * 10)}
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='mt-[12px] flex justify-between'>
          <table
            className={classNames(
              'w-[55%] border-separate border-spacing-0 overflow-hidden rounded-[12px] border border-solid border-[#E6E6E6] laptop-max:w-[51.5vw]',
              styles.tableGreenBorder,
            )}
          >
            <tbody>
              <tr className='h-[32px]'>
                <td className='pl-[8px] align-middle'>
                  <Text
                    type='body-10-regular'
                    className={classNames('inline-block px-[4px] text-[#474D57]', {
                      [styles.isIncrease]:
                        buy_volume_1 !== pre_buy_volume_1 && +buy_price_1 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        buy_volume_1 !== pre_buy_volume_1 && +buy_price_1 < (stockData?.r || 0),
                      [styles.isEqual]:
                        buy_volume_1 !== pre_buy_volume_1 && +buy_price_1 === (stockData?.r || 0),
                    })}
                  >
                    {formatNumber((Number(buy_volume_1) || 0) * 10)}
                  </Text>
                </td>
                <td
                  className='pr-[16px] text-right align-middle'
                  style={{ color: getColor(+buy_price_1, stockData?.r || 0)?.color }}
                >
                  <Text
                    type='body-12-semibold'
                    className={classNames('inline-block px-[4px]', {
                      [styles.isIncrease]:
                        buy_price_1 !== pre_buy_price_1 && +buy_price_1 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        buy_price_1 !== pre_buy_price_1 && +buy_price_1 < (stockData?.r || 0),
                      [styles.isEqual]:
                        buy_price_1 !== pre_buy_price_1 && +buy_price_1 === (stockData?.r || 0),
                    })}
                  >
                    {Number.isNaN(+buy_price_1)
                      ? buy_price_1
                      : formatStringToNumber(buy_price_1, true, 2)}
                  </Text>
                  <div
                    className='absolute -bottom-[1px] right-0 h-[3px] border-none'
                    style={{
                      width: (+buy_volume_1 / maxVolume) * 100 + '%',
                      backgroundColor: getColor(+buy_price_1, stockData?.r || 0)?.backgroundColor,
                    }}
                  ></div>
                </td>
              </tr>

              <tr className='h-[32px]'>
                <td className='pl-[8px] align-middle'>
                  <Text
                    type='body-10-regular'
                    className={classNames('inline-block px-[4px] text-[#474D57]', {
                      [styles.isIncrease]:
                        buy_volume_2 !== pre_buy_volume_2 && +buy_price_2 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        buy_volume_2 !== pre_buy_volume_2 && +buy_price_2 < (stockData?.r || 0),
                      [styles.isEqual]:
                        buy_volume_2 !== pre_buy_volume_2 && +buy_price_2 === (stockData?.r || 0),
                    })}
                  >
                    {formatNumber((Number(buy_volume_2) || 0) * 10)}
                  </Text>
                </td>
                <td
                  className='pr-[16px] text-right align-middle'
                  style={{ color: getColor(+buy_price_2, stockData?.r || 0)?.color }}
                >
                  <Text
                    type='body-12-semibold'
                    className={classNames('inline-block px-[4px]', {
                      [styles.isIncrease]:
                        buy_price_2 !== pre_buy_price_2 && +buy_price_2 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        buy_price_2 !== pre_buy_price_2 && +buy_price_2 < (stockData?.r || 0),
                      [styles.isEqual]:
                        buy_price_2 !== pre_buy_price_2 && +buy_price_2 === (stockData?.r || 0),
                    })}
                  >
                    {Number.isNaN(+buy_price_2)
                      ? buy_price_2
                      : formatStringToNumber(buy_price_2, true, 2)}
                  </Text>
                  <div
                    className='absolute -bottom-[1px] right-0 h-[3px] border-none'
                    style={{
                      width: (+buy_volume_2 / maxVolume) * 100 + '%',
                      backgroundColor: getColor(+buy_price_2, stockData?.r || 0)?.backgroundColor,
                    }}
                  ></div>
                </td>
              </tr>

              <tr className='h-[32px]'>
                <td className='pl-[8px] align-middle'>
                  <Text
                    type='body-10-regular'
                    className={classNames('inline-block px-[4px] text-[#474D57]', {
                      [styles.isIncrease]:
                        buy_volume_3 !== pre_buy_volume_3 && +buy_price_3 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        buy_volume_3 !== pre_buy_volume_3 && +buy_price_3 < (stockData?.r || 0),
                      [styles.isEqual]:
                        buy_volume_3 !== pre_buy_volume_3 && +buy_price_3 === (stockData?.r || 0),
                    })}
                  >
                    {formatNumber((Number(buy_volume_3) || 0) * 10)}
                  </Text>
                </td>
                <td
                  className='pr-[16px] text-right align-middle'
                  style={{ color: getColor(+buy_price_3, stockData?.r || 0)?.color }}
                >
                  <Text
                    type='body-12-semibold'
                    className={classNames('inline-block px-[4px]', {
                      [styles.isIncrease]:
                        buy_price_3 !== pre_buy_price_3 && +buy_price_3 > (stockData?.r || 0),
                      [styles.isDecrease]:
                        buy_price_3 !== pre_buy_price_3 && +buy_price_3 < (stockData?.r || 0),
                      [styles.isEqual]:
                        buy_price_3 !== pre_buy_price_3 && +buy_price_3 === (stockData?.r || 0),
                    })}
                  >
                    {Number.isNaN(+buy_price_3)
                      ? buy_price_3
                      : formatStringToNumber(buy_price_3, true, 2)}
                  </Text>
                  <div
                    className='absolute -bottom-[1px] right-0 h-[3px] border-none'
                    style={{
                      width: (+buy_volume_3 / maxVolume) * 100 + '%',
                      backgroundColor: getColor(+buy_price_3, stockData?.r || 0)?.backgroundColor,
                    }}
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>

          <table className='flex-1'>
            <tbody>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='pl-[12px] text-[#474D57]'>
                    {t('movements.ceiling')}
                  </Text>
                </td>
                <td className='text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#782AF9]'>
                    {stockData?.c}
                  </Text>
                </td>
              </tr>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='pl-[12px] text-[#474D57]'>
                    {t('movements.ref')}
                  </Text>
                </td>
                <td className='text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#EAA100]'>
                    {stockData?.r}
                  </Text>
                </td>
              </tr>
              <tr className='h-[32px]'>
                <td className='align-middle'>
                  <Text type='body-12-regular' className='pl-[12px] text-[#474D57]'>
                    {t('movements.floor')}
                  </Text>
                </td>
                <td className='text-right align-middle'>
                  <Text type='body-12-regular' className='text-[#08AADD]'>
                    {stockData?.f}
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-[20px] flex flex-wrap'>
        <div className='w-1/2 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.total_vol')}
          </Text>
          <Text
            className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
              [styles.isDecrease]: isTotalVolDecrease,
              [styles.isIncrease]: isTotalVolIncrease,
            })}
            type='body-12-regular'
          >
            {formatStringToNumber((Number(stockData?.lot || 0) * 10).toString())}
          </Text>
        </div>

        <div className='w-1/2 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.total_val')}
          </Text>
          <Text
            className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
              [styles.isDecrease]: isTotalVolDecrease,
              [styles.isIncrease]: isTotalVolIncrease,
            })}
            type='body-12-regular'
          >
            {formatStringToNumber(
              (Number(stockData?.lot) * Number(stockData?.avePrice) * 10_000).toString(),
            )}
          </Text>
        </div>

        <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.foreign_buy')}
          </Text>
          <Text
            className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
              [styles.isDecrease]: isFbVolDecrease,
              [styles.isIncrease]: isFbVolIncrease,
            })}
            type='body-12-regular'
          >
            {formatStringToNumber(((Number(stockData?.fBVol) || 0) * 10).toString())}
          </Text>
        </div>

        <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.total_room')}
          </Text>
          <Text
            className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
              [styles.isDecrease]: isFRoomDecrease,
              [styles.isIncrease]: isFRoomIncrease,
            })}
            type='body-12-regular'
          >
            {formatStringToNumber(((Number(stockData?.fRoom) || 0) * 10).toString())}
          </Text>
        </div>

        <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.foreign_sell')}
          </Text>
          <Text
            className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {
              [styles.isDecrease]: isFsVolumeDecrease,
              [styles.isIncrease]: isFsVolumeIncrease,
            })}
            type='body-12-regular'
          >
            {formatStringToNumber(((Number(stockData?.fSVolume) || 0) * 10).toString())}
          </Text>
        </div>
      </div>
    </>
  );
};

export default MovementsTab;
