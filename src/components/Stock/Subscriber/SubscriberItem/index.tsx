import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { ICustomerInfo } from '@components/Post/service';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

interface ISubscriberItemProps {
  data: ICustomerInfo;
}

const SubscriberItem = ({ data }: ISubscriberItemProps) => {
  const { t } = useTranslation(['stock', 'commmon']);

  return (
    <div className='flex items-center rounded-[16px] border border-solid border-[#EBEBEB] p-[16px]'>
      <Link href={ROUTE_PATH.PROFILE_DETAIL(data.customerId)}>
        <img
          src={data.avatar}
          alt='User avatar'
          className='h-[36px] w-[36px] rounded-full object-cover'
        />
      </Link>

      <div className='ml-[8px]'>
        <Link href={ROUTE_PATH.PROFILE_DETAIL(data.customerId)}>
          <Text type='body-14-semibold' className='text-[#474D57]'>
            {data.displayName}
          </Text>
        </Link>
        <Text type='body-12-regular' color='neutral-5' className='mt-[2px]'>
          {data.totalFollowers} {t('common:followers')}
        </Text>
      </div>

      <div className='ml-auto flex h-[36px] w-[36px] items-center justify-center rounded-full border border-solid border-[#EBEBEB]'>
        {data.isInvesting ? (
          <img
            src='/static/icons/iconTreeNoShadow.svg'
            alt='Tree icon'
            className='h-[14px] w-[16px] object-contain'
          />
        ) : (
          <img
            src='/static/icons/iconHeartActiveNoShadow.svg'
            alt='Heart icon'
            className='h-[17px] w-[17px] object-contain'
          />
        )}
      </div>
    </div>
  );
};

export default SubscriberItem;
