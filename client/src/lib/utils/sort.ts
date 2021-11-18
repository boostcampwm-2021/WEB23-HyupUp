import { PrivateTask, ProjectTask } from '@/types/task';

export const taskSortByUpdate = (a: PrivateTask | ProjectTask, b: PrivateTask | ProjectTask) =>
  a.updatedAt < b.updatedAt ? 1 : -1;
