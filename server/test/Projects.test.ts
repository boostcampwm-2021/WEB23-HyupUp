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

describe('create PROJECT', () => {
  test('create PROJECT by valid userId', async () => {
    const req = request(app).post('/api/projects');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '테스트 프로젝트', userId: 1 });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('테스트 프로젝트');
    expect(res.body.id).toBe(3);
  });
  test('create PROJECT by invalid userId', async () => {
    const req = request(app).post('/api/projects');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '테스트 프로젝트2', userId: 100 });
    expect(res.status).toBe(401);
  });
  test('create PROJECT without userId', async () => {
    const req = request(app).post('/api/projects');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '테스트 프로젝트3' });
    expect(res.status).toBe(401);
  });
});

// TODO: User로 옮겨야 함
describe('update PROJECT for invite', () => {
  test('invite user by valid body', async () => {
    const req = request(app).patch('/api/users/project');
    req.set('Cookie', Cookies);
    const res = await req.send({
      userId: 2,
      projectId: 1,
      isInvite: true,
    });
    expect(res.status).toBe(200);
  });
  test('remove user by valid body', async () => {
    const req = request(app).patch('/api/users/project');
    req.set('Cookie', Cookies);
    const res = await req.send({
      userId: 2,
      projectId: 1,
      isInvite: false,
    });
    expect(res.status).toBe(200);
  });
  test('invite user without userId', async () => {
    const req = request(app).patch('/api/users/project');
    req.set('Cookie', Cookies);
    const res = await req.send({
      projectId: 1,
      isInvite: true,
    });
    expect(res.status).toBe(400);
  });
  test('invite user without projectId', async () => {
    const req = request(app).patch('/api/users/project');
    req.set('Cookie', Cookies);
    const res = await req.send({
      userId: 2,
      isInvite: true,
    });
    expect(res.status).toBe(400);
  });
  test('invite user by invalid body', async () => {
    const req = request(app).patch('/api/users/project');
    req.set('Cookie', Cookies);
    const res = await req.send({
      userId: 20,
      projectId: 1,
      isInvite: true,
    });
    expect(res.status).toBe(400);
  });
});

describe('delete PROJECT', () => {
  test('delete PROJECT by valid projectId', async () => {
    const projectId = 3;
    const req = request(app).delete(`/api/projects/${projectId}`);
    req.set('Cookie', Cookies);
    const res = await req;
    expect(res.status).toBe(200);
  });
  test('delete PROJECT by invalid projectId', async () => {
    const projectId = 2;
    const req = request(app).delete(`/api/projects/${projectId}`);
    req.set('Cookie', Cookies);
    const res = await req;
    expect(res.status).toBe(404);
  });
});
