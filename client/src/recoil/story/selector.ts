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
                const newStory = draft?.find((story) => story.id === id);
                if (!newStory || !newValue) return;
                newStory.name = newValue.name;
                newStory.id = newValue.id;
                newStory.order = newValue.order;
                newStory.status = newValue.status;
                newStory.epicId = newValue.epicId;
                newStory.projectId = newValue.projectId;
              }),
      );
    },
});

export const tasksSelector = selectorFamily({
  key: 'tasksSelector',
  get: (storyId: number) => async () => {
    const taskList = await getTasksByStoryId(storyId);
    if (taskList?.length) return taskList;
    return [];
  },
});
