import { atom } from 'recoil';
import { ProjectType } from '@/types/project';
import { UserInfoWithProject } from '@/types/users';
import { AllTask } from '@/types/task';

export type UserState = {
  id?: number;
  name?: string;
  job?: string;
  email?: string;
  imageURL?: string;
  admin?: boolean;
  organization?: number;
  currentProjectName?: string;
  currentProjectId?: number;
  projects?: Array<ProjectType>;
  allTasks?: Array<AllTask>;
  taskOffset?: number;
};

const userAtom = atom<UserState>({
  key: 'userAtom',
  default: { taskOffset: 0 },
});

const userListAtom = atom<UserInfoWithProject[]>({
  key: 'userListAtome',
  default: [],
});

export { userAtom, userListAtom };
