export type StatusType = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type StoryType = {
  name: string;
  status: StoryStatusType;
  id?: number;
  order?: number;
  projectId?: number;
  epicId?: number;
};
