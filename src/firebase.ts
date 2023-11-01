/* eslint-disable no-console */
// import { getAnalytics } from 'firebase/analytics';
import { initializeApp, getApps, getApp } from 'firebase/app';
// import firebase from 'firebase/compat/app';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';
import localforage from 'localforage';

import { ENV } from '@utils/env';

import { allowNotificationTracking } from './mixpanel/mixpanel';

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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const firebaseCloudMessaging = {
  tokenInLocalForage: async () => {
    const token = await localforage.getItem('fcm_token_client');
    return token;
  },
  removeFcmToken: async () => {
    await localforage.removeItem('fcm_token_client');
  },
  onMessage: async (onCallback: any) => {
    try {
      const messaging = getMessaging();
      onMessage(messaging, onCallback);
    } catch {}
  },

  init: async function () {
    try {
      let fcmToken = await this.tokenInLocalForage();
      if (fcmToken !== null) {
        console.log('xxx fcm_token_client', fcmToken);
        return fcmToken;
      }
      // const analytics = getAnalytics(app);

      const isSupport = await isSupported();

      if (!isSupport) {
        return isSupport;
      }

      const messaging = getMessaging(app);

      await Notification.requestPermission();

      fcmToken = await getToken(messaging, {
        vapidKey: ENV.FIREBASE_VAPIDKEY,
      });

      if (fcmToken) {
        // Send the token to your server and update the UI if necessary
        // save the token in your database
        localforage.setItem('fcm_token_client', fcmToken);
        console.log('xxx fcm_token_client', fcmToken);
        allowNotificationTracking('Allow');

        return fcmToken;
      } else {
        // Show permission request UI
        console.error(
          'xxx NOTIFICACION, No registration token available. Request permission to generate one.',
        );
        allowNotificationTracking('Not Allow');
      }
    } catch (error) {
      console.error(error);
      allowNotificationTracking('Not Allow');
    }
  },
};

export { firebaseCloudMessaging };
