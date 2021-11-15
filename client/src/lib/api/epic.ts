import axios from 'axios';
import { toast } from 'react-toastify';
import { Epic } from '@/contexts/epicContext';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/epics',
  withCredentials: true,
});

export const getEpicsByProjectId = async (projectId: number | string) => {
  try {
    const result: { data: Epic[] } = await instance.get(`?projectId=${projectId}`);
    return result.data;
  } catch (e) {
    toast.error('failed to fetch epic data');
    throw e;
  }
};

/**
 *
 * @param projectId 프로젝트 id, 생성하려는 에픽이 어떤 프로젝트에 속하는지
 * @param epicName 에픽의 이름
 * @returns id 를 프로퍼티로 가지는 객체, 에픽 생성 성공시 생성된 에픽의 id, 실패시 -1값 { id: number }
 */
export const createEpic = async (projectId: number | string, epicName: string) => {
  try {
    const result: { data: { id: number } } = await instance.post('', {
      projectName: projectId,
      name: epicName,
    });
    return result.data;
  } catch (e) {
    return { id: -1 };
  }
};
