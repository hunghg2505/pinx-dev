import React from 'react';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { ROUTE_PATH } from '@utils/common';

const Follow = ({
  follower,
  following,
  close,
}: {
  follower: number;
  following: number;
  close: () => void;
}) => {
  const { t } = useTranslation('common');
  return (
    <>
      <div className='flex items-center px-[16px] pb-[12px]'>
        {' '}
        <Link
          href={ROUTE_PATH.MY_PROFILE_FOLLOWER}
          className='flex w-[50%] justify-center'
          onClick={() => {
            close();
          }}
        >
          <b className='mr-[16px]'>{follower ?? 0}</b>
          {t('followers')}
        </Link>
        <div className='h-[27px] w-[1px] bg-neutral_07 '></div>
        <Link
          href={ROUTE_PATH.MY_PROFILE_FOLLOWING}
          className='flex w-[50%] justify-center'
          onClick={() => {
            close();
          }}
        >
          <b className='mr-[16px]'>{following ?? 0}</b>
          {t('following')}
        </Link>
      </div>
      <hr className='border-neutral_07' />
    </>
  );
};
export default Follow;
