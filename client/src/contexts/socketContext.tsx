import * as React from 'react';
import { io, Socket } from 'socket.io-client';

export type SocketContextType = {
  connection: Socket;
};

export const SocketContext = React.createContext<SocketContextType>({
  connection: io(`${process.env.SERVER_URL}`, {
    transports: ['websocket'],
    autoConnect: false,
  }),
});

function SocketConnector(props: { children: React.ReactNode }) {
  const socketContext = React.useContext(SocketContext);

  const value = React.useMemo(() => socketContext, [socketContext]);
  const connection = socketContext?.connection;

  React.useEffect(() => {
    if (!connection) return;
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []);

  return <SocketContext.Provider value={value}>{props.children}</SocketContext.Provider>;
}

export default SocketConnector;
