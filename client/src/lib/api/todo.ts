import axios from 'axios';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

interface Todo {
  id: number;
  status: boolean;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const createTodo = async (name: string, userId: number) => {
  try {
    const result: { data: Todo } = await instance.post('/api/todo', {
      name: name,
      userId: userId,
    });
    return result.data;
  } catch (e) {
    toast.error('TODO 생성 실패');
    throw e;
  }
};
