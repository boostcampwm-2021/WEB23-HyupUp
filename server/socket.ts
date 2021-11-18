import { Server } from 'socket.io';
const io = new Server();

interface userInstance {
  sid: string;
  userId: number;
}

// to-do 메모리 상에서 관리하는 것 말고, redis나 다른 DB 생각해보기
// to-do room을 활용하여 관리하는 방법을 찾아보기
const usersList: { [index: string]: userInstance[] } = {};

io.on('connection', (socket) => {
  socket.on('LOGIN', ({ userId, organizationId }: { userId: number; organizationId: number }) => {
    const roomName = organizationId.toString();
    socket.data = roomName;
    socket.join(roomName);
    if (Object.keys(usersList).includes(roomName)) {
      socket.to(roomName).emit('ON', userId);
      io.to(socket.id).emit('LOGIN_CALLBACK', usersList[roomName]);
      usersList[roomName] = [...usersList[roomName], { userId: userId, sid: socket.id }];
    } else usersList[roomName] = [{ userId: userId, sid: socket.id }];
  });

  socket.on('LOGOUT', (userId: number) => {
    socket.to(socket.data).emit('OFF', userId);
    usersList[socket.data] = [
      ...usersList[socket.data].filter((el) => el.userId !== userId).map((el) => ({ ...el })),
    ];
    if (usersList[socket.data].length === 0) delete usersList[socket.data];
  });

  socket.on('disconnecting', () => {
    if (!Object.keys(usersList).includes(socket.data)) return;
    const disconnectedUser = usersList[socket.data].find((el) => el.sid === socket.id);
    if (!disconnectedUser) return;
    usersList[socket.data] = usersList[socket.data].filter((el) => el.sid !== socket.id);
    socket.to([socket.data]).emit('OFF', disconnectedUser.userId);
    if (usersList[socket.data].length === 0) delete usersList[socket.data];
  });

  socket.on('NEW_EPIC', (epicId: number) => {
    // FIXME:
    // 이벤트 발행 필터링: 조직 별 구분 & 프로젝트 구분
    // 클라이언트에서 projectId 도 같이 보내도록 수정
    // 1차 필터: 서버측(이 파일)에서 조직이 다르면 broadcast 하지 않도록 구현
    // 2차 필터: 클라이언트측에서 다른프로젝트에 속해있다면 이벤트 핸들러를 실행하지 않도록 구현
    socket.broadcast.emit('GET_EPIC', epicId);
  });
});

export default io;
