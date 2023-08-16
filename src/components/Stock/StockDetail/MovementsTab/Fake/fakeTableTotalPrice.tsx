import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

const FakeTotalPrice = () => {
  const { t } = useTranslation(['stock', 'common']);
  return (
    <div className='flex flex-wrap'>
      <div className='w-1/2 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_vol')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {})}
          type='body-12-regular'
        >
          {formatStringToNumber(0)}
        </Text>
      </div>

      <div className='w-1/2 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_val')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {})}
          type='body-12-regular'
        >
          {formatStringToNumber(0)}
        </Text>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.foreign_buy')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {})}
          type='body-12-regular'
        >
          {formatStringToNumber(0)}
        </Text>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.total_room')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {})}
          type='body-12-regular'
        >
          {formatStringToNumber(0)}
        </Text>
      </div>

      <div className='w-1/3 border border-solid border-[#E6E6E6] pb-[6px] pt-[10px] text-center tablet:w-1/5'>
        <Text type='body-12-regular' className='text-[#474D57]'>
          {t('movements.foreign_sell')}
        </Text>
        <Text
          className={classNames('mt-[2px] inline-block px-[6px] py-[4px] text-[#0D0D0D]', {})}
          type='body-12-regular'
        >
          {formatStringToNumber(0)}
        </Text>
      </div>
    </div>
  );
};

export default FakeTotalPrice;
