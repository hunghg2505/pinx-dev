import React, { useEffect, useRef } from 'react';

import { useDebounceFn } from 'ahooks';
import { useAtom } from 'jotai';

import { useGetNotificationToken } from '@layout/components/MainHeader/Notifications/service';
import { getAccessToken } from '@store/auth';
import { notificationAtom } from '@store/notification/notification';
import { notificationMobileAtom } from '@store/sidebarMobile/notificationMobile';
import { disableScroll, enableScroll } from '@utils/common';
import { firebaseCloudMessaging } from 'src/firebase';

const InitialNotification = () => {
  const [isShowNotificationMobile] = useAtom(notificationMobileAtom);
  const [notiStore] = useAtom(notificationAtom);
  const requestGetNotificationToken = useGetNotificationToken({});

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

  useEffect(() => {
    (async () => {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          firebaseCloudMessaging.onMessage(updateNoti);
          requestGetNotificationToken.run({
            deviceToken: token as string,
          });
        }
      } catch (error) {
        console.error({ error });
      }
    })();
  }, []);

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
