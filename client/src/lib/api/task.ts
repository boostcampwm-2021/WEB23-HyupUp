import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import { toast } from 'react-toastify';
import { errorMessage } from '../common/message';

export interface TaskProps {
  id: number;
  name: string;
  user: string;
  userImage: string;
}

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
    const result: { data: Array<TaskProps> } = await instance.get(`/${storyId}`);
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_TASK);
    throw e;
  }
};
