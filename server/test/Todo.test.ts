import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { entities } from '../src';
import app from '../app';
import request from 'supertest';

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
  await connection.query(
    'INSERT INTO TODO(NAME, createdAT, updatedAT, STATUS, USER_ID)' +
      `VALUES('에픽 api 테스트 작성', '2021-11-03 00:00:00', '2021-11-03 00:00:00', 0, 1);`,
  );
  await connection.query(
    'INSERT INTO TODO(NAME, createdAt, updatedAt, STATUS, USER_ID)' +
      `VALUES('스토리 작성', '2021-11-02 00:00:00', '2021-11-04 00:00:00', 0, 1);`,
  );
  await connection.query(
    'INSERT INTO TODO(NAME, createdAt, updatedAt, STATUS, USER_ID)' +
      `VALUES('네트워킹 데이 준비', '2021-11-04 00:00:00', '2021-11-06 00:00:00', 0, 1);`,
  );
  await connection.query(
    'INSERT INTO TODO(NAME, createdAt, updatedAt, STATUS, USER_ID)' +
      `VALUES('부스트캠프 수료', '2021-11-04 00:00:00', '2021-11-06 00:00:00', 0,1);`,
  );
});

afterAll(async () => {
  const connection = await getConnection();
  await connection.query(`DELETE FROM TODO;`);
  await connection.query(`DELETE FROM USERS;`);
  await connection.query(`DELETE FROM ORGANIZATIONS;`);
  await connection.query('ALTER TABLE ORGANIZATIONS AUTO_INCREMENT = 1');
  await connection.query('ALTER TABLE USERS AUTO_INCREMENT = 1');
  await connection.query('ALTER TABLE TODO AUTO_INCREMENT = 1');
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

describe('create TODO', () => {
  test('create TODO by valid input', async () => {
    const req = request(app).post('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '안녕하세요', userId: 1 });
    expect(res.status).toEqual(201);
    expect(res.body.id).toBe(5);
    expect(res.body.name).toBe('안녕하세요');
    expect(res.body.status).toBe(false);
  });
  test('create TODO by invalid input without name', async () => {
    const req = request(app).post('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req.send({ userId: 1 });
    expect(res.status).toBe(400);
  });
  test('create TODO by invalid input without userId', async () => {
    const req = request(app).post('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '안녕하세요' });
    expect(res.status).toBe(400);
  });
  test('create TODO by invalid userId', async () => {
    const req = request(app).post('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '안녕하세요', userId: 2 });
    expect(res.status).toBe(400);
  });
});

describe('update TODO', () => {
  test('update TODO', async () => {
    const req = request(app).patch('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '안녕하세요2', id: 1, status: false });
    expect(res.status).toBe(200);
  });
  test('update TODO without id', async () => {
    const req = request(app).patch('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '안녕하세요2', status: false });
    expect(res.status).toBe(401);
  });
  test('update TODO without name', async () => {
    const req = request(app).patch('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req.send({ id: 1, status: false });
    expect(res.status).toBe(401);
  });
  test('update TODO without status', async () => {
    const req = request(app).patch('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '안녕하세요2', id: 1 });
    expect(res.status).toBe(401);
  });
  test('update TODO with invalid id', async () => {
    const req = request(app).patch('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '안녕하세요2', id: 999, status: false });
    expect(res.status).toBe(401);
    // id가 invalid하면 error를 반환해야하는 것이 아닌가?
  });
});

describe('delete TODO', () => {
  test('delete TODO', async () => {
    const req = request(app).delete('/api/todo?id=5');
    req.set('Cookie', Cookies);
    const res = await req;
    expect(res.status).toBe(200);
  });
  test('delete TODO', async () => {
    const req = request(app).delete('/api/todo');
    req.set('Cookie', Cookies);
    const res = await req;
    expect(res.status).toBe(401);
  });
  test('update TODO', async () => {
    const req = request(app).delete('/api/todo?id=100');
    req.set('Cookie', Cookies);
    const res = await req;
    expect(res.status).toBe(400);
    // id가 invalid하면 error를 반환해야하는 것이 아닌가?
  });
});
