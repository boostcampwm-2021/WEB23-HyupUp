import axios from 'axios';

type StatusType = 'TODO' | 'IN_PROGRESS' | 'DONE';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/stories',
  withCredentials: true,
});

/**
 * @param storyId 스토리 id
 * @param storyName 스토리 이름
 * @param status 스토리의 상태
 * @param epicId 에픽 id
 * @returns id 를 프로퍼티로 가지는 객체, 스토리 생성 성공시 생성된 스토리의 id, 실패시 -1값 { id: number }
 */
export const createStory = async (
  storyId: number | string,
  status: StatusType,
  projectId: number,
  storyName?: string,
  epicId?: number | string,
) => {
  console.log(storyId, status, projectId, storyName, epicId);
  try {
    const result: { data: { id: number } } = await instance.post('', {
      storyId: storyId,
      status: status,
      projectId: projectId,
      storyName: storyName,
      epicId: epicId,
    });
    return result.data;
  } catch (e) {
    return { id: -1 };
  }
};
