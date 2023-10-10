/* eslint-disable no-undef */
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
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });

    self.addEventListener('notificationclick', (event) => {
      return event;
    });
  } catch (error) {
    console.log({ error });
  }
}
