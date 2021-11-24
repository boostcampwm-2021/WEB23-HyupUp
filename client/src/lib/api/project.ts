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

export const getAllProjectsByUser = async (userId: number, organizationId: number) => {
  try {
    const result = await instance.get(`/?userId=${userId}&organizationId=${organizationId}`);
    if (result.status % 400 < 100) throw new Error();
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_PROJECT);
  }
};

export const createProject = async (name: string, userId: number) => {
  try {
    const newProject: { data: Project; status: number } = await instance.post('/', {
      name,
      userId,
    });
    if (newProject.status % 400 < 100) throw new Error();
    return newProject.data;
  } catch (error) {
    toast.error(errorMessage.CREATE_PROJECT);
  }
};

export const getAllProjectsByOrg = async (orgId: number) => {
  try {
    const projects: { data: Project[]; status: number } = await instance.get(`/${orgId}`);
    if (projects.status % 400 < 100) throw new Error();
    return projects.data;
  } catch (error) {
    toast.error(errorMessage.GET_PROJECT);
  }
};

export const deleteProjectById = async (projectId: number): Promise<string | void> => {
  try {
    const result = await instance.delete(`/${projectId}`);
    if (result.status % 400 < 100) throw new Error();
    return result.statusText;
  } catch (error) {
    toast.error(errorMessage.DELETE_PROJECT);
  }
};
