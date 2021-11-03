import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ConnectionOptions, createConnection } from 'typeorm';
import { entities } from './src';

// to-do router import

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// to-do router 설정

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use((err: HttpError, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error');
});

(async () => {
  const dbConfig = {
    host: 'localhost',
    username: '',
    password: '',
    database: '',
  };

  const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    synchronize: true,
    entities,
    ...dbConfig,
  };

  const connection = await createConnection(connectionOptions);
  await connection.synchronize(true); // to-do 환경변수로 만들기
})();

export default app;
