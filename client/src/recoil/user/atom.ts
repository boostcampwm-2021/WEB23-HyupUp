import { atom } from 'recoil';
import { ProjectType } from '@/types/project';
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

const user = atom({
  key: 'userState',
  default: {} as UserState,
});

export default user;
