INSERT INTO `HYUPUP`.`ORGANIZATIONS` (`ID`, `ROOM`) VALUES ('1', 'room1');
INSERT INTO `HYUPUP`.`ORGANIZATIONS` (`ID`, `ROOM`) VALUES ('2', 'TEAM42');


INSERT INTO `HYUPUP`.`USERS` (`ID`, `ADMIN`, `ORGANIZATION_ID`, `JOB`, `NAME`, `EMAIL`, `IMAGE_URL`, `PASSWORD`) VALUES ('1', '1', '1', 'FE', 'harry', 'test1@gmail.com', 'Boy0', '$2b$10$e3kxJ2jBwf/o5rpNgG.rqe/fvHyPxl2UH6r16ySb18IsLEeeGMwye');
INSERT INTO `HYUPUP`.`USERS` (`ID`, `ADMIN`, `ORGANIZATION_ID`, `JOB`, `NAME`, `EMAIL`, `IMAGE_URL`, `PASSWORD`) VALUES ('2', '0', '1', 'BE', 'jarry', 'test2@gmail.com', 'Girl0', '$2b$10$e3kxJ2jBwf/o5rpNgG.rqe/fvHyPxl2UH6r16ySb18IsLEeeGMwye');
INSERT INTO `HYUPUP`.`USERS` (`ID`, `ADMIN`, `ORGANIZATION_ID`, `JOB`, `NAME`, `EMAIL`, `IMAGE_URL`, `PASSWORD`) VALUES ('3', '1', '2', 'BE', 'rudy', 'rudy@gmail.com', 'Girl1', '$2b$10$e3kxJ2jBwf/o5rpNgG.rqe/fvHyPxl2UH6r16ySb18IsLEeeGMwye');


INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '1', '강아지 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '1', '고양이 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '2', '거북이 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ('1', '1', '다람쥐 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ('0', '2', '호랑이 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ('1', '1', '원숭이 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ('0', '1', '코알라 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ('0', '2', '사자 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ('1', '1', '사슴 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '1', '늑대 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '2', '여우 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '1', '1', '코끼리 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '1', '1', '펭귄 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '1', '토끼 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '2', '코뿔소 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '1', '1', '돼지 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '2', '오리 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '1', '2', '비둘기 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '1', '당나귀 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '2', '곰 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '1', '악어 산책 시키기');
INSERT INTO `HYUPUP`.`TODO` (`STATUS`, `USER_ID`, `NAME`) VALUES ( '0', '2', '기린 산책 시키기');


INSERT INTO `HYUPUP`.`PROJECTS` (`ID`, `NAME`) VALUES ('1', '첫플젝');
INSERT INTO `HYUPUP`.`PROJECTS` (`ID`, `NAME`) VALUES ('2', '두번째');
INSERT INTO `HYUPUP`.`PROJECTS` (`ID`, `NAME`) VALUES ('3', 'project hyupup');


INSERT INTO `HYUPUP`.`USERS_PROJECTS` (`USER_ID`, `PROJECT_ID`) VALUES ('1', '1');
INSERT INTO `HYUPUP`.`USERS_PROJECTS` (`USER_ID`, `PROJECT_ID`) VALUES ('1', '2');
INSERT INTO `HYUPUP`.`USERS_PROJECTS` (`USER_ID`, `PROJECT_ID`) VALUES ('2', '2');
INSERT INTO `HYUPUP`.`USERS_PROJECTS` (`USER_ID`, `PROJECT_ID`) VALUES ('3', '3');


INSERT INTO `HYUPUP`.`EPICS` (`PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`) VALUES ( '1', '환경설정', NOW(), NOW(), 0);
INSERT INTO `HYUPUP`.`EPICS` (`PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`) VALUES ( '1', '홈페이지 구현', NOW(), NOW(), 1);
INSERT INTO `HYUPUP`.`EPICS` (`PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`) VALUES ( '1', '작업 페이지 기본 구현', NOW(), NOW(), 2);
INSERT INTO `HYUPUP`.`EPICS` (`PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`) VALUES ( '1', '로드맵 구현', NOW(), NOW(), 3);
INSERT INTO `HYUPUP`.`EPICS` (`NAME`, `PROJECT_ID`,  `START_AT`, `END_AT`, `ORDER`) VALUES ( '마이그레이션', '2', NOW(), NOW(), 1); 
INSERT INTO `HYUPUP`.`EPICS` (`NAME`, `PROJECT_ID`,  `START_AT`, `END_AT`, `ORDER`) VALUES ( '칸반보드 구현', '2', NOW(), NOW(), 1); 

INSERT INTO `HYUPUP`.`EPICS` (`NAME`, `PROJECT_ID`,  `START_AT`, `END_AT`, `ORDER`, 'ID') VALUES ( '로그인 페이지 구현', '1', '2021-11-23', '2021-11-25', 4, 4); 
INSERT INTO `HYUPUP`.`EPICS` (`NAME`, `PROJECT_ID`,  `START_AT`, `END_AT`, `ORDER`, 'ID') VALUES ( '작업페이지 기본 구현', '1','2021-11-09', '2021-11-10' 5, 5); 
INSERT INTO `HYUPUP`.`EPICS` (`NAME`, `PROJECT_ID`,  `START_AT`, `END_AT`, `ORDER`, 'ID') VALUES ( '로드맵 구현', '1', '2021-11-11','2021-11-25', 6, 6);


INSERT INTO STORIES(NAME, STATUS, EPIC_ID, PROJECT_ID, `ORDER`) VALUES('로그인 페이지에서 이메일과 비밀번호를 입력하면 메인 페이지로 이동한다.', '3', 4, 1, 4);
INSERT INTO STORIES(NAME, STATUS, EPIC_ID, PROJECT_ID, `ORDER`) VALUES('작업페이지 아이콘 클릭 시 작업 페이지로 이동한다.', '3', 5, 1, 5);
INSERT INTO STORIES(NAME, STATUS, EPIC_ID, PROJECT_ID, `ORDER`) VALUES('사이드바의 로드맵 클릭 시 로드맵 페이지가 표시된다.', '3', 6, 1, 6);

INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '5', '1', '첫 번째 프로젝트에 대한 작업페이지를 디폴트로 표시한다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '5', '1', '프로젝트 드롭다운에 프로젝트 목록이 표시된다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '5', '1', '로드맵, 칸반보드, 백로그 클릭시 해당 페이지로 이동한다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '5', '1', '드롭다운에서 프로젝트 클릭시 해당 프로젝트의 작업페이지가 표시된다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '0', '1', '5', '1', '가장 마지막에 본 작업페이지를 기본으로 표시한다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '6', '1', '사이드바의 로드맵 글자가 활성화 된다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '6', '1', '전체적인 UI, 현재 프로젝트의 에픽 목록과 추가버튼이 표시된다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '6', '1', '추가버튼을 눌러 에픽을 추가할 수 있다. + 소켓 이벤트 emit');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('1', '1', '6', '1', '오른쪽 영역에 한 달을 열로 가지고 에픽 갯수 만큼의 행을 가진 표가 생성된다');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '6', '1', '좌우 버튼을 클릭해서 일주일단위로 변경한다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '6', '1', '에픽의 시작일과 종료일을 보여주는 막대그래프를 표시한다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('1', '1', '6', '1', '막대그래프의 크기를 드래그앤 드랍으로 조정하여 시작일과 종료일을 변경한다. (소켓)');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '6', '1', '칸반보드의 상태에 따라 색상이 변경된다. ');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '4', '1', '유저 정보가 없다면 렌딩페이지 / 있다면 홈페이지로 이동한다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '4', '1', '렌딩페이지에서 이메일로 로그인이 가능하다.');
INSERT INTO `HYUPUP`.`TASKS` ( `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ( '1', '1', '4', '1', '로그인 후 정보가 있다면 세션 저장 후 홈페이지로 이동한다.');

INSERT INTO STORIES(NAME, STATUS, EPIC_ID, PROJECT_ID, `ORDER`) VALUES('첫 스토리', '1', 1, 1, 0);
INSERT INTO STORIES(NAME, STATUS, EPIC_ID, PROJECT_ID, `ORDER`) VALUES('두 번째 스토리', '2', 1, 1, 1);


INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('1', '0', '1', '1', '1', '테스크1');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('2', '0', '1', '1', '2', '테스크2');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('3', '1', '1', '1', '1', '테스크3');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('4', '0', '1', '1', '2', '테스크4');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('5', '0', '1', '1', '1', '테스크5');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('6', '1', '1', '1', '2', '테스크6');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('7', '0', '1', '1', '1', '테스크7');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('8', '0', '1', '1', '2', '테스크8');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('9', '0', '1', '1', '1', '테스크9');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('10', '0', '1', '1', '2', '테스크10');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('11', '0', '1', '1', '1', '테스크11');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('12', '0', '1', '1', '2', '테스크12');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('13', '0', '2', '2', '1', '테스크13');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('14', '0', '2', '2', '2', '테스크14');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('15', '0', '2', '2', '1', '테스크15');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('16', '0', '2', '2', '2', '테스크16');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('17', '0', '2', '2', '1', '테스크17');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('18', '0', '2', '2', '2', '테스크18');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('19', '0', '2', '2', '1', '테스크19');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('20', '0', '2', '2', '2', '테스크20');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('21', '0', '2', '2', '1', '테스크21');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('22', '0', '2', '2', '2', '테스크22');
INSERT INTO `HYUPUP`.`TASKS` (`ID`, `STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('23', '0', '2', '2', '1', '테스크23');