import axios from 'axios';
import { UserState } from '@/contexts/userContext';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const getUser = async (email: string) => {
  try {
    const result: { data: UserState } = await instance.get(`/api/users?email=${email}`);
    // 추후 로그인된이메일 확인은 세션에서 (get요청이므로 데이터 없애야함)
    return result.data;
  } catch (e) {
    console.error('유저 정보 요청 실패');
    throw e;
  }
};
