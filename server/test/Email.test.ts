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
beforeAll((done) => {
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

describe('sending Email', () => {
  test('잘못된 입력으로 발송 실패', async () => {
    const res = await supertest(app).post('/api/email').set('Cookie', Cookies).send({
      email: 'chanholee275@gmail.com',
    });
    expect(res.status).toBe(400);
  });
  test('중복된 이메일 입력으로 발송 실패', async () => {
    const res = await supertest(app).post('/api/email').set('Cookie', Cookies).send({
      email: 'test@test.com',
      organizationId: 1,
    });
    expect(res.status).toBe(409);
  });
  test('이메일 전송 성공', async () => {
    const res = await supertest(app).post('/api/email').set('Cookie', Cookies).send({
      email: 'chanholee275@gmail.com',
      organizationId: 1,
    });
    expect(res.status).toBe(201);
  });
});
