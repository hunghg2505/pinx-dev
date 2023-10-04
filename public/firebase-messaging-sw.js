/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging.js');

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
// const channel = new BroadcastChannel('notifications');

messaging.onBackgroundMessage(function (payload) {
  // channel.postMessage(payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

self.addEventListener('notificationclick', event => {
  return event;
});