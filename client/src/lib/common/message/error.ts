export const GET_USER = '유저 정보 요청에 실패하였습니다.';
export const GET_EPIC = '에픽 정보 요청에 실패했습니다.';
export const GET_PROJECT = '프로젝트 정보 요청에 실패했습니다.';
export const GET_STORY = '스토리 정보 요청에 실패했습니다.';
export const GET_TASK = '테스크 정보 요청에 실패했습니다.';

export const CREATE_EPIC = '에픽 생성에 실패했습니다.';
export const CREATE_TODO = 'Todo 생성에 실패했습니다.';
export const CREATE_STORY = '스토리 생성에 실패했습니다.';
export const CREATE_PROJECT = '프로젝트 생성에 실패했습니다.';
export const CREATE_TASK = '테스크 생성에 실패했습니다.';

export const UPDATE_EPIC = '에픽 수정에 실패했습니다.';
export const UPDATE_TODO = 'Todo 항목 수정에 실패했습니다.';
export const UPDATE_TASK = 'Task 항목 수정에 실패했습니다.';
export const UPDATE_STORY = '스토리 수정에 실패했습니다.';
export const UPDATE_USER = '사용자 정보 수정에 실패했습니다.';
export const UPDATE_USER_PROJECT = '팀원의 프로젝트 정보 수정에 실패했습니다.';

export const DELETE_EPIC = '에픽 삭제에 실패했습니다.';
export const DELETE_PROJECT = '프로젝트 삭제에 실패했습니다.';
export const DELETE_TODO = 'Todo 항목 삭제에 실패했습니다.';
export const DELETE_TASK = 'Task 항목 삭제에 실패했습니다.';
export const DELETE_STORY = '스토리 삭제에 실패했습니다.';
export const DELETE_USER = '사용자 삭제에 실패했습니다.';

export const EPIC_DRAG_OUT_OF_PLACE = '드래그 앤 드랍 영역을 벗어났습니다. 다시 시도해주세요.';
export const START_DATE_IS_LATTER = '시작일이 종료일보다 뒤에 있을수 없습니다.';
export const EPIC_TITLE_LENGTH_LIMIT = '에픽 제목의 길이가 너무 깁니다. 255자 이내로 입력해주세요.';

export const SEND_EMAIL = '이메일 발송에 실패했습니다.';
export const SEND_EMAIL_SAME = '이미 존재하는 회원입니다.';
export const NULL_EMAIL = '이메일을 입력해주세요';
export const CREATE_USER = '회원가입에 실패했습니다.';
export const CREATE_USER_PW = '비밀번호가 일치하지 않습니다.';
export const UNAUTH_USER = '인증이 필요한 페이지입니다.';
export const CREATE_USER_EMAIL = '입력하신 이메일은 사용 중입니다. 다른 이메일을 사용하세요.';

export default {
  GET_USER,
  GET_EPIC,
  GET_PROJECT,
  GET_STORY,
  GET_TASK,
  CREATE_EPIC,
  CREATE_TODO,
  CREATE_STORY,
  CREATE_PROJECT,
  CREATE_USER,
  CREATE_USER_PW,
  CREATE_USER_EMAIL,
  CREATE_TASK,
  UPDATE_EPIC,
  UPDATE_TODO,
  UPDATE_TASK,
  UPDATE_STORY,
  UPDATE_USER,
  UPDATE_USER_PROJECT,
  DELETE_EPIC,
  DELETE_PROJECT,
  DELETE_TODO,
  DELETE_TASK,
  DELETE_STORY,
  DELETE_USER,
  EPIC_DRAG_OUT_OF_PLACE,
  START_DATE_IS_LATTER,
  EPIC_TITLE_LENGTH_LIMIT,
  SEND_EMAIL,
  SEND_EMAIL_SAME,
  NULL_EMAIL,
  UNAUTH_USER,
};
