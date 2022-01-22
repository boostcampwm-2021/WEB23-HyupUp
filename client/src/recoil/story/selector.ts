import { DefaultValue, selectorFamily } from 'recoil';
import produce from 'immer';
import storyListAtom from './atom';
import { StoryType } from '@/types/story';
import { getTasksByStoryId } from '@/lib/api/task';

export const storyState = selectorFamily<StoryType | undefined, number>({
  key: 'storyWithIdSelector',
  get:
    (id) =>
    ({ get }) => {
      const storyList = get(storyListAtom);
      return storyList?.find((story) => story.id === id);
    },
  set:
    (id: number) =>
    ({ set, get }, newValue) => {
      set(
        storyListAtom,
        newValue instanceof DefaultValue
          ? get(storyListAtom)
          : (prev) =>
              produce(prev, (draft) => {
                const newStoryIdx = draft?.findIndex((story) => story.id === id);
                if (newStoryIdx === -1 || !newValue) return;
                draft[newStoryIdx] = newValue;
              }),
      );
    },
});

export const tasksSelector = selectorFamily({
  key: 'tasksSelector',
  get: (storyId: number) => async () => {
    const taskList = await getTasksByStoryId(storyId);
    return taskList?.length ? taskList : [];
  },
});
