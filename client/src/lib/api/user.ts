import axios from 'axios';
import { UserState } from '@/contexts/userContext';

export interface UserProfile {
  name: string;
  imageURL: string;
}

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/users',
  withCredentials: true,
});

export const getUser = async (email: string) => {
  try {
    const result: { data: UserState } = await instance.get(`?email=${email}`);
    // 추후 로그인된이메일 확인은 세션에서 (get요청이므로 데이터 없애야함)
    return result.data;
  } catch (e) {
    console.error('유저 정보 요청 실패');
    throw e;
  }
};

export const getUsersByOrganization = async (id: number): Promise<Array<UserProfile>> => {
  try {
    const result: { data: Array<UserProfile> } = await instance.get(
      `/organization?organizationId=${id}`,
    );
    return result.data;
  } catch (e) {
    console.error('유저 정보 요청 실패');
    return [];
  }
};
