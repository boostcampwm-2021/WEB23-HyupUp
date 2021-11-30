import { toast } from 'react-toastify';

export function getBytes(input: string) {
  return input
    .split('')
    .map((_, i) => (input.charCodeAt(i) >> 11 ? 3 : input.charCodeAt(i) >> 7 ? 2 : 1))
    .reduce((a, b) => a + b, 0);
}

/**
 * 객체 value의 값을 측정하여 input이 limit을 넘으면, false, 모든 value가 넘지 않으면 true 반환
 * @param object { [index: string]: string }의 객체로, values들은 API의 입력으로 들어가는 값들
 * @param limit 허용하는 byte의 최댓값
 * @returns
 */
export function checkObjectInput(object: { [index: string]: string }, limit = 255) {
  try {
    Object.values(object).forEach((el) => {
      if (getBytes(el) > limit) {
        throw Error(el);
      }
    });
  } catch (e) {
    toast.error(
      `${Object.keys(object).find((key) => object[key] === (e as Error).message)}가 너무 깁니다.`,
    );
    return false;
  }
  return true;
}

/**
 * 객체의 값들 중 빈 문자열이 있으면 false, 아니면 true를 반환하는 함수
 * @param object { [index: string]: string }의 객체로, values들은 API의 입력으로 들어가는 값들
 * @returns boolean
 */
export function checkObjectInputNull(object: { [index: string]: string }) {
  try {
    Object.values(object).forEach((el) => {
      if (el.length === 0) {
        throw Error(el);
      }
    });
  } catch (e) {
    toast.error(
      `${Object.keys(object).find(
        (key) => object[key] === (e as Error).message,
      )}의 입력이 없습니다.`,
    );
    return false;
  }
  return true;
}

/**
 * input string이 limit보다 크면 false, 작거나 같으면 true 반환
 * @param input 검사하고 싶은 string input
 * @param limit string input의 크기 제한 default 255 byte
 * @returns boolean
 */
export const checkStringInput = (input: string, limit = 255) =>
  getBytes(input) > limit ? false : true;
