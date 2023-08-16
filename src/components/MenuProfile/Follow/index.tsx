import React from 'react';

import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
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
      <div className='flex items-center px-[16px] pb-[12px] galaxy-max:justify-evenly'>
        {' '}
        <CustomLink
          href={ROUTE_PATH.MY_PROFILE_FOLLOWER}
          className='flex items-center justify-center'
          onClick={() => {
            close();
          }}
        >
          <b className='mr-[16px] galaxy-max:mr-[10px]'>{follower ?? 0}</b>
          <span className='galaxy-max:text-[12px]'>{t('followers')}</span>
        </CustomLink>
        <div className='h-[27px] w-[1px] bg-neutral_07 '></div>
        <CustomLink
          href={ROUTE_PATH.MY_PROFILE_FOLLOWING}
          className='flex items-center justify-center'
          onClick={() => {
            close();
          }}
        >
          <b className='mr-[16px]'>{following ?? 0}</b>
          <span className='galaxy-max:text-[12px]'>{t('following')}</span>
        </CustomLink>
      </div>
      <hr className='border-neutral_07' />
    </>
  );
};
export default Follow;
