import aes from 'crypto-js/aes';
import encutf8 from 'crypto-js/enc-utf8';

const SECRET = 'PINEX_FCM';

// Encrypt
export const encodeFcmToken = (token: string) => {
  return aes.encrypt(token, SECRET).toString();
};

// Decrypt
export const decodeFcmToken = (ciphertext: string) => {
  const bytes = aes.decrypt(ciphertext, SECRET);
  return bytes.toString(encutf8);
};
