import express, { Request, Response, NextFunction } from 'express';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { ConnectionOptions, createConnection } from 'typeorm';
import dotenv from 'dotenv';
import session from 'express-session';
import connectredis from 'connect-redis';
import history from 'connect-history-api-fallback';
import { entities } from './src';

// to-do router import
import userRouter from './src/Users/Users.router';
import projectRouter from './src/Projects/Projects.router';
import epicRouter from './src/Epics/Epics.router';
import storyRouter from './src/Stories/Stories.router';
import taskRouter from './src/Tasks/Tasks.router';
import todoRouter from './src/Todo/Todo.router';
import emailRouter from './src/Email/Email.router';
import { createClient } from 'redis';

const RedisStore = connectredis(session);

const client = createClient({
  host: process.env.REDIS_HOST,
  port: +(process.env.REDIS_PORT as string),
});

const app = express();
dotenv.config();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SECRET as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    store: new RedisStore({
      client: client,
    }),
  }),
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'upload')));

// to-do router 설정
app.use('/api/users', userRouter);
app.use('/api/projects', projectRouter);
app.use('/api/epics', epicRouter);
app.use('/api/stories', storyRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/todo', todoRouter);
app.use('/api/email', emailRouter);

app.use(history());

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
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

  const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    synchronize: false,
    entities,
    ...dbConfig,
  };

  await createConnection(connectionOptions);
})();

export default app;
