import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

const Joined = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);

  return (
    <p className='text-[10px] text-primary_gray tablet:absolute tablet:bottom-[calc(100%+50px)] tablet:right-0 tablet:text-[12px] tablet:text-dark_grey'>
      {t('joined')}{' '}
      <span className='  tablet:font-[600] tablet:text-neutral_black'>
        {new Date(profileUser?.createdAt)?.getFullYear()}
      </span>
    </p>
  );
};
export default Joined;
