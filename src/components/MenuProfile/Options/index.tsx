import React from 'react';

import { useTranslation } from 'next-i18next';

import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

import Option from './Option';

const Options = () => {
  const { t } = useTranslation('common');
  const { isLogin } = useAuth();

  return (
    <>
      {isLogin && (
        <>
          <hr className='border-neutral_07' />

          <Option
            link={{
              pathname: ROUTE_PATH.PROFILE_VERIFICATION,
              query: {
                from_profile_menu: 1,
              },
            }}
            name={t('profile_verification')}
            icon='/static/icons/Profile icon.svg'
          />

          <hr className='border-neutral_07' />

          <Option
            link={{
              pathname: ROUTE_PATH.WATCHLIST,
              query: {
                from_profile_menu: 1,
              },
            }}
            name={t('watchlist_and_theme')}
            icon='/static/icons/Lotus.svg'
          />
        </>
      )}

      <hr className='border-neutral_07' />
    </>
  );
};
export default Options;
