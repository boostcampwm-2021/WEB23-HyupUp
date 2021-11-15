export type StatusType = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type StoryType = {
  id: number;
  name: string;
  status: StoryStatusType;
  epicName?: string;
  epicId?: number;
};
