import axios from 'axios';
import { toast } from 'react-toastify';
import { errorMessage } from '../common/message';

const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

interface Project {
  name: string;
  id: number;
}
// TODO: 현재 쓰이지 않는 함수
export const getAllProjects = async (userId: number, organizationId: number) => {
  try {
    const result: { data: Array<Project> } = await instance.get(
      `/api/projects/?userId=${userId}&organizationId=${organizationId}`,
    );
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_PROJECT);
    throw e;
  }
};
