import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

const Joined = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);
  const year = new Date(profileUser?.createdAt)?.getFullYear();
  return (
    <div className='text-[12px] text-primary_gray tablet:absolute tablet:bottom-[calc(100%+50px)] tablet:right-0 tablet:text-[12px] tablet:text-dark_grey'>
      {t('joined')}{' '}
      <span className='  tablet:font-[600] tablet:text-neutral_black'>
        <>{year}</>
      </span>
    </div>
  );
};
export default Joined;
