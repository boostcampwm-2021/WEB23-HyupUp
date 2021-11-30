import { DefaultValue, selector } from 'recoil';
import produce from 'immer';
import userAtom from '@/recoil/user';
import { AllTask } from '@/types/task';

export const privateTasksSelector = selector<AllTask[]>({
  key: 'privateTasksSelector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.allTasks ? user.allTasks.filter((task) => !task.projectId) : [];
  },
});

export const projectTasksSelector = selector<AllTask[]>({
  key: 'projectTasksSelector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.allTasks ? user.allTasks.filter((task) => task.projectId) : [];
  },
});

export const allTasksSelector = selector<AllTask[]>({
  key: 'allTasksSelector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.allTasks ? user.allTasks : [];
  },
  set: ({ set }, newValue) => {
    set(
      userAtom,
      newValue instanceof DefaultValue
        ? newValue
        : (prev) =>
            produce(prev, (draft) => {
              draft.allTasks = [...newValue];
            }),
    );
  },
});
