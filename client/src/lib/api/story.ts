import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { StoryType } from '@/types/story';
import { errorMessage, warningMessage } from '../common/message';

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

export const getStoryById = async (storyId: number | string) => {
  try {
    const result: { data: StoryType } = await instance.get(`/${storyId}`);
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_STORY);
  }
};

export const postStory = async ({ status, name, order, projectId, epicId }: StoryType) => {
  try {
    const result = await instance.post('', {
      status,
      name,
      order,
      projectId,
      epicId,
    });
    return result.data.id;
  } catch (e) {
    if ((e as AxiosError).response?.status === 401) {
      toast.warn(warningMessage.CREATE_STORY_WITHOUT_AUTH);
    } else {
      toast.error(errorMessage.CREATE_STORY);
    }
  }
};

export const updateStoryWithName = async ({
  id,
  status,
  name,
  order,
  projectId,
  epicId,
}: StoryType) => {
  if (name === '') return;
  try {
    const result: { data: { id: number } } = await instance.patch(`/name/${id}`, {
      id,
      status,
      name,
      order,
      projectId,
      epicId,
    });
    return result.data;
  } catch (e) {
    toast.error(errorMessage.UPDATE_STORY);
  }
};

export const updateStoryWithId = async ({
  id,
  status,
  name,
  order,
  projectId,
  epicId,
}: StoryType) => {
  try {
    const result: { data: { id: number } } = await instance.patch(`/order/${id}`, {
      status,
      name,
      order,
      projectId,
      epicId,
    });
    return result.data;
  } catch (e) {
    toast.error(errorMessage.UPDATE_STORY);
  }
};

export const deleteStoryWithId = async (id: number) => {
  try {
    await instance.delete(`?storyId=${id}`);
  } catch (e) {
    toast.error(errorMessage.DELETE_STORY);
  }
};
