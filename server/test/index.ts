import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { entities } from '../src';

export const beforeAllfunction = async () => {
  // 테스트 db 설정
  const dbConfig = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_TEST,
  };
  // typeoprm 연결 옵션
  const connectionOptions: ConnectionOptions = {
    type: 'mysql',
    synchronize: true,
    entities: entities,
    ...dbConfig,
  };
  // db 데이터 삽입
  const connection = await createConnection(connectionOptions);
  await connection.synchronize();
  // 조직, 프로젝트, 유저
  await connection.query(`INSERT INTO ORGANIZATIONS(ROOM) VALUES('TEAM42');`);
  await connection.query(`INSERT INTO PROJECTS(NAME) VALUES('HYUPUP');`);
  await connection.query(`INSERT INTO PROJECTS(NAME) VALUES('HYUPUP2');`);
  await connection.query(
    `INSERT INTO USERS(NAME, JOB, EMAIL, IMAGE_URL, ADMIN, PASSWORD, ORGANIZATION_ID)` +
      `VALUES('harry', 'developer', 'test@test.com', 'url', 1,` +
      `'$2b$10$e3kxJ2jBwf/o5rpNgG.rqe/fvHyPxl2UH6r16ySb18IsLEeeGMwye', 1);`,
  );
  await connection.query(
    `INSERT INTO USERS(NAME, JOB, EMAIL, IMAGE_URL, ADMIN, PASSWORD, ORGANIZATION_ID)` +
      `VALUES('jarry', 'developer', 'test2@test.com', 'url', 0,` +
      `'$2b$10$e3kxJ2jBwf/o5rpNgG.rqe/fvHyPxl2UH6r16ySb18IsLEeeGMwye', 1);`,
  );
  // 에픽
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
  await connection.query(
    'INSERT INTO EPICS(NAME, START_AT, END_AT, `ORDER`, PROJECT_ID)' +
      `VALUES('마지막 에픽', '2021-11-5 00:00:00', '2021-11-06 00:00:00', 4, 2);`,
  );
  // 스토리
  await connection.query(
    'INSERT INTO STORIES(NAME, STATUS, EPIC_ID, `ORDER`, PROJECT_ID)' +
      `VALUES('첫 번째 스토리', '1', 1, 0, 1);`,
  );
  await connection.query(
    'INSERT INTO STORIES(NAME, STATUS, EPIC_ID, `ORDER`, PROJECT_ID)' +
      `VALUES('두 번째 스토리', '1', 2, 1, 1);`,
  );
  await connection.query(
    'INSERT INTO STORIES(NAME, STATUS, EPIC_ID, `ORDER`, PROJECT_ID)' +
      `VALUES('세 번째 스토리', '1', 3, 2, 1);`,
  );
  await connection.query(
    'INSERT INTO STORIES(NAME, STATUS, EPIC_ID, `ORDER`, PROJECT_ID)' +
      `VALUES('네 번째 스토리', '1', 3, 3, 1);`,
  );
  await connection.query(
    'INSERT INTO STORIES(NAME, STATUS, EPIC_ID, `ORDER`, PROJECT_ID)' +
      `VALUES('마지막 스토리', '1', 3, 4, 2);`,
  );
  // 태스크
  await connection.query(
    'INSERT INTO TASKS(NAME, createdAt, updatedAt, STATUS, USER_ID, PROJECT_ID, STORY_ID)' +
      `VALUES('첫 번째 태스크', '2021-11-01 00:00:00', '2021-11-02 00:00:00', 0, 1, 1, 1);`,
  );
  await connection.query(
    'INSERT INTO TASKS(NAME, createdAt, updatedAt, STATUS, USER_ID, PROJECT_ID, STORY_ID)' +
      `VALUES('두 번째 태스크', '2021-11-02 00:00:00', '2021-11-03 00:00:00', 0, 1, 1, 1);`,
  );
  await connection.query(
    'INSERT INTO TASKS(NAME, createdAt, updatedAt, STATUS, USER_ID, PROJECT_ID, STORY_ID)' +
      `VALUES('세 번째 태스크', '2021-11-04 00:00:00', '2021-11-05 00:00:00', 0, 1, 1, 1);`,
  );
  await connection.query(
    'INSERT INTO TASKS(NAME, createdAt, updatedAt, STATUS, USER_ID, PROJECT_ID, STORY_ID)' +
      `VALUES('네 번째 태스크', '2021-11-04 00:00:00', '2021-11-05 00:00:00', 0, 1, 1, 1);`,
  );
  await connection.query(
    'INSERT INTO TASKS(NAME, createdAt, updatedAt, STATUS, USER_ID, PROJECT_ID, STORY_ID)' +
      `VALUES('마지막 태스크', '2021-11-05 00:00:00', '2021-11-06 00:00:00', 0, 1, 1, 2);`,
  );
  // 투두
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
  await connection.query(
    'INSERT INTO TODO(NAME, createdAt, updatedAt, STATUS, USER_ID)' +
      `VALUES('마지막 투두', '2021-11-05 00:00:00', '2021-11-06 00:00:00', 0,2);`,
  );
};

export const afterAllFunction = async () => {
  const connection = await getConnection();
  await connection.query(`DROP DATABASE ${process.env.DB_DATABASE_TEST};`);
  await connection.query(`CREATE DATABASE ${process.env.DB_DATABASE_TEST};`);
  await connection.close();
};
