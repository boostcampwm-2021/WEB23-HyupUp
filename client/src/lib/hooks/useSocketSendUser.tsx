import * as React from 'react';
import { SocketContext } from '@/contexts/socketContext';

function useSocketSendUser(channel: string) {
  const { connection } = React.useContext(SocketContext);

  return React.useCallback(
    (...dataToEmit: any[]) => {
      connection.emit(channel, dataToEmit.length ? dataToEmit[0] : dataToEmit);
    },
    [channel, connection],
  );
}

export default useSocketSendUser;
