import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

import styles from '../index.module.scss';

const FakeTablePrice2 = () => {
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
              {formatStringToNumber(0, true, 2)}
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
              {formatStringToNumber(0, true, 2)}
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
              {formatStringToNumber(0, true, 2)}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FakeTablePrice2;
