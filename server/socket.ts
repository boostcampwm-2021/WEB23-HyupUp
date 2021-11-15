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
    // FIXME:
    // 이벤트 발행 필터링: 조직 별 구분 & 프로젝트 구분
    // 클라이언트에서 projectId 도 같이 보내도록 수정
    // 1차 필터: 서버측(이 파일)에서 조직이 다르면 broadcast 하지 않도록 구현
    // 2차 필터: 클라이언트측에서 다른프로젝트에 속해있다면 이벤트 핸들러를 실행하지 않도록 구현
    socket.broadcast.emit('GET_EPIC', epicId);
  });
});

export default io;
