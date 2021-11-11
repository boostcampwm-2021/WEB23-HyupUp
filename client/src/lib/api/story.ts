import axios from 'axios';

type StatusType = 'todo' | 'progress' | 'done';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/storys',
  withCredentials: true,
});

/**
 *
 * @param storyId 스토리 id
 * @param storyName 스토리 이름
 * @param status 스토리의 상태
 * @param epicId 에픽 id
 * @returns id 를 프로퍼티로 가지는 객체, 스토리 생성 성공시 생성된 스토리의 id, 실패시 -1값 { id: number }
 */
export const createStory = async (
  storyId: number | string,
  status: StatusType,
  storyName?: string,
  epicId?: number | string,
) => {
  try {
    const result: { data: { id: number } } = await instance.post('', {
      storyId: storyId,
      storyName: storyName,
      status: status,
      epicId: epicId,
    });
    return result.data;
  } catch (e) {
    return { id: -1 };
  }
};
