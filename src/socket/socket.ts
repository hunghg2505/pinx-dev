import io from 'socket.io-client';

import { ENV } from '@utils/env';

export const socket = io(ENV.URL_SOCKET, {
  transports: ['websocket'],
});
