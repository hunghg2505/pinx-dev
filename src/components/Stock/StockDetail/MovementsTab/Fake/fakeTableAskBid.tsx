import React from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';
import { formatNumber, formatStringToNumber } from '@utils/common';

import styles from '../index.module.scss';

const FakeTableAskBid = () => {
  return (
    <div
      className={classNames(
        'border-separate border-spacing-0 overflow-hidden rounded-[12px] border border-solid border-[#E6E6E6] laptop-max:w-[49vw]',
        styles.stockAsk,
      )}
    >
      <div className={styles.stockAsk}>
        <div className='flex h-[36px] items-center justify-between'>
          <div className='pl-[6px]'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatStringToNumber(0, true, 2)}
            </Text>
          </div>
          <div className='pr-[6px] text-right'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatNumber(0)}
            </Text>
          </div>
        </div>

        <div className='flex h-[36px] items-center justify-between'>
          <div className='pl-[6px]'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatStringToNumber(0, true, 2)}
            </Text>
          </div>
          <div className='pr-[6px] text-right'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatNumber(0)}
            </Text>
          </div>
        </div>

        <div className='flex h-[36px] items-center justify-between'>
          <div className='pl-[6px]'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatStringToNumber(0, true, 2)}
            </Text>
          </div>
          <div className='pr-[6px] text-right'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatNumber(0)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeTableAskBid;
