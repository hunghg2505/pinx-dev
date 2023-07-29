import React, { useContext } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/ProfileEdit';

const Verify = () => {
  const profileUser = useContext<any>(profileUserContext);
  const { t } = useTranslation('editProfile');
  return (
    <div
      className={classNames(
        'absolute left-[calc(16px+113px/2)] -translate-x-1/2 text-[14px] tablet:left-[calc(10px+100px/2)] xdesktop:left-[calc(32px+120px/2)]',
        {
          'top-[calc(100%+115px)] tablet:top-[calc(100%+110px)] xdesktop:top-[calc(100%+115px)]':
            !profileUser?.name,
          'top-[calc(100%+125px)] tablet:top-[calc(100%+120px)] xdesktop:top-[calc(100%+125px)]':
            !!profileUser?.name,
        },
      )}
    >
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
