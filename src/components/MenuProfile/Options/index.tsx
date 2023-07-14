import React from 'react';

import { useTranslation } from 'next-i18next';

import Option from './Option';

const Options = () => {
  const { t } = useTranslation('profile');
  return (
    <>
      <hr className='border-neutral_07' />
      <Option link='/lotus' name={t('watchlist_and_theme')} icon='/static/icons/Lotus.svg' />
      <hr className='border-neutral_07' />
      <Option
        link='/profile'
        name={t('profile_verification')}
        icon='/static/icons/Profile icon.svg'
      />
      <Option
        link='/password'
        name={t('change_password')}
        icon='/static/icons/Key password icon.svg'
      />
      <hr className='border-neutral_07' />
      <Option link='/setting' name={t('settings')} icon='/static/icons/gear setting icon.svg' />
    </>
  );
};
export default Options;
