/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable no-console */
const firebaseConfig = {
  apiKey: 'AIzaSyDtEXAkNbCgR5zR6snZxqWHX7dyoSozhY4',
  authDomain: 'pinex-a4cf1.firebaseapp.com',
  projectId: 'pinex-a4cf1',
  storageBucket: 'pinex-a4cf1.appspot.com',
  messagingSenderId: '503006267993',
  appId: '1:503006267993:web:9daef83823c704d223ff48',
  measurementId: 'G-KK9XPVRSXB',
};

if ('serviceWorker' in navigator) {
  const firebaseConfigParams = new URLSearchParams(firebaseConfig).toString();
  navigator.serviceWorker
    .register(`../firebase-messaging-sw.js?${firebaseConfigParams}`)
    .then(function (registration) {
      console.log('xxx Registration successful, scope is:', registration.scope);
    })
    .catch(function (error) {
      console.log('xxx Service worker registration failed, error:', error);
    });
}