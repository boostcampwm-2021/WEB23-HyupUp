import axios from 'axios';
import { Epic } from '@/contexts/epicContext';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/epics',
  withCredentials: true,
});

export const getEpicsByProjectname = async (projectName: string) => {
  try {
    const result: { data: Epic[] } = await instance.get(`?projectName=${projectName}`);
    return result.data;
  } catch (e) {
    console.error('failed to fetch epic data');
    throw e;
  }
};

export const createEpic = async (projectId: number | string, epicName: string) => {
  try {
    const result: { data: { id: number } } = await instance.post('', {
      projectName: projectId,
      name: epicName,
    });
    return result.data;
  } catch (e) {
    console.error('failed to create epic item');
    throw e;
  }
};
