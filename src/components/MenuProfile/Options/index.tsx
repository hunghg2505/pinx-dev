import React from 'react';

import { useAtomValue } from 'jotai';
import { useTranslation } from 'next-i18next';

import { useLogin } from '@store/auth/hydrateAuth';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';
import { ROUTE_PATH } from '@utils/common';
import { viewWatchListTracking } from 'src/mixpanel/mixpanel';

import Option from './Option';

const Options = () => {
  const { t } = useTranslation('common');
  const { isLogin } = useLogin();
  const watchList = useAtomValue(stockSocketAtom);

  // tracking event view watch list
  const handleTracking = () => {
    const listStockCodes =
      watchList.find((item) => item.location === StockSocketLocation.WATCH_LIST_COMPONENT_LAYOUT)
        ?.stocks || [];

    viewWatchListTracking(
      'Default',
      'Normal WL',
      listStockCodes,
      listStockCodes.length,
      'Menu profile mobile',
    );
  };

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
            action={handleTracking}
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
