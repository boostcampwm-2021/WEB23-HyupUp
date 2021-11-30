export interface AllTask {
  id: number;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  projectId?: number;
}

export interface BackLogTaskProps {
  id: number;
  name: string;
  user: string;
  userImage: string;
  userId?: number;
}
