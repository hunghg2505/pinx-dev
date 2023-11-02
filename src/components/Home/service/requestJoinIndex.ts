import { socket } from 'src/socket/socket';

export const requestJoinIndex = () => {
  const message = { action: 'join', data: 'index' };
  socket.emit('regs', JSON.stringify(message));
};
