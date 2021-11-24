import { EpicType } from '@/types/epic';
import { PrivateTask, ProjectTask } from '@/types/task';

export const taskSortByUpdate = (a: PrivateTask | ProjectTask, b: PrivateTask | ProjectTask) =>
  a.updatedAt < b.updatedAt ? 1 : -1;

export const sortEpicsByOrder = (a: EpicType, b: EpicType) => a.order - b.order;
