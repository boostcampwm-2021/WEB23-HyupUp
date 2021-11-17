import axios from 'axios';
import { toast } from 'react-toastify';
import { setupCache } from 'axios-cache-adapter';
import { errorMessage } from '@/lib/common/message';
import { BackLogTaskProps } from '@/types/task';

const cache = setupCache({
  maxAge: 10 * 1000,
});

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/tasks',
  withCredentials: true,
  adapter: cache.adapter,
});

export const getTasksByStoryId = async (storyId: number) => {
  try {
    const result: { data: Array<BackLogTaskProps> } = await instance.get(`/${storyId}`);
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_TASK);
  }
};

export const updateTask = async (id: number, name: string, status: boolean) => {
  try {
    const result = await instance.patch('', {
      id,
      name,
      status,
    });
    if (result.status >= 400) throw Error();
  } catch (e) {
    toast.error(errorMessage.UPDATE_TASK);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const result = await instance.delete(`?id=${id}`);
    if (result.status >= 400) throw Error();
  } catch (e) {
    toast.error(errorMessage.DELETE_TASK);
  }
};
