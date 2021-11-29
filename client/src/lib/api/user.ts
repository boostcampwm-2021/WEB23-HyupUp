import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { UserState } from '@/contexts/userContext';
import { errorMessage } from '../common/message';
import { UserProfile, UserInfoWithProject } from '@/types/users';

export interface NewUser {
  name: string;
  job: string;
  email: string;
  password: string;
  checkPassword: string;
  organization: string;
  imageURL: string;
}

const instance = axios.create({
  baseURL: process.env.SERVER_URL + '/api/users',
  withCredentials: true,
});

export const getUser = async (email: string) => {
  try {
    const result: { data: UserState } = await instance.get(`?email=${email}`);
    return result.data;
  } catch (e) {
    if ((e as AxiosError).response?.status === 401) {
      toast.error(errorMessage.UNAUTH_USER);
    } else {
      toast.error(errorMessage.GET_USER);
    }
  }
};

export const getUsersInfoWithProject = async (
  orgId: number,
): Promise<UserInfoWithProject[] | void> => {
  try {
    const result = await instance.get(`/${orgId}`);
    if (result.status % 400 < 100) throw new Error();
    return result.data;
  } catch (error) {
    toast.error(errorMessage.GET_USER);
  }
};

export const inviteUserWithProject = async (
  userId: number,
  projectId: number,
  isInvite: boolean,
) => {
  try {
    const result = await instance.patch('/project', {
      userId,
      projectId,
      isInvite,
    });
    if (result.status % 400 < 100) throw new Error();
  } catch (error) {
    toast.error(errorMessage.UPDATE_USER_PROJECT);
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
    toast.error(errorMessage.DELETE_USER);
  }
};

export const modifyUserAdminById = async (id: number | undefined, newAdmin: boolean) => {
  try {
    if (typeof id === 'undefined') throw new Error();
    await instance.put(`/admin/${id}`, { admin: newAdmin });
  } catch (e) {
    toast.error(errorMessage.UPDATE_USER);
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

export const signUp = async ({ name, job, email, password, organization, imageURL }: NewUser) => {
  try {
    const result: { data: UserState } = await instance.post('/signup', {
      name,
      job,
      email,
      password,
      organization,
      imageURL,
    });

    return result.data;
  } catch (e) {
    if ((e as AxiosError).response?.status === 406) {
      toast.error(errorMessage.CREATE_USER_EMAIL);
    } else {
      toast.error(errorMessage.CREATE_USER);
    }
  }
};

export const logOut = async () => {
  try {
    const result = await instance.delete('/logout');
    toast.info(result);
  } catch (e) {
    toast.error(errorMessage.CREATE_USER);
  }
};

export const sudoLogIn = async () => {
  try {
    const result: { data: UserState } = await instance.post('/login', {
      email: 'test1@gmail.com',
      password: 'token',
    });
    return result.data;
  } catch (e) {
    toast.error(errorMessage.GET_USER);
  }
};
