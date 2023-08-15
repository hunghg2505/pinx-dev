import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

import styles from '../index.module.scss';

interface ITablePrice1Props {
  stockData?: IStockData;
}

const TablePrice1 = ({ stockData }: ITablePrice1Props) => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <table className={classNames('w-full', styles.tablePrice)}>
      <tbody>
        <tr className='h-[36px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='text-[#474D57] tablet:pl-[10px]'>
              {t('movements.high')}
            </Text>
          </td>
          <td className='pr-[10px] text-right align-middle'>
            <Text type='body-12-regular' className='text-[#0D0D0D]'>
              {formatStringToNumber(stockData?.highPrice, true, 2)}
            </Text>
          </td>
        </tr>
        <tr className='h-[36px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='text-[#474D57] tablet:pl-[10px]'>
              {t('movements.low')}
            </Text>
          </td>
          <td className='pr-[10px] text-right align-middle'>
            <Text type='body-12-regular' className='text-[#0D0D0D]'>
              {formatStringToNumber(stockData?.lowPrice, true, 2)}
            </Text>
          </td>
        </tr>
        <tr className='h-[36px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='text-[#474D57] tablet:pl-[10px]'>
              {t('movements.last_price')}
            </Text>
          </td>
          <td className='pr-[10px] text-right align-middle'>
            <Text type='body-12-regular' className='text-[#0D0D0D]'>
              {formatStringToNumber(stockData?.lastPrice.toString(), true, 2)}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TablePrice1;
