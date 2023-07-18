import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/ProfileEdit';

const Verify = () => {
  const profileUser = useContext<any>(profileUserContext);
  const { t } = useTranslation('editProfile');
  return (
    <div className='mb-[20px]'>
      {profileUser?.acntStat === 'ACTIVE' ? (
        <span className='text[12px] line-[16px] font[500] mx-auto flex items-center justify-center gap-[4px] text-green'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13.3327 4L5.99935 11.3333L2.66602 8'
              stroke='#128F63'
              strokeWidth='1.7'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          {t('verified')}
        </span>
      ) : (
        <span className='text[12px] line-[16px] font[500] mx-auto flex items-center justify-center gap-[4px] text-orange'>
          {t('unverified')}
        </span>
      )}
    </div>
  );
};
export default Verify;
