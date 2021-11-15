export interface PrivateTask {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTask extends PrivateTask {
  project: ProjectType;
}
