import React, { useEffect, useRef } from 'react';

import { useDebounceFn } from 'ahooks';
import { useAtom } from 'jotai';

import { useGetNotificationToken } from '@layout/components/MainHeader/Notifications/service';
import { getAccessToken } from '@store/auth';
import { useLogin } from '@store/auth/hydrateAuth';
import { notificationAtom } from '@store/notification/notification';
import { notificationMobileAtom } from '@store/sidebarMobile/notificationMobile';
import { disableScroll, enableScroll } from '@utils/common';
import { firebaseCloudMessaging } from 'src/firebase';

const InitialNotification = () => {
  const [isShowNotificationMobile] = useAtom(notificationMobileAtom);
  const [notiStore] = useAtom(notificationAtom);
  const requestGetNotificationToken = useGetNotificationToken({});
  const { isLogin: refreshWhenLogin } = useLogin();

  const refFunc: any = useRef();
  useEffect(() => {
    refFunc.current = () => {
      notiStore.refreshNotiCount && notiStore.refreshNotiCount();
      notiStore.refreshNotiData && notiStore.refreshNotiData();
      notiStore.refreshPinetreeNotiData && notiStore.refreshPinetreeNotiData();
    };
  });

  const { run: updateNoti } = useDebounceFn(
    () => {
      const isLogin = getAccessToken();

      if (!isLogin) {
        return;
      }

      if (refFunc.current) {
        refFunc.current();
      }
    },
    {
      wait: 100,
    },
  );

  const initFirebase = async () => {
    try {
      const token = await firebaseCloudMessaging.init();
      const isLogin = getAccessToken();

      if (token && isLogin) {
        firebaseCloudMessaging.onMessage(updateNoti);
        requestGetNotificationToken.run({
          deviceToken: token as string,
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    const isLogin = getAccessToken();

    if (isLogin) {
      initFirebase();
    }
  }, [refreshWhenLogin]);

  useEffect(() => {
    if (isShowNotificationMobile) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [isShowNotificationMobile]);

  return <></>;
};

export default InitialNotification;
