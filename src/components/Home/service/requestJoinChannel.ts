import { socket } from 'src/socket/socket';

export const requestJoinChannel = (stocks: string) => {
  const message = { action: 'join', data: stocks };
  socket.emit('regs', JSON.stringify(message));
};
