import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { entities } from '../src/index';
import { getUserInfo } from '../src/Users/Users.service';

beforeAll(async () => {
  const dbConfig = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };

  const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    synchronize: false,
    entities: entities,
    ...dbConfig,
  };

  await createConnection(connectionOptions);
});

afterAll(() => {
  getConnection().close();
});

describe('get User Info', () => {
  it('관리자 계정', async () => {
    const user = await getUserInfo('test1@gmail.com');
    expect(user.admin).toBeTruthy();
  });
  it('사용자 계정', async () => {
    const user = await getUserInfo('test2@gmail.com');
    expect(user.admin).toBeFalsy();
  });
  // it('없는 계정', async () => {
  //   try {
  //     await getUserInfo('test3@gmail.com');
  //   } catch (error) {
  //     expect(error).toEqual({ error: '유저 없음' });
  //   }
  // });
});
