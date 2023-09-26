import React, { useEffect } from 'react';

import { useMount, useUpdateEffect } from 'ahooks';
import { useRouter } from 'next/router';
import Script from 'next/script';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import { useHandlActionsPost } from '@hooks/useHandlActionsPost';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { useGetNotificationToken } from '@layout/components/MainHeader/Notifications/service';
import { useLogin } from '@store/auth/hydrateAuth';
import { getLocaleCookie, setLocaleCookie } from '@store/locale';
import { usePostHomePage } from '@store/postHomePage/postHomePage';
import { usePostThemeInitial } from '@store/postTheme/useGetPostTheme';
import { useProfileInitial } from '@store/profile/useProfileInitial';
import { useProfileSettingInitial } from '@store/profileSetting/useGetProfileSetting';
import { useStockMarketHome } from '@store/stockMarketHome/useStockMarketHome';
import { useStockWatchlistHome } from '@store/stockWatchlistHome/useStockWatchlistHome';
import { ROUTE_PATH, storeQueryToSession } from '@utils/common';
import { TOAST_LIMIT } from '@utils/constant';
import { ENV } from '@utils/env';
import { getMessagingToken } from 'src/firebase';

const AppInitialData = () => {
  const { isLogin } = useLogin();
  const { toasts } = useToasterStore();
  const { run } = useProfileInitial();
  const { requestProfleSetting } = useProfileSettingInitial();
  const router = useRouter();
  usePostThemeInitial();
  const { handleRemoveActionPost } = useHandlActionsPost();
  const { initialHomePostData } = usePostHomePage();
  const { userLoginInfo } = useUserLoginInfo();
  const { getInitDataStockMarketHome } = useStockMarketHome();
  const { getInitDataStockWatchlistHome } = useStockWatchlistHome();
  const requestGetNotificationToken = useGetNotificationToken({});

  useMount(() => {
    initialHomePostData();
    handleRemoveActionPost();
    requestProfleSetting();
    // getInitDataStockWatchlistHome();
    run();
    getInitDataStockMarketHome();
    // getMessagingToken().then((firebaseToken) => {
    //   requestGetNotificationToken.run({
    //     deviceToken: firebaseToken
    //   });
    // });
  });

  useEffect(() => {
    getMessagingToken().then((firebaseToken) => {
      requestGetNotificationToken.run({
        deviceToken: firebaseToken
      });
    });
  }, [isLogin]);

  useUpdateEffect(() => {
    if (!userLoginInfo?.id) {
      initialHomePostData();
    }
  }, [userLoginInfo?.id]);

  useEffect(() => {
    const locale = getLocaleCookie() as string;

    if (!getLocaleCookie()) {
      setLocaleCookie('vi');
      router.push(router.asPath, router.asPath, { locale: 'vi' });
      return;
    }
    if (getLocaleCookie() && getLocaleCookie() !== router.locale) {
      router.push(router.asPath, router.asPath, { locale });
    }
  }, []);

  useEffect(() => {
    for (const t of toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT)) {
      toast.dismiss(t.id);
    } // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  useEffect(() => {
    const locale = getLocaleCookie() as string;

    if (router.pathname === ROUTE_PATH.HOME) {
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

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${ENV.RECAPTHCHA_SITE_KEY}`} />
      <Toaster />
    </>
  );
};

export default AppInitialData;
