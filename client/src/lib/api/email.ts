import axios, { AxiosError } from 'axios';
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
    if ((e as AxiosError).response?.status === 409) {
      toast.error(errorMessage.SEND_EMAIL_SAME);
    } else {
      toast.error(errorMessage.SEND_EMAIL);
    }
  }
};
