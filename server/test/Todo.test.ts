import app from '../app';
import request from 'supertest';
import { afterAllFunction, beforeAllfunction } from '.';

beforeAll(beforeAllfunction);
afterAll(afterAllFunction);

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
    const res = await request(app)
      .post('/api/todo')
      .set('Cookie', Cookies)
      .send({ name: '안녕하세요', userId: 1 });
    expect(res.status).toEqual(201);
    expect(res.body.id).toBe(6);
    expect(res.body.name).toBe('안녕하세요');
    expect(res.body.status).toBe(false);
  });
  test('create TODO by invalid input without name', async () => {
    const res = await request(app).post('/api/todo').set('Cookie', Cookies).send({ userId: 1 });
    expect(res.status).toBe(400);
  });
  test('create TODO by invalid input without userId', async () => {
    const res = await request(app)
      .post('/api/todo')
      .set('Cookie', Cookies)
      .send({ name: '안녕하세요' });
    expect(res.status).toBe(400);
  });
  test('create TODO by invalid userId', async () => {
    const res = await request(app)
      .post('/api/todo')
      .set('Cookie', Cookies)
      .send({ name: '안녕하세요', userId: 1000 });
    expect(res.status).toBe(400);
  });
});

describe('update TODO', () => {
  test('update TODO', async () => {
    const res = await request(app)
      .patch('/api/todo')
      .set('Cookie', Cookies)
      .send({ name: '안녕하세요2', id: 1, status: false });
    expect(res.status).toBe(200);
  });
  test('update TODO without id', async () => {
    const res = await request(app)
      .patch('/api/todo')
      .set('Cookie', Cookies)
      .send({ name: '안녕하세요2', status: false });
    expect(res.status).toBe(401);
  });
  test('update TODO without name', async () => {
    const res = await request(app)
      .patch('/api/todo')
      .set('Cookie', Cookies)
      .send({ id: 1, status: false });
    expect(res.status).toBe(401);
  });
  test('update TODO without status', async () => {
    const res = await request(app)
      .patch('/api/todo')
      .set('Cookie', Cookies)
      .send({ name: '안녕하세요2', id: 1 });
    expect(res.status).toBe(401);
  });
  test('update TODO with invalid id', async () => {
    const res = await request(app)
      .patch('/api/todo')
      .set('Cookie', Cookies)
      .send({ name: '안녕하세요2', id: 999, status: false });
    expect(res.status).toBe(401);
  });
});

describe('delete TODO', () => {
  test('delete TODO', async () => {
    const res = await request(app).delete('/api/todo?id=5').set('Cookie', Cookies);
    expect(res.status).toBe(200);
  });
  test('delete TODO', async () => {
    const res = await request(app).delete('/api/todo').set('Cookie', Cookies);
    expect(res.status).toBe(401);
  });
  test('delete TODO', async () => {
    const res = await request(app).delete('/api/todo?id=100').set('Cookie', Cookies);
    expect(res.status).toBe(401);
  });
});
