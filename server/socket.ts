import { Server } from 'socket.io';

const io = new Server();

interface userInstance {
  sid: string;
  userId: number;
}

// to-do 메모리 상에서 관리하는 것 말고, redis나 다른 DB 생각해보기
// to-do room을 활용하여 관리하는 방법을 찾아보기
const usersList: { [index: string]: userInstance[] } = {
  TEAM42: [],
};

io.on('connection', (socket) => {
  socket.join('TEAM42'); // to-do organization이 여러가지인 경우, 이를 따로 관리하는 로직 작성, usersList에 추가하기

  socket.on('LOGIN', (userId: number) => {
    socket.to('TEAM42').emit('ON', userId);
    io.to(socket.id).emit('LOGIN_CALLBACK', usersList.TEAM42);
    usersList.TEAM42 = [...usersList.TEAM42, { userId: userId, sid: socket.id }];
  });

  socket.on('LOGOUT', (userId: number) => {
    socket.to('TEAM42').emit('OFF', userId);
    usersList.TEAM42 = [
      ...usersList.TEAM42.filter((el) => el.userId !== userId).map((el) => ({ ...el })),
    ];
  });

  socket.on('disconnecting', () => {
    const disconnectedUser = usersList.TEAM42.find((el) => el.sid === socket.id);
    if (!disconnectedUser) return;
    usersList.TEAM42 = usersList.TEAM42.filter((el) => el.sid !== socket.id);
    socket.to('TEAM42').emit('OFF', disconnectedUser.userId);
  });
});

export default io;
