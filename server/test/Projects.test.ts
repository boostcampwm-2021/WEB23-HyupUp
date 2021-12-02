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

describe('프로젝트 생성', () => {
  test('올바른 userId로 요청한다.', async () => {
    const req = request(app).post('/api/projects');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '테스트 프로젝트', userId: 1 });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('테스트 프로젝트');
    expect(res.body.id).toBe(3);
  });
  test('잘못된 userId로 요청한다.', async () => {
    const req = request(app).post('/api/projects');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '테스트 프로젝트2', userId: 100 });
    expect(res.status).toBe(401);
  });
  test('userId없이 요청한다.', async () => {
    const req = request(app).post('/api/projects');
    req.set('Cookie', Cookies);
    const res = await req.send({ name: '테스트 프로젝트3' });
    expect(res.status).toBe(401);
  });
});

// TODO: User로 옮겨야 함
describe('프로젝트에 초대또는 프로젝트에서 제거', () => {
  test('올바른 body로 유저를 초대한다.', async () => {
    const req = request(app).patch('/api/users/project');
    req.set('Cookie', Cookies);
    const res = await req.send({
      userId: 2,
      projectId: 1,
      isInvite: true,
    });
    expect(res.status).toBe(200);
  });
  test('올바른 body로 유저를 제거한다.', async () => {
    const req = request(app).patch('/api/users/project');
    req.set('Cookie', Cookies);
    const res = await req.send({
      userId: 2,
      projectId: 1,
      isInvite: false,
    });
    expect(res.status).toBe(200);
  });
  test('userId 없이 프로젝트에 초대한다.', async () => {
    const req = request(app).patch('/api/users/project');
    req.set('Cookie', Cookies);
    const res = await req.send({
      projectId: 1,
      isInvite: true,
    });
    expect(res.status).toBe(400);
  });
  test('projectId 없이 프로젝트에 초대한다.', async () => {
    const req = request(app).patch('/api/users/project');
    req.set('Cookie', Cookies);
    const res = await req.send({
      userId: 2,
      isInvite: true,
    });
    expect(res.status).toBe(400);
  });
  test('잘못된 body로 초대요청을 한다.', async () => {
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

describe('프로젝트 삭제', () => {
  test('올바른 projectId로 삭제요청을 한다.', async () => {
    const projectId = 3;
    const req = request(app).delete(`/api/projects/${projectId}`);
    req.set('Cookie', Cookies);
    const res = await req;
    expect(res.status).toBe(200);
  });
  test('잘못된 projectId로 삭제요청을 한다.', async () => {
    const projectId = 2;
    const req = request(app).delete(`/api/projects/${projectId}`);
    req.set('Cookie', Cookies);
    const res = await req;
    expect(res.status).toBe(404);
  });
});
