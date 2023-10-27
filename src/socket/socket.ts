/* eslint-disable @typescript-eslint/no-unused-vars */
// import io from 'socket.io-client';

// import { ENV } from '@utils/env';

// export const socket = io(ENV.URL_SOCKET, {
//   transports: ['websocket'],
// });

export const socket = {
  emit: (a?: any, b?: any) => {},
  on: (a?: any, b?: any) => {},
  off: (a?: any, b?: any) => {},
};
