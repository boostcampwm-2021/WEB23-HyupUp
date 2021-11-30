USE HYUPUP;


-- EPICS
INSERT INTO `HYUPUP`.`EPICS` (`ID`, `PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`)
VALUES (7, '1', '칸반보드 구현', '2021-11-29', '2021-12-3', 7);
INSERT INTO `HYUPUP`.`EPICS` (`ID`, `PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`)
VALUES (8, '1', '백로그 구현', '2021-11-30', '2021-12-3', 8);
INSERT INTO `HYUPUP`.`EPICS` (`ID`, `PROJECT_ID`, `NAME`, `START_AT`, `END_AT`, `ORDER`)
VALUES (9, '1', '즐겨찾기 페이지 구현', '2021-12-1', '2021-12-3', 9);

-- STORIES
INSERT INTO `HYUPUP`.`STORIES` (`ID`, `PROJECT_ID`, `EPIC_ID`, `NAME`, `STATUS`, `ORDER`)
VALUES (7, '1', 7, '사이드바의 칸반보드 클릭 시 칸반보드 페이지가 표시된다.', '1', 7);
INSERT INTO `HYUPUP`.`STORIES` (`ID`, `PROJECT_ID`, `EPIC_ID`, `NAME`, `STATUS`, `ORDER`)
VALUES (8, '1', 7, '칸반 보드의 아이템을 클릭하면 모달창이 뜬다.', '1', 8);
INSERT INTO `HYUPUP`.`STORIES` (`ID`, `PROJECT_ID`, `EPIC_ID`, `NAME`, `STATUS`, `ORDER`)
VALUES (9, '1', 8, '사이드바의 백로그를 클릭하면 백로그 페이지가 보인다.', '1', 9);
INSERT INTO `HYUPUP`.`STORIES` (`ID`, `PROJECT_ID`, `EPIC_ID`, `NAME`, `STATUS`, `ORDER`)
VALUES (15, '1', 9, '사이드바의 즐겨찾기를 클릭하면 즐겨찾기 페이지가 표시된다.', '1', 10);

-- TASKS
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 7, '사이드바의 칸반보드 글자가 활성화 된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 7, 'todo, in progress, done 영역이 표시된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 7, 'to do 탭에서 새로운 이슈를 이름만 작성하여 생성할 수 있다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 7, 'to do, in pregress, done 탭에서 기존의 스토리들을 볼 수 있다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 7, '칸반 아이템의 우상단의 삭제 버튼을 클릭하면 삭제 확인 모달이 표시된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 7, '삭제 확인 모달의 '예'버튼 클릭시 해당 칸반아이템이 삭제되고, 아니오 클릭 시 모달이 닫힌다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 7, '칸반 아이템을 드래그 앤 드랍으로 다른 탭으로 이동 시킬 수 있다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 7, '칸반 아이템 이동 시 세 탭 중 가장 긴 높이를 가진 탭에 따라 높이가 변경된다.', '0', 1);

INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 8, '칸반 아이템 클릭시 칸반 제목과 함께 설정 모달이 표시된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 8, 'x 버튼을 클릭하거나, 모달 이외의 영역 클릭 시 모달이 닫힌다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 8, '설정 모달에는 api 요청을 통해 받아온 담당자와 태스크들이 표시된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 8, '만들어 두었던 에픽을 할당할 수 있는 드롭다운이 표시된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 8, '태스크 추가 버튼으로 태스크 명을 입력하여 추가할 수 있다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 8, '각 태스크에서 담당자 드롭다운을 통해 프로젝트 구성원을 선택할 수 있다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 8, '구성원 선택시에 해당 구성원들의 할 일 리스트 뷰가 업데이트 된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 8, '담당자와 태스크들이 표시될 때 캐싱을 적용한다', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 8, '담당자와 태스크들이 표시될 때 Skeleton UI 를 적용한다', '0', 1);

INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 9, '스토리 아이템들이 백로그에 표시된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 9, '각 스토리의 토글을 클릭하면 api 요청을 통해 담당자와 태스크들이 아래의 아이템을 밀어내며 펼쳐진다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 9, '담당자와 태스크들이 표시될 때 캐싱을 적용한다', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 9, '테스크들이 표시될 때 Skeleton UI를 적용한다.', '0', 1);

INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 15, '저장해두었던 바로가기 페이지들을 api 를 통해 불러와 표시한다', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 15, '추가버튼을 클릭하여 링크를 입력하여 바로가기 페이지를 추가한다', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 15, '삭제 버튼 클릭 시 삭제 모달이 표시된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 15, '모달에서 '예'버튼 클릭시 해당 바로가기는 삭제된다.', '0', 1);
INSERT INTO `HYUPUP`.`TASKS` (`PROJECT_ID`, `STORY_ID`, `NAME`, `STATUS`, `USER_ID`)
VALUES ('1', 15, '즐겨찾기 페이지 썸네일과 제목 및 설명이 표시된다.', '0', 1);