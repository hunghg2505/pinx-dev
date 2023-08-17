import React, { memo } from 'react';

import { useTranslation } from 'next-i18next';

import { IStockData } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

interface ITablePrice2Props {
  stockData?: IStockData;
}

const TablePrice2 = ({ stockData }: ITablePrice2Props) => {
  const { t } = useTranslation(['stock', 'common']);

  return (
    <table className='w-full'>
      <tbody>
        <tr className='h-[41px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[20px] text-[#474D57] small-mobile-max:pl-0'>
              {t('movements.ceiling')}
            </Text>
          </td>
          <td className='pr-[20px] text-right align-middle small-mobile-max:pr-0'>
            <Text type='body-12-regular' className='text-[#782AF9]'>
              {formatStringToNumber(stockData?.c, true, 2)}
            </Text>
          </td>
        </tr>
        <tr className='h-[41px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[20px] text-[#474D57] small-mobile-max:pl-0'>
              {t('movements.ref')}
            </Text>
          </td>
          <td className='pr-[20px] text-right align-middle small-mobile-max:pr-0'>
            <Text type='body-12-regular' className='text-[#F1BA09]'>
              {formatStringToNumber(stockData?.r, true, 2)}
            </Text>
          </td>
        </tr>
        <tr className='h-[41px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[20px] text-[#474D57] small-mobile-max:pl-0'>
              {t('movements.floor')}
            </Text>
          </td>
          <td className='pr-[20px] text-right align-middle small-mobile-max:pr-0'>
            <Text type='body-12-regular' className='text-[#22D1E9]'>
              {formatStringToNumber(stockData?.f, true, 2)}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default memo(TablePrice2);
