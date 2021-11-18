export interface PrivateTask {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectTask extends PrivateTask {
  project?: ProjectType;
}

export interface BackLogTaskProps {
  id: number;
  name: string;
  user: string;
  userImage: string;
}
