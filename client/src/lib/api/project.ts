import axios from 'axios';
import { toast } from 'react-toastify';
import { errorMessage } from '../common/message';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/projects',
  withCredentials: true,
});

interface Project {
  name: string;
  id: number;
}

export const getAllProjects = async (userId: number, organizationId: number) => {
  try {
    const result = await instance.get(`/?userId=${userId}&organizationId=${organizationId}`);
    if (result.status >= 400) throw Error();
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_PROJECT);
  }
};

export const createProject = async (name: string, userId: number) => {
  try {
    const newProject = await instance.post('/', { name, userId });
    if (newProject.status >= 400) throw Error();
    return newProject.data;
  } catch (error) {
    toast.error(errorMessage.CREATE_PROJECT);
  }
};
