import React from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';
import { formatNumber, formatStringToNumber } from '@utils/common';

import styles from '../index.module.scss';

const FakeTableAskBid = () => {
  return (
    <table
      className={classNames(
        'border-separate border-spacing-0 overflow-hidden rounded-[12px] border border-solid border-[#E6E6E6] laptop-max:w-[49vw]',
        styles.tableAsk,
      )}
    >
      <tbody>
        <tr className='h-[36px]'>
          <td className='pl-[6px] align-middle'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatStringToNumber(0, true, 2)}
            </Text>
          </td>
          <td className='pr-[6px] text-right align-middle'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatNumber(0)}
            </Text>
          </td>
        </tr>

        <tr className='h-[36px]'>
          <td className='pl-[6px] align-middle'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatStringToNumber(0, true, 2)}
            </Text>
          </td>
          <td className='pr-[6px] text-right align-middle'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatNumber(0)}
            </Text>
          </td>
        </tr>

        <tr className='h-[36px]'>
          <td className='pl-[6px] align-middle'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatStringToNumber(0, true, 2)}
            </Text>
          </td>
          <td className='pr-[6px] text-right align-middle'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatNumber(0)}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default FakeTableAskBid;
