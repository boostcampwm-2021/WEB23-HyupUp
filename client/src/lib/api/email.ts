import axios from 'axios';
import { toast } from 'react-toastify';
import { errorMessage, successMessage } from '../common/message';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/email',
  withCredentials: true,
});

export const sendEmail = async (organizationId: number, email: string) => {
  try {
    const result = await instance.post('', { email, organizationId });
    if (result.status === 201) toast.success(successMessage.SEND_EMAIL);
  } catch (e) {
    toast.error(errorMessage.SEND_EMAIL);
    throw e;
  }
};
