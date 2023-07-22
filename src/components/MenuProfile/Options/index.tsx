import React from 'react';

import { useAtom } from 'jotai';
import { useTranslation } from 'next-i18next';

import { useAuth } from '@store/auth/useAuth';
import { openProfileAtom } from '@store/profile/profile';
import { ROUTE_PATH } from '@utils/common';

import Option from './Option';

const Options = () => {
  const { t } = useTranslation('common');
  const { isLogin } = useAuth();
  const [, setOpenProfileMenu] = useAtom(openProfileAtom);


  const closeProfileMenu = () => {
    setOpenProfileMenu(false);
  };

  return (
    <>
      {isLogin && (
        <>
          <hr className='border-neutral_07' />
          <Option
            link={
              {
                pathname: ROUTE_PATH.WATCHLIST,
                query: {
                  from_profile_menu: 1
                }
              }
            }
            name={t('watchlist_and_theme')}
            icon='/static/icons/Lotus.svg'
            action={closeProfileMenu}
          />
          <hr className='border-neutral_07' />
          <Option
            link={
              {
                pathname: ROUTE_PATH.PROFILE_VERIFICATION,
                query: {
                  from_profile_menu: 1
                }
              }
            }
            name={t('profile_verification')}
            icon='/static/icons/Profile icon.svg'
            action={closeProfileMenu}
          />
          <hr className='border-neutral_07' />
          <Option
            link={
              {
                pathname: ROUTE_PATH.SETTING_CHANGE_PASSWORD,
                query: {
                  from_profile_menu: 1
                }
              }
            }
            name={t('change_password')}
            icon='/static/icons/Key password icon.svg'
            action={closeProfileMenu}
          />
        </>
      )}

      <hr className='border-neutral_07' />
    </>
  );
};
export default Options;
