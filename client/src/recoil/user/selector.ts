import { DefaultValue, selector, selectorFamily } from 'recoil';
import produce from 'immer';
import userAtom from '@/recoil/user/atom';
import { PrivateTask, ProjectTask } from '@/types/task';
import { taskSortByUpdate } from '@/lib/utils/sort';

export const privateTasksSelector = selector<PrivateTask[]>({
  key: 'privateTasksSelector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.privateTasks ? user.privateTasks : [];
  },
  set: ({ set }, newValue) => {
    set(
      userAtom,
      newValue instanceof DefaultValue
        ? newValue
        : (prev) =>
            produce(prev, (draft) => {
              draft.privateTasks = [...newValue];
              return draft;
            }),
    );
  },
});

export const projectTasksSelector = selector<ProjectTask[]>({
  key: 'projectTasksSelector',
  get: ({ get }) => {
    const user = get(userAtom);
    return user.projectTasks ? user.projectTasks : [];
  },
  set: ({ set }, newValue) => {
    set(
      userAtom,
      newValue instanceof DefaultValue
        ? newValue
        : (prev) =>
            produce(prev, (draft) => {
              draft.projectTasks = [...newValue];
              return draft;
            }),
    );
  },
});

export const allTasksSelector = selector<ProjectTask[] | PrivateTask[]>({
  key: 'allTasksSelector',
  get: ({ get }) => {
    const privateTasks = get(privateTasksSelector);
    const projectTasks = get(projectTasksSelector);
    return [...privateTasks, ...projectTasks].sort((a, b) => taskSortByUpdate(a, b));
  },
});

export const privateTaskWithIdSelector = selectorFamily<PrivateTask | undefined, number>({
  key: 'privateTaskWithIdSelector',
  get:
    (id) =>
    ({ get }) => {
      const tasks = get(privateTasksSelector);
      return tasks?.find((el) => el.id === id);
    },
  set:
    (id: number) =>
    ({ set, get }, newValue) => {
      set(
        privateTasksSelector,
        newValue instanceof DefaultValue
          ? [...get(privateTasksSelector)]
          : (prev) =>
              produce(prev, (draft) => {
                const newTask = draft.find((el) => el.id === id);
                if (!newTask) return draft;
                newTask.name = newValue!.name;
                newTask.status = newValue!.status;
                return draft;
              }),
      );
    },
});
