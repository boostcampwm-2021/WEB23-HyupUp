import axios from 'axios';
import { toast } from 'react-toastify';
import { StoryType } from '@/types/story';
import { errorMessage } from '../common/message';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/stories',
  withCredentials: true,
});

export const getAllStories = async (projectId: number | string) => {
  try {
    const result: { data: StoryType[] } = await instance.get(`?projectId=${projectId}`);
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_STORY);
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
export const createStory = async ({
  id,
  status,
  name,
  order,
  projectId = 1,
  epicId = 1,
}: StoryType) => {
  try {
    const result: { data: { id: number } } = await instance.post('', {
      id,
      status,
      name,
      order,
      projectId,
      epicId,
    });
    return result.data;
  } catch (e) {
    toast.error(errorMessage.CREATE_STORY);
  }
};

export const updateStoryWithName = async ({ id, status, name, projectId, epicId }: StoryType) => {
  if (name === '') return;
  try {
    const result: { data: { id: number } } = await instance.patch('/name', {
      id,
      status,
      name,
      projectId,
      epicId,
    });
    return result.data;
  } catch (e) {
    toast.error(errorMessage.UPDATE_STORY);
  }
};

export const deleteStoryWitId = async (id: number) => {
  try {
    await instance.delete(`?storyId=${id}`);
  } catch (e) {
    toast.error(errorMessage.DELETE_STORY);
  }
};
