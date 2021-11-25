import { Server } from 'socket.io';
import { createClient } from 'redis';

const io = new Server();
const client = createClient({ host: process.env.REDIS_HOST });

io.on('connection', (socket) => {
  socket.on('LOGIN', ({ userId, organizationId }: { userId: number; organizationId: number }) => {
    const roomName = organizationId.toString();
    socket.data = roomName;
    socket.join(roomName);
    socket.to(roomName).emit('ON', userId);
    client.lrange(roomName, 0, -1, (err, items) => {
      if (err) return;
      io.to(socket.id).emit(
        'LOGIN_CALLBACK',
        items.map((el) => JSON.parse(el)),
      );
    });
    client.lpush(roomName, JSON.stringify({ userId: userId, sid: socket.id }));
  });

  socket.on('LOGOUT', (userId: number) => {
    client.lrem(socket.data, 1, JSON.stringify({ userId: userId, sid: socket.id }), (err) => {
      if (err) client.lrem(socket.data, 1, JSON.stringify({ userId: userId, sid: socket.id }));
    });
    socket.to(socket.data).emit('OFF', userId);
  });

  socket.on('disconnecting', () => {
    client.lrange(socket.data, 0, -1, (err, items) => {
      if (err) return;
      items.forEach((el) => {
        if (JSON.parse(el).sid !== socket.id) return;
        socket.to(socket.data).emit('OFF', JSON.parse(el).userId);
        client.lrem(socket.data, 1, el);
      });
    });
  });

  socket.on('NEW_EPIC', (epicId: number) => {
    // FIXME:
    // 이벤트 발행 필터링: 조직 별 구분 & 프로젝트 구분
    // 클라이언트에서 projectId 도 같이 보내도록 수정
    // 1차 필터: 서버측(이 파일)에서 조직이 다르면 broadcast 하지 않도록 구현
    // 2차 필터: 클라이언트측에서 다른프로젝트에 속해있다면 이벤트 핸들러를 실행하지 않도록 구현
    socket.to(socket.data).emit('GET_EPIC', epicId);
  });

  socket.on('UPDATE_EPIC_BAR', (epicId: number) => {
    socket.to(socket.data).emit('UPDATE_EPIC_BAR', epicId);
  });

  socket.on('UPDATE_EPIC_ORDER', (epicId: number) => {
    socket.to(socket.data).emit('UPDATE_EPIC_ORDER', epicId);
  });
});

export default io;
