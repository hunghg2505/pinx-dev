import React, { memo } from 'react';

import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

interface ITablePrice1Props {
  stockData?: IStockData;
}

const TablePrice1 = ({ stockData }: ITablePrice1Props) => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <table className='w-full'>
      <tbody>
        <tr className='h-[41px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[20px] text-[#474D57] small-mobile-max:pl-0'>
              {t('movements.high')}
            </Text>
          </td>
          <td className='pr-[20px] text-right align-middle small-mobile-max:pr-0'>
            <Text type='body-12-regular' className='text-[#0D0D0D]'>
              {formatStringToNumber(stockData?.highPrice, true, 2) || 0}
            </Text>
          </td>
        </tr>
        <tr className='h-[41px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[20px] text-[#474D57] small-mobile-max:pl-0'>
              {t('movements.low')}
            </Text>
          </td>
          <td className='pr-[20px] text-right align-middle small-mobile-max:pr-0'>
            <Text type='body-12-regular' className='text-[#0D0D0D]'>
              {formatStringToNumber(stockData?.lowPrice, true, 2) || 0}
            </Text>
          </td>
        </tr>
        <tr className='h-[41px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[20px] text-[#474D57] small-mobile-max:pl-0'>
              {t('movements.last_price')}
            </Text>
          </td>
          <td className='pr-[20px] text-right align-middle small-mobile-max:pr-0'>
            <Text type='body-12-regular' className='text-[#0D0D0D]'>
              {formatStringToNumber(stockData?.lastPrice.toString(), true, 2) || 0}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default memo(TablePrice1);
