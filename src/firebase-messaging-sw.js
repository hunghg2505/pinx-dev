/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable no-console */
import { firebaseConfig } from './src/firebase';

if ('serviceWorker' in navigator) {
  const firebaseConfigParams = new URLSearchParams(firebaseConfig).toString();
  navigator.serviceWorker
    .register(`../firebase-messaging-sw.js?${firebaseConfigParams}`)
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (error) {
      console.log('Service worker registration failed, error:', error);
    });
}