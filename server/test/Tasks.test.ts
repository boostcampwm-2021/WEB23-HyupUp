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

describe('스토리 내의 Tasks 배열 GET 요청', () => {
  test('올바른 storyId 로 요청', async () => {
    const param = 1;
    const req = request(app).get(`/api/tasks/${param}`);
    req.set('Cookie', Cookies);
    const res = await req.send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(4);
  });
  test('올바르지 않은 storyId 로 요청', async () => {
    const param = 10;
    const req = request(app).get(`/api/tasks/${param}`);
    req.set('Cookie', Cookies);
    const res = await req.send();
    expect(res.status).toBe(400);
  });
  test('storyId 없이 요청', async () => {
    const req = request(app).get('/api/tasks/');
    req.set('Cookie', Cookies);
    const res = await req.send();
    expect(res.status).toBe(400);
  });
});

describe('스토리에 Task 추가', () => {
  test('올바른 body 로 요청', async () => {
    const req = request(app).post('/api/tasks');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: 'test', status: 1, userId: 1, projectId: 1, storyId: 1 });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(6);
  });
  test('body 없이 요청', async () => {
    const req = request(app).post('/api/tasks');
    req.set('Cookie', Cookies);
    const res = await req.send();
    expect(res.status).toBe(401);
  });
});

describe('Task 이름 변경', () => {
  test('올바른 body로 요청', async () => {
    const req = request(app).patch('/api/tasks');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: 'test', status: 1, id: 1 });
    expect(res.status).toBe(200);
  });
  test('잘못된 body로 요청', async () => {
    const req = request(app).patch('/api/tasks');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '' });
    expect(res.status).toBe(401);
  });
});

describe('Task 삭제', () => {
  test('올바른 task id 로 삭제 요청', async () => {
    const req = request(app).delete('/api/tasks?id=1');
    req.set('Cookie', Cookies);
    const res = await req.send();
    expect(res.status).toBe(200);
  });
  test('올바르지 않은 task id 로 삭제 요청', async () => {
    const req = request(app).delete('/api/tasks?id=1');
    req.set('Cookie', Cookies);
    const res = await req.send();
    expect(res.status).toBe(401);
  });
  test('task id 없이 삭제 요청', async () => {
    const req = request(app).delete('/api/tasks');
    req.set('Cookie', Cookies);
    const res = await req.send();
    expect(res.status).toBe(401);
  });
});
