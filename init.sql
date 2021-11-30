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


INSERT INTO `HYUPUP`.`EPICS` (`PROJECT_ID`, 'ID',`NAME`, `START_AT`, `END_AT`, `ORDER`) VALUES ( '1',,"10", '관리자 페이지 구현', NOW(), NOW(), 10);
INSERT INTO `HYUPUP`.`EPICS` (`PROJECT_ID`, 'ID',`NAME`, `START_AT`, `END_AT`, `ORDER`) VALUES ( '1',,"11", '프로젝트 관리 페이지 구현', NOW(), NOW(), 11);
INSERT INTO `HYUPUP`.`EPICS` (`PROJECT_ID`, 'ID',`NAME`, `START_AT`, `END_AT`, `ORDER`) VALUES ( '1',,"12", '프로젝트 팀원 관리 구현', NOW(), NOW(), 12);
INSERT INTO `HYUPUP`.`EPICS` (`PROJECT_ID`, 'ID',`NAME`, `START_AT`, `END_AT`, `ORDER`) VALUES ( '1',,"13", '팀원 참여 페이지 구현', NOW(), NOW(), 13);

INSERT INTO STORIES(ID, NAME, STATUS, EPIC_ID, PROJECT_ID, `ORDER`) VALUES(10, '관리자가 관리자 페이지 아이콘 클릭하면 관리자페이지가 표시된다.', '1', 10, 1, 10);
INSERT INTO STORIES(ID, NAME, STATUS, EPIC_ID, PROJECT_ID, `ORDER`) VALUES(11, '관리자 페이지의 사이드바에 프로젝트 관리를 누르면 프로젝트 관리 페이지가 나온다.', '1', 11, 1, 11);
INSERT INTO STORIES(ID, NAME, STATUS, EPIC_ID, PROJECT_ID, `ORDER`) VALUES(12, '프로젝트 팀원 추가 버튼을 누르면 팀원 추가 모달이 보인다.', '1', 12, 1, 12);
INSERT INTO STORIES(ID, NAME, STATUS, EPIC_ID, PROJECT_ID, `ORDER`) VALUES(14, '이메일로 부터 초대 받으면 새로운 조직에 가입할 수 있다.', '1', 13, 1, 14);



INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '10', '1', '사이드 바가 표시된다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '10', '1', '기존에 포함된 팀원들을 사진과 직무와 함께 표시한다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '10', '1', '팀원 초대하기 버튼 클릭 시 초대 모달을 표시한다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '10', '1', '팀원 초대 모달을 통해 팀원의 메일을 입력하여 초대 메일을 발송한다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '10', '1', '미트볼 메뉴 클릭시 설정 드랍다운 팀원에서 제외버튼과 상태에 따른 (팀원으로 변경/ 관리자로 변경) 이 표시한다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '10', '1', '팀원에서 제외와 권한 변경 (팀원으로 / 관리자로) 클릭 시 확인을 요구하는 모달이 표시된다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '10', '1', '검색바에서 이름 입력시 실시간으로 필터링된다.');

INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '11', '1', '기존에 있던 프로젝트들이 표시된다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '11', '1', '새 프로젝트 명을 입력하고 생성버튼을 눌러 프로젝트를 생성한다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '11', '1', '미트볼 메뉴를 누르면 드롭다운을 표시한다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '11', '1', '프로젝트 삭제 버튼 클릭시 예/아니오 모달이 표시된다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '11', '1', '예 클릭시 프로젝트가 사라진다.');

INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '12', '1', '전체 팀원들의 프로필과 직무가 표시된다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '12', '1', '프로젝트 참여여부에 따라 + - 버튼이 표시된다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '12', '1', '+, - 버튼을 통해 팀원을 추가하거나 삭제할 수 있다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '12', '1', '- 버튼 클릭 시 사원의 리스트가 왼쪽/오른쪽으로 밀리고, 빨간 휴지통 아이콘이 나타나고, 클릭 시 삭제가 가능하다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '12', '1', '검색바에서 이름입력시 실시간으로 필터링된다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '12', '1', 'x 버튼을 클릭하거나, 모달 이외의 영역 클릭 시 모달이 닫힌다.');

INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '14', '1', '이메일로 전송받은 링크 클릭 시 인증 서버로 리다이렉션 된다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '14', '1', '구글 인증 후 우리 페이지로 리다이렉트되고, 해당 페이지에서 사진 / 이름 / 직무를 입력 할 수 있다.');
INSERT INTO `HYUPUP`.`TASKS` (`STATUS`, `PROJECT_ID`, `STORY_ID`, `USER_ID`, `NAME`) VALUES ('0', '1', '14', '1', '해당 조직에 속해 해당 홈페이지로 넘어간다.');