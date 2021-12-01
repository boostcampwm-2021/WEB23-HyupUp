import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';
import { entities } from '../src';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
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

describe('verifying Email', () => {
  const validKey = v4();
  const invalidKey = v4();
  const redisConnection: RedisClient = createClient({
    host: process.env.REDIS_HOST,
    port: +(process.env.REDIS_PORT as string),
  });
  const validToken = jwt.sign({ id: validKey }, process.env.SECRET as string, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });

  const invalidToken = jwt.sign({ id: invalidKey }, process.env.SECRET as string, {
    algorithm: 'HS256',
    expiresIn: '1s',
  });
  const setAsync = promisify(redisConnection.set).bind(redisConnection);

  test('올바른 token을 통한 링크인 경우', async () => {
    await setAsync(validKey, JSON.stringify({ organizationId: 1, email: 'test10@test.com' }));
    const res = await supertest(app).get(`/api/email/verify/${validToken}`);
    redisConnection.del(validKey);
    expect(res.status).toBe(302);
  });
  test('올바른 token이 만료된 경우', async () => {
    await setAsync(invalidKey, JSON.stringify({ organizationId: 1, email: 'test10@test.com' }));
    const res = await supertest(app).get(`/api/email/verify/${invalidToken}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    redisConnection.del(invalidKey);
    expect(res.status).toBe(401);
  });
  test('token이 없는 경우', async () => {
    await setAsync('1234', JSON.stringify({ organizationId: 1, email: 'test10@test.com' }));
    const res = await supertest(app).get(`/api/email/verify/1234`);
    redisConnection.del('1234');
    expect(res.status).toBe(401);
  });
});
