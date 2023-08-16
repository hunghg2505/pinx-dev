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
      <div className='flex items-center px-[16px] pb-[12px]'>
        {' '}
        <CustomLink
          href={ROUTE_PATH.MY_PROFILE_FOLLOWER}
          linkClassName='flex w-[50%] justify-center'
          onClick={() => {
            close();
          }}
        >
          <b className='mr-[16px]'>{follower ?? 0}</b>
          {t('followers')}
        </CustomLink>
        <div className='h-[27px] w-[1px] bg-neutral_07 '></div>
        <CustomLink
          href={ROUTE_PATH.MY_PROFILE_FOLLOWING}
          linkClassName='flex w-[50%] justify-center'
          onClick={() => {
            close();
          }}
        >
          <b className='mr-[16px]'>{following ?? 0}</b>
          {t('following')}
        </CustomLink>
      </div>
      <hr className='border-neutral_07' />
    </>
  );
};
export default Follow;
