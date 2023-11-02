import React, { useEffect } from 'react';

import { useRouter } from 'next/router';

import { getLocaleCookie } from '@store/locale';
import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';
import { useStockWatchlistHome } from '@store/stockWatchlistHome/useStockWatchlistHome';
import { storeQueryToSession } from '@utils/common';
import { HOME } from 'src/constant/route';

const Chunk4 = () => {
  const router = useRouter();
  usePostThemeInitial();

  const { getInitDataStockWatchlistHome } = useStockWatchlistHome();

  useEffect(() => {
    const locale = getLocaleCookie() as string;
    if (router.pathname === HOME) {
      getInitDataStockWatchlistHome();
    }
    if (getLocaleCookie() && getLocaleCookie() !== router.locale) {
      router.push(router.asPath, router.asPath, { locale });
    }
  }, [router.pathname]);

  const storeInSession = React.useCallback(() => {
    const storage = globalThis?.sessionStorage;
    if (!storage) {
      return;
    }

    const prevPath: string = storage.getItem('currentPath') || '';
    storage.setItem('prevPath', prevPath);
    storage.setItem('currentPath', globalThis.location.pathname);

    for (const k of Object.keys(router.query).filter((k) => k.match(/^utm_*/))) {
      const tmp = router.query[k] || '';
      const value: string = Array.isArray(tmp) ? tmp[0] : tmp;
      storeQueryToSession(storage, k, value);
    }
  }, [router.query]);

  useEffect(() => {
    storeInSession();
  }, [storeInSession]);

  return <></>;
};

export default Chunk4;
