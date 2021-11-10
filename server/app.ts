import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { ConnectionOptions, createConnection } from 'typeorm';
import { entities } from './src';

// to-do router import
import userRouter from './src/Users/Users.router';
import projectRouter from './src/Projects/Projects.router';
import epicRouter from './src/Epics/Epics.router';
import storyRouter from './src/Stories/Stories.router';
import taskRouter from './src/Tasks/Tasks.router';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// to-do router 설정
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/epics', epicRouter);
app.use('/api/stories', storyRouter);
app.use('/api/tasks', taskRouter);

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
    username: 'root',
    password: '19941021',
    database: 'TEAM42_TEST',

  };

  const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    synchronize: false,
    entities,
    ...dbConfig,
  };

  const connection = await createConnection(connectionOptions);
  await connection.synchronize(); // to-do 환경변수로 만들기
})();

export default app;
