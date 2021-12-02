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
    'INSERT INTO EPICS(NAME, START_AT, END_AT, `ORDER`, PROJECT_ID)' +
      `VALUES('에픽 api 테스트 작성', '2021-11-03 00:00:00', '2021-11-03 00:00:00', 0, 1);`,
  );
  await connection.query(
    'INSERT INTO EPICS(NAME, START_AT, END_AT, `ORDER`, PROJECT_ID)' +
      `VALUES('스토리 작성', '2021-11-02 00:00:00', '2021-11-04 00:00:00', 1, 1);`,
  );
  await connection.query(
    'INSERT INTO EPICS(NAME, START_AT, END_AT, `ORDER`, PROJECT_ID)' +
      `VALUES('네트워킹 데이 준비', '2021-11-04 00:00:00', '2021-11-06 00:00:00', 2, 1);`,
  );
  await connection.query(
    'INSERT INTO EPICS(NAME, START_AT, END_AT, `ORDER`, PROJECT_ID)' +
      `VALUES('부스트캠프 수료', '2021-11-04 00:00:00', '2021-11-06 00:00:00', 3, 1);`,
  );
});

afterAll(async () => {
  const connection = await getConnection();
  await connection.query(`DELETE FROM USERS;`);
  await connection.query(`DELETE FROM EPICS;`);
  await connection.query(`DELETE FROM PROJECTS;`);
  await connection.query(`DELETE FROM ORGANIZATIONS;`);
  await connection.query('ALTER TABLE ORGANIZATIONS AUTO_INCREMENT = 1');
  await connection.query('ALTER TABLE USERS AUTO_INCREMENT = 1');
  await connection.query('ALTER TABLE PROJECTS AUTO_INCREMENT = 1');
  await connection.query('ALTER TABLE EPICS AUTO_INCREMENT = 1');
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

// FIXME: 세션에 사용자 mock
test('전체 에픽 목록을 조회한다.', async () => {
  const res = await request(app).get('/api/epics?projectId=1').set('Cookie', Cookies);
  expect(res.status).toBe(200);
});

test('잘못된 projectId에 대해 응답코드 404을 반환한다.', async () => {
  const res = await request(app).get('/api/epics?projectId=9999').set('Cookie', Cookies);
  expect(res.status).toBe(404);
});

test('개별 에픽 정보 요청에 대한 응답을 반환한다.', async () => {
  const res = await request(app).get('/api/epics/1').set('Cookie', Cookies);
  expect(res.status).toBe(200);
});

test('잘못된 에픽 id로 보낸 요청에 대해 응답코드 404를 반환한다.', async () => {
  const res = await request(app).get('/api/epics/9999').set('Cookie', Cookies);
  expect(res.status).toBe(404);
});

test('에픽을 생성한다.', async () => {
  const res = await request(app).post('/api/epics').set('Cookie', Cookies).send({
    name: '새롭게 생성한 에픽',
    projectId: 1,
    startAt: new Date(),
    endAt: new Date(),
    order: 4,
  });
  expect(res.status).toBe(201);
  expect(res.body).toEqual({ id: 5 });
});

test('잘못된 에픽 생성 요청에 대해 응답코드 400을 반환한다.', async () => {
  const res = await request(app).post('/api/epics').set('Cookie', Cookies).send({
    name: '잘못된 에픽 생성 요청',
  });
  expect(res.status).toBe(400);
});

test('에픽을 수정한다.', async () => {
  const res = await request(app)
    .patch('/api/epics/5')
    .set('Cookie', Cookies)
    .send({
      name: '수정한 에픽',
      projectId: 1,
      startAt: new Date('2021-11-03'),
      endAt: new Date('2021-11-03'),
      order: 4,
    });
  expect(res.status).toBe(200);
  expect(res.body).toEqual({});

  // FIXME: 이 상태로는 get 요청까지 validate 함
  // 어떻게 수정됐음을 확인할것인가?
  const edited = await request(app).get('/api/epics/5').set('Cookie', Cookies);
  expect(edited.status).toBe(200);
});

test('잘못된 에픽 수정 요청에 대해 응답코드 404을 반환한다.', async () => {
  const res = await request(app)
    .patch('/api/epics/9999')
    .send({
      name: '잘못 요청한 에픽',
    })
    .set('Cookie', Cookies);
  expect(res.status).toBe(404);
});

test('에픽을 삭제한다.', async () => {
  const res = await request(app).delete('/api/epics/5').set('Cookie', Cookies);
  expect(res.status).toBe(200);
});

test('잘못된 id로 에픽 삭제 요청을 보낼 시 응답코드 404을 반환한다.', async () => {
  const res = await request(app).delete('/api/epics/9999').set('Cookie', Cookies);
  expect(res.status).toBe(404);
});
