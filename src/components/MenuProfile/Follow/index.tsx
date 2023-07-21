import React from 'react';

import { useTranslation } from 'next-i18next';

const Follow = ({ follower, following }: { follower: number; following: number }) => {
  const { t } = useTranslation('common');
  return (
    <>
      <div className='flex items-center px-[16px] pb-[12px]'>
        {' '}
        <div className='flex w-[50%] justify-center'>
          <b className='mr-[16px]'>{follower ?? 0}</b>
          {t('follower')}
        </div>
        <div className='h-[27px] w-[1px] bg-neutral_07 '></div>
        <div className='flex w-[50%] justify-center'>
          <b className='mr-[16px]'>{following ?? 0}</b>
          {t('following')}
        </div>
      </div>
      <hr className='border-neutral_07' />
    </>
  );
};
export default Follow;
