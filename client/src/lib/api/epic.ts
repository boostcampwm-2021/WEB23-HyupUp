import axios from 'axios';
import { toast } from 'react-toastify';
import { errorMessage, successMessage } from '../common/message';
import { EpicType } from '@/types/epic';

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/epics',
  withCredentials: true,
});

export const getEpicsByProjectId = async (projectId: number | string) => {
  try {
    const result: { data: EpicType[] } = await instance.get(`?projectId=${projectId}`);
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_EPIC);
  }
};

/**
 *
 * @param projectId 프로젝트 id, 생성하려는 에픽이 어떤 프로젝트에 속하는지
 * @param epicName 에픽의 이름
 * @returns id 를 프로퍼티로 가지는 객체, 에픽 생성 성공시 생성된 에픽의 id, 실패시 undefined 반환
 * 에픽 생성 실패시 toast 알림
 */
export const createEpic = async (projectId: number | string, epicName: string, order: number) => {
  try {
    const result: { data: { id: number } } = await instance.post('', {
      name: epicName,
      projectId,
      startAt: new Date(),
      endAt: new Date(),
      order,
    });
    return result.data;
  } catch (e) {
    toast.error(errorMessage.CREATE_EPIC);
  }
};

/**
 *
 * @param epicId 에픽 id, 데이터를 조회할 에픽의 id
 * @returns 에픽 데이터를 가지고 있는 객체
 */
export const getEpicById = async (epicId: number) => {
  try {
    const result: {
      code: number;
      data: EpicType;
    } = await instance.get(`/${epicId}`);
    if (result.code / 100 >= 4) throw new Error(errorMessage.GET_EPIC);
    return result.data;
  } catch (e) {
    toast.error((e as Error).message);
  }
};

/**
 *
 * @param epicId: number 에픽 id, 수정할 에픽의 id
 * @param payload: EpicType 수정할 에픽 데이터
 */
export const updateEpicById = async (epicId: number, payload: EpicType) => {
  try {
    const result: {
      code: number;
    } = await instance.patch(`/${epicId}`, payload);
    if (result.code / 100 >= 4) throw new Error(errorMessage.UPDATE_EPIC);
  } catch (e) {
    toast.error((e as Error).message);
  }
};
