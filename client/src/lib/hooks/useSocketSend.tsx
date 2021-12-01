import * as React from 'react';
import { SocketContext } from '@/contexts/socketContext';

/**
 *
 * @param channel 데이터를 전송할 소켓 채널이름
 * @returns 파라미터로 전달한 데이터를 channel로 전송해주는 함수
 * @example
 * const helloEmit = useSocketSend('hello');
 * ...
 * helloEmit('hello world!'); // hello 채널로 'hello world' 문자열을 전송
 */
function useSocketSend(channel: string) {
  const { connection } = React.useContext(SocketContext);

  // emit(1, 2, 3) 과 emit([1, 2, 3]) 이 동일한 기능을 하기 위한 로직
  return React.useCallback(
    (...dataToEmit: any[]) => {
      connection.emit(channel, dataToEmit.length !== 1 ? dataToEmit : dataToEmit[0]);
    },
    [channel, connection],
  );
}

export default useSocketSend;
