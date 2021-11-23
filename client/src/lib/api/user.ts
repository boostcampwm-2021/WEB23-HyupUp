import axios from 'axios';
import { toast } from 'react-toastify';
import { UserState } from '@/contexts/userContext';
import { errorMessage } from '../common/message';

export interface UserProfile {
  index: number;
  name: string;
  imageURL: string;
  job: string;
  admin: boolean;
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
    toast.error(errorMessage.GET_USER);
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
    toast.error(errorMessage.GET_USER);
    return [];
  }
};

export const deleteUserById = async (id: number | undefined) => {
  try {
    if (typeof id === 'undefined') throw new Error();
    const res = await instance.delete(`/${id}`);
    if (res.status % 400 < 100) throw new Error();
  } catch (e) {
    toast.error(errorMessage.GET_USER);
  }
};

export const modifyUserAdminById = async (id: number | undefined, newAdmin: boolean) => {
  try {
    if (typeof id === 'undefined') throw new Error();
    await instance.put(`/admin/${id}`, { admin: newAdmin });
  } catch (e) {
    toast.error(errorMessage.GET_USER);
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const result: { data: UserState } = await instance.post('/login', {
      email,
      password,
    });
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_USER);
  }
};

export const signUp = async (
  name: string,
  job: string,
  email: string,
  password: string,
  organization: string,
) => {
  try {
    const result: { data: UserState } = await instance.post('/signup', {
      name,
      job,
      email,
      password,
      organization,
    });
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_USER);
  }
};
