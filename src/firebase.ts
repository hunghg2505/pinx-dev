/* eslint-disable no-console */
/* eslint-disable import/no-mutable-exports */
// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';

import { ENV } from '@utils/env';

import { allowNotificationTracking } from './mixpanel/mixpanel';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDtEXAkNbCgR5zR6snZxqWHX7dyoSozhY4',
  authDomain: 'pinex-a4cf1.firebaseapp.com',
  projectId: 'pinex-a4cf1',
  storageBucket: 'pinex-a4cf1.appspot.com',
  messagingSenderId: '503006267993',
  appId: '1:503006267993:web:9daef83823c704d223ff48',
  measurementId: 'G-KK9XPVRSXB',
};

// Initialize Firebase
let analytics;
let firestore;
let messaging: any;

if (firebaseConfig?.projectId && firebase.apps.length === 0) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
    // eslint-disable-next-line unicorn/prefer-top-level-await
    isSupported().then((value) => {
      if (value) {
        messaging = getMessaging(app);
      }
    });
    // eslint-disable-next-line unicorn/prefer-top-level-await
    Notification.requestPermission().then((value) => {
      if (value && value === 'granted') {
        allowNotificationTracking('Allow');
      } else {
        allowNotificationTracking('Not Allow');
      }
    });
  }
} else {
  firebase.app();
}

const getMessagingToken = async () => {
  let currentToken = '';
  if (!messaging) {
    return;
  }
  try {
    currentToken = await getToken(messaging, {
      vapidKey: ENV.FIREBASE_VAPIDKEY,
    });
  } catch (error) {
    console.log('xxx An error occurred while retrieving token.', error);
  }
  return currentToken;
};

const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

export { firebaseConfig, analytics, firestore, getMessagingToken, onMessageListener };
