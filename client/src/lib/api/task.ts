import axios from 'axios';
import { toast } from 'react-toastify';

export interface TaskProps {
  id: number;
  name: string;
  user: string;
  userImage: string;
}

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/tasks',
  withCredentials: true,
});

export const getTasksByStoryId = async (storyId: number) => {
  try {
    const result: { data: Array<TaskProps> } = await instance.get(`/${storyId}`);
    return result.data;
  } catch (e) {
    toast.error('task를 가져오는데 실패했습니다.');
    throw e;
  }
};
