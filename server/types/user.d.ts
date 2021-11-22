export interface ProjectType {
  id: number;
  name: string;
}

export interface PrivateTask {
  id: number;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectTask extends PrivateTask {
  project: ProjectType;
}

export interface User {
  id: number;
  name: string;
  job: string;
  email: string;
  imageURL: string;
  admin: boolean;
  organization: number;
  projects: Array<ProjectType>;
  org?: object;
}
