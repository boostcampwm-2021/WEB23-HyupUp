import { Server } from 'socket.io';

const io = new Server();

io.on('connection', (socket) => {
  // eslint-disable-next-line
  console.log('a user connected');
});

export default io;
