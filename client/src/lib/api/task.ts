import axios from 'axios';
import { toast } from 'react-toastify';
import { errorMessage } from '@/lib/common/message';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/tasks',
  withCredentials: true,
});

export const updateTask = async (id: number, name: string, status: boolean) => {
  try {
    const result = await instance.patch('', {
      id,
      name,
      status,
    });
    if (result.data !== 'ok') throw Error();
  } catch (e) {
    toast.error(errorMessage.UPDATE_TASK);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const result = await instance.delete(`?id=${id}`);
    if (result.data !== 'ok') throw Error();
  } catch (e) {
    toast.error(errorMessage.DELETE_TASK);
  }
};
