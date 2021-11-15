import { Server } from 'socket.io';

const io = new Server();

io.on('connection', (socket) => {
  socket.join('TEAM42'); // to-do organization이 여러가지인 경우, 이를 따로 관리하는 로직 작성

  socket.on('LOGIN', (userId) => {
    socket.to('TEAM42').emit('ON', userId);
  });

  socket.on('LOGOUT', (userId) => {
    socket.to('TEAM42').emit('OFF', userId);
  });

  socket.on('NEW_EPIC', (epicId: number) => {
    socket.broadcast.emit('GET_EPIC', epicId);
  });
});

export default io;
