import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

import styles from '../index.module.scss';

const FakeTablePrice1 = () => {
  const { t } = useTranslation('stock');

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
              {formatStringToNumber(0, true, 2)}
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
              {formatStringToNumber(0, true, 2)}
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
              {formatStringToNumber(0, true, 2)}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FakeTablePrice1;
