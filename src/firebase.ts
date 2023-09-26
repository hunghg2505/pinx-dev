/* eslint-disable no-console */
/* eslint-disable import/no-mutable-exports */
// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';
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
      vapidKey:
        'BBszbGKPrwSnb_tWEcor1125HZCgS3fC8cfxDz8Cw3kyRN-Jy-MjqquBks_LrsuWdvPHqocjWQB49y6DK_ahiz8',
    });
  } catch (error) {
    console.log('xxx An error occurred while retrieving token.', error);
  }
  return currentToken;
};

export { analytics, firestore, getMessagingToken };
