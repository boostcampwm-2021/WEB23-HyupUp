import * as React from 'react';
import { SocketContext } from '@/contexts/socketContext';

/**
 *
 * @param channel 데이터 수신시 핸들러를 등록할 수신할 소켓 채널이름
 * @param onReceive 데이터 수신시 실행되는 이벤트 핸들러 함수
 * @param dependency 이벤트 구독을 갱신할 때 dependency 로 전달될 변수의 배열
 * @returns null
 * @example
 * useSocketReceive('hello', (payload) => {
 *   console.log(payload);
 * }); // 'hello' 채널에 이벤트 발생시 받은 payload를 콘솔에 출력함
 */
function useSocketReceive(
  channel: string,
  onReceive: (...payload: any[]) => void,
  dependency: any[] = [],
) {
  const { connection } = React.useContext(SocketContext);

  // 해당 훅을 사용한 컴포넌트가 마운트되면 이벤트 핸들러를 등록, 언마운트되면 제거함
  React.useEffect(() => {
    connection.on(channel, onReceive);
    return () => {
      connection.off(channel, onReceive);
    };
  }, [...dependency, channel, onReceive, connection]);
}

export default useSocketReceive;
