import axios from 'axios';
import { toast } from 'react-toastify';
import { errorMessage } from '@/lib/common/message';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/organizations',
  withCredentials: true,
});

export const searchOrganizationByName = async (name: string) => {
  try {
    const result = await instance.get(`?name=${name}`);
    return result.status;
  } catch {
    toast.error(errorMessage.GET_USER);
  }
};
