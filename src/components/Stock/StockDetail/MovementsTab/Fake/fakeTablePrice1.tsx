import React from 'react';

import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

const FakeTablePrice1 = () => {
  const { t } = useTranslation('stock');

  return (
    <table className='w-full'>
      <tbody>
        <tr className='h-[41px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[20px] text-[#474D57]'>
              {t('movements.high')}
            </Text>
          </td>
          <td className='pr-[20px] text-right align-middle'>
            <Text type='body-12-regular' className='text-[#0D0D0D]'>
              {formatStringToNumber('0', true, 2)}
            </Text>
          </td>
        </tr>
        <tr className='h-[41px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[20px] text-[#474D57]'>
              {t('movements.low')}
            </Text>
          </td>
          <td className='pr-[20px] text-right align-middle'>
            <Text type='body-12-regular' className='text-[#0D0D0D]'>
              {formatStringToNumber('0', true, 2)}
            </Text>
          </td>
        </tr>
        <tr className='h-[41px]'>
          <td className='align-middle'>
            <Text type='body-12-regular' className='pl-[20px] text-[#474D57]'>
              {t('movements.last_price')}
            </Text>
          </td>
          <td className='pr-[20px] text-right align-middle'>
            <Text type='body-12-regular' className='text-[#0D0D0D]'>
              {formatStringToNumber('0', true, 2)}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FakeTablePrice1;
