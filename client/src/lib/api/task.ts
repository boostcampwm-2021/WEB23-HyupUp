import axios from 'axios';
import { toast } from 'react-toastify';
import { errorMessage } from '../common/message';

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
    toast.error(errorMessage.UPDATE_TODO);
  }
};
