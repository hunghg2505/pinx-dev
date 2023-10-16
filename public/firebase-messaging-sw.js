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
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        image: './static/icons/pinex_logo.svg'
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });

    self.addEventListener('notificationclick', (event) => {
      console.log(event);
      const data = JSON.parse(event.data.data);
      const contentId = data?.passProps?.item?.id;
      const displayName = data?.passProps?.item?.display_name;
      event.waitUntil(
        clients
          .matchAll({
            type: 'window',
          })
          .then((clientList) => {
            for (const client of clientList) {
              if (client.url === '/' && 'focus' in client) { return client.focus(); }
            }
            if (clients.openWindow) {
              // return clients.openWindow('/kham-pha');
              if (data.notificationType === 'NEW_FOLLOWER') {
                return clients.openWindow(`/${displayName}-${contentId}`);
              } else if (data.actionType === 'PINETREE_MKT') {
                return data.url_notification && clients.openWindow(data.url_notification, '_blank');
              } else {
                const id = data?.passProps?.item?.slug;
                return id === '%%SLUG%%' ? clients.openWindow(`/post/${contentId}`) : clients.openWindow(`/${id}`);
              }
            }
          }),
      );
      return event;
    });
  } catch (error) {
    console.log({ error });
  }
}
