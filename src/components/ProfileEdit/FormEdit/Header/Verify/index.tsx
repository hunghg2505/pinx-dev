import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/ProfileEdit';

const Verify = () => {
  const profileUser = useContext<any>(profileUserContext);
  const { t } = useTranslation('editProfile');

  return (
    <div className='mb-[20px]'>
      {profileUser?.acntStat === 'ACTIVE' && (
        <span className='text[12px] line-[16px] font[500] mx-auto flex items-center justify-center gap-[4px] text-green'>
          {t('verified')}
        </span>
      )}
      {profileUser?.acntStat === 'VSD_PENDING' && (
        <span className='text[12px] line-[16px] font[500] mx-auto flex items-center justify-center gap-[4px] text-orange'>
          {t('pending')}
        </span>
      )}
      {!profileUser?.acntStat && (
        <span className='text[12px] line-[16px] font[500] mx-auto flex items-center justify-center gap-[4px] text-orange'>
          {t('unverified')}
        </span>
      )}
    </div>
  );
};
export default Verify;
