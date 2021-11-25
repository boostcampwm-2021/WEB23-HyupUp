import { atom } from 'recoil';
import { ProjectType } from '@/types/project';
import { UserInfoWithProject } from '@/types/users';
import { PrivateTask, ProjectTask } from '@/types/task';

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
  privateTasks?: Array<PrivateTask>;
  projectTasks?: Array<ProjectTask>;
};

const userAtom = atom<UserState>({
  key: 'userAtom',
  default: {},
});

const userListAtom = atom<UserInfoWithProject[]>({
  key: 'userListAtome',
  default: [],
});

export { userAtom, userListAtom };
