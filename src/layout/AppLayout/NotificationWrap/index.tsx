import React from 'react';

import dynamic from 'next/dynamic';

import { useLogin } from '@store/auth/hydrateAuth';

const InitialNotification = dynamic(() => import('./InitialNotification'), {
  ssr: false,
});

const NotificationWrap = () => {
  const { isLogin } = useLogin();

  return <>{isLogin && <InitialNotification />}</>;
};

export default NotificationWrap;
