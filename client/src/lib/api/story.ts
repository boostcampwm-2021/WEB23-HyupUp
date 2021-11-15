import axios from 'axios';
import { toast } from 'react-toastify';
import { StoryType, StatusType } from '@/types/story';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/stories',
  withCredentials: true,
});

export const getAllStories = async (projectId: number | string) => {
  try {
    const result: { data: StoryType[] } = await instance.get(`?projectId=${projectId}`);
    return result.data;
  } catch (e) {
    toast.error('스토리 조회에 실패하였습니다');
    throw e;
  }
};

/**
 * @param storyId 스토리 id
 * @param status 스토리의 상태
 * @param projectId 프로젝트 id
 * @param storyName 스토리 이름
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
