import { socket } from 'src/socket/socket';

export const requestLeaveChannel = (stocks: string) => {
  const message = { action: 'leave', data: stocks };
  if (socket) {
    socket.emit('regs', JSON.stringify(message));
  }
};
