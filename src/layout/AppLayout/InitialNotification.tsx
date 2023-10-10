import React, { useEffect } from 'react';

import { useAtom } from 'jotai';

import { notificationMobileAtom } from '@store/sidebarMobile/notificationMobile';
import { disableScroll, enableScroll } from '@utils/common';

import 'src/firebase';
import 'src/mixpanel/mixpanel';

const InitialNotification = () => {
  // notifications
  const [isShowNotificationMobile] = useAtom(notificationMobileAtom);

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
