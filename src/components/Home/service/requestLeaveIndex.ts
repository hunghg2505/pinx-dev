import { socket } from 'src/socket/socket';

export const requestLeaveIndex = () => {
  const message = { action: 'leave', data: 'index' };
  socket.emit('regs', JSON.stringify(message));
};
