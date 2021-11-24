INSERT INTO `HYUPUP`.`ORGANIZATIONS` (`ID`, `ROOM`) VALUES ('1', 'room1');

INSERT INTO `HYUPUP`.`USERS` (`ID`, `ADMIN`, `ORGANIZATION_ID`, `JOB`, `NAME`, `EMAIL`, `IMAGE_URL`, `ACCESS_TOKEN`, `REFRESH_TOKEN`) VALUES ('1', '1', '1', 'FE', 'harry', 'test1@gmail.com', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80', 'token', 'token');
INSERT INTO `HYUPUP`.`USERS` (`ID`, `ADMIN`, `ORGANIZATION_ID`, `JOB`, `NAME`, `EMAIL`, `IMAGE_URL`, `ACCESS_TOKEN`, `REFRESH_TOKEN`) VALUES ('2', '0', '1', 'BE', 'jarry', 'test2@gmail.com', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80', 'token', 'token');

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

INSERT INTO `HYUPUP`.`USERS_PROJECTS` (`USER_ID`, `PROJECT_ID`) VALUES ('1', '1');
INSERT INTO `HYUPUP`.`USERS_PROJECTS` (`USER_ID`, `PROJECT_ID`) VALUES ('1', '2');


INSERT INTO `HYUPUP`.`EPICS` (`ID`, `PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`) VALUES ('1', '1', '첫에픽', NOW(), NOW(), 0);

INSERT INTO `HYUPUP`.`EPICS` (`ID`, `NAME`, `PROJECT_ID`,  `START_AT`, `END_AT`, `ORDER`) VALUES ('2', '두번째에픽', '2', NOW(), NOW(), 1); 


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