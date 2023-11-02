import Base64 from 'crypto-js/enc-base64';
import sha256 from 'crypto-js/sha256';

export const encryptPassword = (value: string) => {
  const hash = sha256(value);
  const pass = Base64.stringify(hash);
  return pass;
};
