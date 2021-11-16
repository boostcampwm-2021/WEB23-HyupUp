import axios from 'axios';
import { toast } from 'react-toastify';
import { errorMessage } from '../common/message';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/todo',
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
    const result: { data: Todo } = await instance.post('', {
      name: name,
      userId: userId,
    });
    return result.data;
  } catch (e) {
    toast.error(errorMessage.CREATE_TODO);
    throw e;
  }
};

export const updateTodo = async (id: number, name: string, status: boolean) => {
  try {
    const result = await instance.patch('', {
      id,
      name,
      status,
    });
    if (result.data !== 'ok') throw Error();
  } catch (e) {
    toast.error(errorMessage.UPDATE_TODO);
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const result = await instance.delete(`?id=${id}`);
    if (result.data !== 'ok') throw Error();
  } catch (e) {
    toast.error(errorMessage.DELETE_TODO);
  }
};
