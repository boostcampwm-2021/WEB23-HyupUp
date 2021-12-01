import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { entities } from '../src';
import app from '../app';
import request from 'supertest';
import supertest from 'supertest';

beforeAll(async () => {
  const dbConfig = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
  };

  const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    synchronize: true,
    entities: entities,
    ...dbConfig,
  };

  const connection = await createConnection(connectionOptions);
  await connection.synchronize();
  await connection.query(`INSERT INTO ORGANIZATIONS(ROOM) VALUES('TEAM42');`);
  await connection.query(`INSERT INTO PROJECTS(NAME) VALUES('HYUPUP');`);
  await connection.query(
    `INSERT INTO USERS(NAME, JOB, EMAIL, IMAGE_URL, ADMIN, PASSWORD, ORGANIZATION_ID)` +
      `VALUES('hm', 'developer', 'test@test.com', 'url', 1,` +
      `'$2b$10$e3kxJ2jBwf/o5rpNgG.rqe/fvHyPxl2UH6r16ySb18IsLEeeGMwye', 1);`,
  );
});

afterAll(async () => {
  const connection = await getConnection();
  await connection.query(`DELETE FROM USERS;`);
  await connection.query(`DELETE FROM ORGANIZATIONS;`);
  await connection.query('ALTER TABLE ORGANIZATIONS AUTO_INCREMENT = 1');
  await connection.query('ALTER TABLE USERS AUTO_INCREMENT = 1');
  await connection.close();
});

let Cookies = '';

beforeEach((done) => {
  request(app)
    .post('/api/users/login')
    .send({
      email: 'test@test.com',
      password: 'token',
    })
    .end(function (err, res) {
      Cookies = res.headers['set-cookie'].pop().split(';')[0];
      done();
    });
});

describe('로그인 관련 API', () => {
  test('로그인 성공', async () => {
    const res = await supertest(app)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: 'token' });
    const cookies = res.headers['set-cookie'];
    expect(new RegExp('connect.sid').test(cookies)).toBe(true);
    expect(new RegExp('status').test(cookies)).toBe(true);
    expect(res.status).toBe(200);
  });
  test('잘못된 비밀번호로 로그인 실패', async () => {
    const res = await supertest(app)
      .post('/api/users/login')
      .send({ email: 'test@test.com', password: 'tokentoken' });
    expect(res.status).toBe(404);
  });
  test('잘못된 이메일로 로그인 실패', async () => {
    const res = await supertest(app)
      .post('/api/users/login')
      .send({ email: 'test@test1.com', password: 'token' });
    expect(res.status).toBe(404);
  });
  test('이메일의 입력이 없는 경우', async () => {
    const res = await supertest(app).post('/api/users/login').send({ password: 'token' });
    expect(res.status).toBe(400);
  });
  test('비밀번호의 입력이 없는 경우', async () => {
    const res = await supertest(app).post('/api/users/login').send({ email: 'test@test.com' });
    expect(res.status).toBe(400);
  });
});

describe('회원가입 관련 API', () => {
  test('회원가입 성공', async () => {
    const res = await supertest(app).post('/api/users/signup').send({
      name: 'Lee',
      job: 'developer',
      email: 'test1@gmail.com',
      password: 'hello',
      organization: 'room1',
      imageURL: 'url',
    });
    expect(res.status).toBe(200);
  });
  test('회원가입 기존 조직에 성공', async () => {
    const res = await supertest(app).post('/api/users/signup').send({
      name: 'Lee',
      job: 'developer',
      email: 'test2@gmail.com',
      password: 'hello',
      organization: 'room1',
      imageURL: 'url',
    });
    expect(res.status).toBe(200);
  });
  test('회원가입 시 존재하는 이메일 입력', async () => {
    const res = await supertest(app).post('/api/users/signup').send({
      name: 'Lee',
      job: 'developer',
      email: 'test1@gmail.com',
      password: 'hello',
      organization: 'room1',
      imageURL: 'url',
    });
    expect(res.status).toBe(406);
  });

  test('회원가입 시 잘못된 input 입력', async () => {
    const res = await supertest(app).post('/api/users/signup').send({
      name: 'Lee',
      job: 'developer',
      email: 'test1@gmail.com',
      password: 'hello',
      imageURL: 'url',
    });
    expect(res.status).toBe(400);
  });
});

describe('로그아웃 관련 API', () => {
  test('로그인이 되어 있는 상태에서 로그아웃 요청', async () => {
    const res = await supertest(app).delete('/api/users/logout').set('Cookie', Cookies);
    const cookies = res.headers['set-cookie'];
    expect(res.status).toBe(200);
    expect(new RegExp('connect.sid=;').test(cookies)).toBe(true);
    expect(new RegExp('status=;').test(cookies)).toBe(true);
  });
  test('로그인이 되어 있지 않은 상태에서 로그아웃 요청', async () => {
    const res = await supertest(app).delete('/api/users/logout');
    expect(res.status).toBe(401);
  });
});

describe('유저 조회 관련 API', () => {
  test('세션이 있는 상태로 유저 정보 요청', async () => {
    const res = await supertest(app).get('/api/users').set('Cookie', Cookies);
    expect(res.status).toBe(200);
  });
  test('세션이 없는 상태로 유저 정보 요청', async () => {
    const res = await supertest(app).get('/api/users');
    expect(res.status).toBe(401);
  });
  test('조직에 속해 있는 유저 리스트 요청', async () => {
    const res = await supertest(app)
      .get('/api/users/organization?organizationId=1')
      .set('Cookie', Cookies);
    expect(res.status).toBe(200);
    expect(res.body[0]).toStrictEqual({
      name: 'hm',
      job: 'developer',
      imageURL: 'url',
      admin: true,
      index: 1,
    });
  });
  test('조직 id 없이 조직에 속해 있는 유저 리스트 요청', async () => {
    const res = await supertest(app).get('/api/users/organization').set('Cookie', Cookies);
    expect(res.status).toBe(400);
  });
  test('존재하지 않는 조직에 속해 있는 유저 리스트 요청', async () => {
    const res = await supertest(app)
      .get('/api/users/organization?organizationId=3')
      .set('Cookie', Cookies);
    expect(res.status).toBe(400);
  });
  test('유저에 속해 있는 Task 요청', async () => {
    const res = await supertest(app)
      .get('/api/users/tasks?userId=1&&offset=5')
      .set('Cookie', Cookies);
    expect(res.status).toBe(200);
  });
  test('존재하지 않는 유저에 속해 있는 Task 요청', async () => {
    const res = await supertest(app)
      .get('/api/users/tasks?userId=100&&offset=5')
      .set('Cookie', Cookies);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
  });
  test('잘못된 query의 Task 요청', async () => {
    const res = await supertest(app).get('/api/users/tasks?offset=5').set('Cookie', Cookies);
    expect(res.status).toBe(400);
  });
  test('project를 포함한 유저 정보 요청', async () => {
    const res = await supertest(app).get('/api/users/1').set('Cookie', Cookies);
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([
      { name: 'hm', imageURL: 'url', index: 1, job: 'developer', admin: true, projects: [] },
    ]);
  });
  test('파라미터가 잘못된 project를 포함한 유저 정보 요청', async () => {
    const res = await supertest(app).get('/api/users/1234').set('Cookie', Cookies);
    expect(res.status).toBe(400);
  });
});

describe('유저 정보 업데이트 관련 API', () => {
  test('유저의 admin을 변경하는 API 성공', async () => {
    const res = await supertest(app)
      .put('/api/users/admin/1')
      .set('Cookie', Cookies)
      .send({ admin: false });
    expect(res.status).toBe(200);
  });
  test('유저의 admin을 변경하는 API 잘못된 body로 실패', async () => {
    const res = await supertest(app).put('/api/users/admin/1').set('Cookie', Cookies);
    expect(res.status).toBe(400);
  });

  test('유저를 프로젝트에 할당하는 API 성공', async () => {
    const res = await supertest(app).patch('/api/users/project').set('Cookie', Cookies).send({
      userId: 1,
      projectId: 1,
      isInvite: true,
    });
    expect(res.status).toBe(200);
  });

  test('잘못된 입력으로 유저를 프로젝트에 할당하는 API 실패', async () => {
    const res = await supertest(app).patch('/api/users/project').set('Cookie', Cookies).send({
      userId: 1,
      isInvite: true,
    });
    expect(res.status).toBe(400);
  });
});

describe('유저 정보 삭제 관련 API', () => {
  test('사용자 삭제 API 성공', async () => {
    const res = await supertest(app).delete('/api/users/2').set('Cookie', Cookies);
    expect(res.status).toBe(200);
  });
});
