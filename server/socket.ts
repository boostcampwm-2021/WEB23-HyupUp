import { Server } from 'socket.io';

const io = new Server();

// to-do 메모리 상에서 관리하는 것 말고, redis나 다른 DB 생각해보기
const usersList = {
  TEAM42: [2],
};

io.on('connection', (socket) => {
  socket.join('TEAM42'); // to-do organization이 여러가지인 경우, 이를 따로 관리하는 로직 작성, usersList에 추가하기

  socket.on('LOGIN', (userId) => {
    socket.to('TEAM42').emit('ON', userId);
    io.to(socket.id).emit('LOGIN_CALLBACK', usersList.TEAM42);
    usersList.TEAM42 = [...usersList.TEAM42, userId];
  });

  socket.on('LOGOUT', (userId) => {
    socket.to('TEAM42').emit('OFF', userId);
    usersList.TEAM42 = [...usersList.TEAM42.filter((el) => el !== userId)];
  });
});

export default io;
