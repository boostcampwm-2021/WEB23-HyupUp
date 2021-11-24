import { ProjectType } from '@/types/project';

export interface UserProfile {
  index: number;
  name: string;
  imageURL: string;
  job: string;
  admin: boolean;
}

export interface UserInfoWithProject extends UserProfile {
  projects: ProjectType[];
}
