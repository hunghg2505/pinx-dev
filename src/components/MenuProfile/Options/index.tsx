import React from 'react';

import { useTranslation } from 'next-i18next';

import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import Option from './Option';

const Options = () => {
  const { t } = useTranslation('profile');
  const { isLogin } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <hr className='border-neutral_07' />
          <Option link='/lotus' name={t('watchlist_and_theme')} icon='/static/icons/Lotus.svg' />
          <hr className='border-neutral_07' />
          <Option
            link={ROUTE_PATH.PROFILE_VERIFICATION}
            name={t('profile_verification')}
            icon='/static/icons/Profile icon.svg'
          />
          <hr className='border-neutral_07' />
          <Option
            link={ROUTE_PATH.SETTING_CHANGE_PASSWORD}
            name={t('change_password')}
            icon='/static/icons/Key password icon.svg'
          />
        </>
      )}

      <hr className='border-neutral_07' />
      <Option link={ROUTE_PATH.SETTING} name={t('settings')} icon='/static/icons/gear setting icon.svg' />
      <hr className='border-neutral_07' />
    </>
  );
};
export default Options;
