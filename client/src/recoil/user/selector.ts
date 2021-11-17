import { selector, selectorFamily } from 'recoil';
import userState from '@/recoil/user/atom';
import { PrivateTask } from '@/types/task';

export const privateTasksSelector = selector({
  key: 'privateTasks',
  get: ({ get }) => {
    const user = get(userState);
    return user.privateTasks ? user.privateTasks : [];
  },
});

export const privateTaskWithIdSelector = selectorFamily({
  key: 'privateTask',
  get:
    (id) =>
    ({ get }) => {
      const tasks = get(privateTasksSelector);
      return tasks?.find((el) => el.id === id);
    },
});

export const projectTasksSelector = selector({
  key: 'projectTasks',
  get: ({ get }) => {
    const user = get(userState);
    return user.projectTasks ? user.projectTasks : [];
  },
});
