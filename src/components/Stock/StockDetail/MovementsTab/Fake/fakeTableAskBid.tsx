import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { formatNumber, formatStringToNumber } from '@utils/common';

import styles from '../index.module.scss';

const FakeTableAskBid = ({ isAsk = false }: { isAsk?: boolean }) => {
  const { t } = useTranslation('stock');

  return (
    <div className='flex items-center overflow-hidden rounded-[12px] border border-solid border-[#EBEBEB]'>
      <div className='flex w-[100px] items-center justify-center self-stretch border-r border-solid border-[#EBEBEB] text-center small-mobile-max:w-[50px]'>
        <Text
          type='body-14-semibold'
          color='neutral-darkgray'
          className='small-mobile-max:text-[12px]'
        >
          {t(isAsk ? 'ask' : 'bid')}
        </Text>
      </div>

      <div className={classNames('flex-1', styles.stockAskBid)}>
        <div className='flex h-[41px] items-center justify-between'>
          <div className='flex h-full flex-col justify-center pl-[16px]'>
            <Text type='body-12-semibold' className='inline-block self-start p-[4px]'>
              {formatStringToNumber('0', true, 2)}
            </Text>
          </div>
          <div className='pr-[16px] text-right'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatNumber(0)}
            </Text>
          </div>
        </div>

        <div className='flex h-[41px] items-center justify-between'>
          <div className='flex h-full flex-col justify-center pl-[16px]'>
            <Text type='body-12-semibold' className='inline-block self-start p-[4px]'>
              {formatStringToNumber('0', true, 2)}
            </Text>
          </div>
          <div className='pr-[16px] text-right'>
            <Text type='body-12-regular' className='inline-block p-[4px] text-[#474D57]'>
              {formatNumber(0)}
            </Text>
          </div>
        </div>

        <div className='flex h-[41px] items-center justify-between'>
          <div className='flex h-full flex-col justify-center pl-[16px]'>
            <Text type='body-12-semibold' className='inline-block self-start p-[4px]'>
              {formatStringToNumber('0', true, 2)}
            </Text>
          </div>
          <div className='pr-[16px] text-right'>
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
