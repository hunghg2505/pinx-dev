import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/Profile';

const Following = () => {
  const { t } = useTranslation('profile');
  const profileUser = useContext<any>(profileUserContext);

  return (
    <p className=' text-[12px] tablet:flex tablet:flex-col-reverse'>
      <b className='mr-[8px] font-[600] leading-[18px] text-neutral_black tablet:text-primary_blue'>
        {profileUser?.totalFollowing || 0}
      </b>
      <span className='leading-[16px] text-dark_grey tablet:leading-[18px]'>
        {t('following')}
        <span className='hidden tablet:inline'>:</span>
      </span>
    </p>
  );
};
export default Following;
