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

// FIXME: 세션에 사용자 mock
describe('에픽 목록 GET 요청', () => {
  test('전체 에픽 목록을 조회한다.', async () => {
    const res = await request(app).get('/api/epics?projectId=1').set('Cookie', Cookies);
    expect(res.status).toBe(200);
  });

  test('잘못된 projectId에 대해 응답코드 404을 반환한다.', async () => {
    const res = await request(app).get('/api/epics?projectId=9999').set('Cookie', Cookies);
    expect(res.status).toBe(404);
  });
});

describe('개별 에픽 GET 요청', () => {
  test('개별 에픽 정보 요청에 대한 응답을 반환한다.', async () => {
    const res = await request(app).get('/api/epics/1').set('Cookie', Cookies);
    expect(res.status).toBe(200);
  });

  test('잘못된 에픽 id로 보낸 요청에 대해 응답코드 404를 반환한다.', async () => {
    const res = await request(app).get('/api/epics/9999').set('Cookie', Cookies);
    expect(res.status).toBe(404);
  });
});

describe('에픽 생성 요청', () => {
  test('에픽을 생성한다.', async () => {
    const res = await request(app).post('/api/epics').set('Cookie', Cookies).send({
      name: '새롭게 생성한 에픽',
      projectId: 1,
      startAt: new Date(),
      endAt: new Date(),
      order: 5,
    });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 6 });
  });

  test('잘못된 에픽 생성 요청에 대해 응답코드 400을 반환한다.', async () => {
    const res = await request(app).post('/api/epics').set('Cookie', Cookies).send({
      name: '잘못된 에픽 생성 요청',
    });
    expect(res.status).toBe(400);
  });
});

describe('에픽 수정 요청', () => {
  test('에픽을 수정한다.', async () => {
    const res = await request(app)
      .patch('/api/epics/6')
      .set('Cookie', Cookies)
      .send({
        name: '수정한 에픽',
        projectId: 1,
        startAt: new Date('2021-11-03'),
        endAt: new Date('2021-11-03'),
        order: 5,
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
});

describe('에픽 삭제 요청', () => {
  test('에픽을 삭제한다.', async () => {
    const res = await request(app).delete('/api/epics/5').set('Cookie', Cookies);
    expect(res.status).toBe(200);
  });

  test('잘못된 id로 에픽 삭제 요청을 보낼 시 응답코드 404을 반환한다.', async () => {
    const res = await request(app).delete('/api/epics/9999').set('Cookie', Cookies);
    expect(res.status).toBe(404);
  });
});
