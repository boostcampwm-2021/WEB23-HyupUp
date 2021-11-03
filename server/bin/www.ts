import app from '../app';
import http from 'http';
import debug from 'debug';

const onError = (err: NodeJS.ErrnoException) => {
  if (err.syscall !== 'listen') {
    throw err;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  // to-do console.error를 대체할 방법 생각해서 교체하기
  switch (err.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw err;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : addr ? 'port ' + addr.port : null;
  debug('Listening on ' + bind);
};

const port: number = process.env.PORT ? +process.env.PORT : 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
