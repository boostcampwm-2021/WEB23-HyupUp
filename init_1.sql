-- EPICS
INSERT INTO `HYUPUP`.`EPICS` (`ID`, `PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`)
VALUES (1, '1', '환경 설정', '2021-11-10', '2021-11-15', 10);
INSERT INTO `HYUPUP`.`EPICS` (`ID`, `PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`)
VALUES (2, '1', '홈 페이지 구현', '2021-11-15', '2021-11-22', 11);

-- STORIES
INSERT INTO `HYUPUP`.`STORIES` (`ID`, `PROJECT_ID`, `EPIC_ID`, `NAME`, `STATUS`, `ORDER`)
VALUES (1, '1', 1, '개발 환경 설정', '1', 0);
INSERT INTO `HYUPUP`.`STORIES` (`ID`, `PROJECT_ID`, `EPIC_ID`, `NAME`, `STATUS`, `ORDER`)
VALUES (2, '1', 1, '모든 페이지에 헤더가 표시된다.', '1', 1);
INSERT INTO `HYUPUP`.`STORIES` (`ID`, `PROJECT_ID`, `EPIC_ID`, `NAME`, `STATUS`, `ORDER`)
VALUES (3, '1', 2, '할일을 입력하면 리스트에 추가된다.', '1', 2);

-- TASKS
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, 'ESLint + Prettier 설정', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, 'tsconfig 설정', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, '웹팩과 바벨 설정', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, '폴더 구조', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, 'express 설정', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, 'ERD 설계', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, '필요한 패키지 설치', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, 'typeORM 설정 및 엔티티 작성', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, '디자인 시스템 기반의 공통 컴포넌트 제작', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, 'API 및 소켓 이벤트 등록', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 1, '프론트엔드 Router 설정', '0', 1);

INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, 'test1 과 test2 각각으로 로그인을 할 수 있고, 유저정보를 받아온다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '프로필 사진을 불러오는 API를 제작한다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '프로필 사진이 화면에 표시된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '팀 로고 클릭 시  메인페이지로 이동한다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '페이지 이동 아이콘이 작동한다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '프로필 사진을 클릭하면, 로그아웃 드롭다운이 나타난다.', '0', 1);

INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '개인으로 할일을 추가하면 자신에게 추가된다. (DB)', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '할일의 리스트 뷰에 할일이 모두 표시된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '전체 업무팀 업무 / 개인업무 / 완료한 업무를 클릭하여 리스트뷰를 변경한다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '할일 리스트의 완료 버튼과 완료한 일 리스트의 삭제 버튼이 프론트에서 동작한다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '리스트뷰의 버튼 클릭시 api 요청을 통해 db에 업데이트한다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 2, '리스트 뷰에 인피니트 스크롤링를 적용한다', '0', 1);