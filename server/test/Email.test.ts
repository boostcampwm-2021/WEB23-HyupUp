import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import app from '../app';
import request from 'supertest';
import supertest from 'supertest';
import { afterAllFunction, beforeAllfunction } from '.';

beforeAll(beforeAllfunction);
afterAll(afterAllFunction);

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
