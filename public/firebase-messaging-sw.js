/* eslint-disable no-undef */
/* eslint-disable no-console */
// @ts-nocheck

if (typeof window === 'undefined') {
  importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

  try {
    const firebaseConfig = {
      apiKey: 'AIzaSyDtEXAkNbCgR5zR6snZxqWHX7dyoSozhY4',
      authDomain: 'pinex-a4cf1.firebaseapp.com',
      projectId: 'pinex-a4cf1',
      storageBucket: 'pinex-a4cf1.appspot.com',
      messagingSenderId: '503006267993',
      appId: '1:503006267993:web:9daef83823c704d223ff48',
      measurementId: 'G-KK9XPVRSXB',
    };

    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
      console.log('xxx payload bg', payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: './static/icons/pinex_logo.svg',
        data: payload.data.data,
      };
      console.log('xxx notificationOptions', notificationOptions);
      self.registration.showNotification(notificationTitle, notificationOptions);
    });

    self.onnotificationclick = (event) => {
      const redirectDataString = event.notification.data;
      const redirectData = JSON.parse(redirectDataString);
      const contentId = redirectData && redirectData?.passProps?.item?.id;
      const displayName = redirectData && redirectData?.passProps?.item?.display_name;
      event.notification.close();
      event.waitUntil(
        clients
          .matchAll({
            type: 'window',
          })
          .then(() => {
            if (clients.openWindow) {
              if (redirectData) {
                if (redirectData.notificationType === 'NEW_FOLLOWER') {
                  return clients.openWindow(`/${displayName}-${contentId}`);
                } else if (redirectData.actionType === 'PINETREE_MKT') {
                  return clients.openWindow('/');
                } else {
                  const id = redirectData?.passProps?.item?.slug;
                  return id === '%%SLUG%%' ? clients.openWindow(`/post/${contentId}`) : clients.openWindow(`/${id}`);
                }
              } else {
                return clients.openWindow('/');
              }
            }
          }),
      );
    };
  } catch (error) {
    console.log({ error });
  }
}
