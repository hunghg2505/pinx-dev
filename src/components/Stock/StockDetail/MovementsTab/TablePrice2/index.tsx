import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

import styles from '../index.module.scss';

interface ITablePrice2Props {
  stockData?: IStockData;
}

const TablePrice2 = ({ stockData }: ITablePrice2Props) => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <table className={classNames('w-full', styles.tablePrice)}>
      <tbody>
        <tr className='h-[36px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[10px] text-[#474D57]'>
              {t('movements.ceiling')}
            </Text>
          </td>
          <td className='text-right align-middle tablet:pr-[10px]'>
            <Text type='body-12-regular' className='text-[#782AF9]'>
              {formatStringToNumber(stockData?.c, true, 2)}
            </Text>
          </td>
        </tr>
        <tr className='h-[36px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[10px] text-[#474D57]'>
              {t('movements.ref')}
            </Text>
          </td>
          <td className='text-right align-middle tablet:pr-[10px]'>
            <Text type='body-12-regular' className='text-[#F1BA09]'>
              {formatStringToNumber(stockData?.r, true, 2)}
            </Text>
          </td>
        </tr>
        <tr className='h-[36px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[10px] text-[#474D57]'>
              {t('movements.floor')}
            </Text>
          </td>
          <td className='text-right align-middle tablet:pr-[10px]'>
            <Text type='body-12-regular' className='text-[#22D1E9]'>
              {formatStringToNumber(stockData?.f, true, 2)}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TablePrice2;
