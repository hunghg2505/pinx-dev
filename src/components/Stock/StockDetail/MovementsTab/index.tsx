import React, { useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatNumber } from '@utils/common';

import styles from './index.module.scss';

interface IMovementsTabProps {
  stockData?: IStockData;
}

const MovementsTab = ({ stockData }: IMovementsTabProps) => {
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
  } = useMemo(() => {
    const [buy_price_1, buy_volume_1] = (stockData?.g1 || '').split('|');
    const [buy_price_2, buy_volume_2] = (stockData?.g2 || '').split('|');
    const [buy_price_3, buy_volume_3] = (stockData?.g3 || '').split('|');
    const [sell_price_1, sell_volume_1] = (stockData?.g4 || '').split('|');
    const [sell_price_2, sell_volume_2] = (stockData?.g5 || '').split('|');
    const [sell_price_3, sell_volume_3] = (stockData?.g6 || '').split('|');

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
    };
  }, [stockData]);

  return (
    <>
      <div className='flex flex-col flex-wrap gap-y-[12px] tablet:flex-row tablet:gap-x-[15px]'>
        <div className='flex flex-1'>
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
              'w-[203px] border-separate border-spacing-0 overflow-hidden rounded-[12px] border border-solid border-[#F5E4E7]',
              styles.tableRedBorder,
            )}
          >
            <tbody>
              <tr className='h-[32px]'>
                <td className='pl-[20px] align-middle'>
                  <Text type='body-12-semibold' className='text-[#DA314F]'>
                    {formatNumber(Number(sell_price_3) || 0)}
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    {formatNumber(Number(sell_volume_3) || 0)}
                  </Text>
                </td>
                <div className='absolute bottom-0 left-0 h-[3px] w-[90%] border-none bg-[#f5e4e7]'></div>
              </tr>
              <tr className='h-[32px]'>
                <td className='pl-[20px] align-middle'>
                  <Text type='body-12-semibold' className='text-[#DA314F]'>
                    {formatNumber(Number(sell_price_2) || 0)}
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    {formatNumber(Number(sell_volume_2) || 0)}
                  </Text>
                </td>
                <div className='absolute bottom-0 left-0 h-[3px] w-[40%] border-none bg-[#f5e4e7]'></div>
              </tr>
              <tr className='h-[32px]'>
                <td className='pl-[20px] align-middle'>
                  <Text type='body-12-semibold' className='text-[#DA314F]'>
                    {formatNumber(Number(sell_price_1) || 0)}
                  </Text>
                </td>
                <td className='pr-[12px] text-right align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    {formatNumber(Number(sell_volume_1) || 0)}
                  </Text>
                </td>
                <div className='absolute bottom-0 left-0 h-[3px] w-[50%] border-none bg-[#f5e4e7]'></div>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='flex flex-1'>
          <table
            className={classNames(
              'w-[203px] border-separate border-spacing-0 overflow-hidden rounded-[12px] border border-solid border-[#B6DFD1]',
              styles.tableGreenBorder,
            )}
          >
            <tbody>
              <tr className='h-[32px]'>
                <td className='pl-[12px] align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    {formatNumber(Number(buy_volume_1) || 0)}
                  </Text>
                </td>
                <td className='pr-[20px] text-right align-middle'>
                  <Text type='body-12-semibold' className='semantic-2-1'>
                    {formatNumber(Number(buy_price_1) || 0)}
                  </Text>
                </td>
                <div className='absolute bottom-0 right-0 h-[3px] w-[50%] border-none bg-[#B6DFD1]'></div>
              </tr>
              <tr className='h-[32px]'>
                <td className='pl-[12px] align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    {formatNumber(Number(buy_volume_2) || 0)}
                  </Text>
                </td>
                <td className='pr-[20px] text-right align-middle'>
                  <Text type='body-12-semibold' className='semantic-2-1'>
                    {formatNumber(Number(buy_price_2) || 0)}
                  </Text>
                </td>
                <div className='absolute bottom-0 right-0 h-[3px] w-[20%] border-none bg-[#B6DFD1]'></div>
              </tr>
              <tr className='h-[32px]'>
                <td className='pl-[12px] align-middle'>
                  <Text type='body-10-regular' className='text-[#474D57]'>
                    {formatNumber(Number(buy_volume_3) || 0)}
                  </Text>
                </td>
                <td className='pr-[20px] text-right align-middle'>
                  <Text type='body-12-semibold' className='semantic-2-1'>
                    {formatNumber(Number(buy_price_3) || 0)}
                  </Text>
                </td>
                <div className='absolute bottom-0 right-0 h-[3px] w-[70%] border-none bg-[#B6DFD1]'></div>
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
                  <Text type='body-12-regular' className='text-[#B349C3]'>
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
        <div className='w-1/2 border border-solid border-[#E6E6E6] py-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.total_vol')}
          </Text>
          <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
            {formatNumber(Number(stockData?.lot || 0))}
          </Text>
        </div>

        <div className='w-1/2 border border-solid border-[#E6E6E6] py-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.total_val')}
          </Text>
          <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
            {formatNumber(Number(stockData?.lot) * Number(stockData?.avePrice))}
          </Text>
        </div>

        <div className='w-1/3 border border-solid border-[#E6E6E6] py-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.foreign_buy')}
          </Text>
          <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
            {formatNumber(Number(stockData?.fBVol) || 0)}
          </Text>
        </div>

        <div className='w-1/3 border border-solid border-[#E6E6E6] py-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.total_room')}
          </Text>
          <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
            {formatNumber(Number(stockData?.fRoom) || 0)}
          </Text>
        </div>

        <div className='w-1/3 border border-solid border-[#E6E6E6] py-[10px] text-center tablet:w-1/5'>
          <Text type='body-12-regular' className='text-[#474D57]'>
            {t('movements.foreign_sell')}
          </Text>
          <Text className='mt-[6px] text-[#0D0D0D]' type='body-12-regular'>
            {formatNumber(Number(stockData?.fSVolume) || 0)}
          </Text>
        </div>
      </div>
    </>
  );
};

export default MovementsTab;
