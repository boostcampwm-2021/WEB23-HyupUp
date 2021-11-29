import { DefaultValue, selector, selectorFamily } from 'recoil';
import produce from 'immer';
import storyListAtom from './atom';
import { StoryListType, StoryType } from '@/types/story';

export const storyListSelector = selector<StoryListType | undefined>({
  key: 'storyListSelector',
  get: ({ get }) => {
    const storyList = get(storyListAtom);
    return storyList ? storyList : [];
  },
  set: ({ set }, newValue) => {
    set(
      storyListAtom,
      newValue instanceof DefaultValue
        ? newValue
        : (prev) =>
            produce(prev, (draft) => {
              if (!newValue || !draft) return;
              draft.concat(newValue);
            }),
    );
  },
});

export const storySelector = selectorFamily<StoryType | undefined, number>({
  key: 'storyWithIdSelector',
  get: (id) => ({ get }) => {
    const storyList = get(storyListSelector);
    return storyList?.find((story) => story.id === id);
  },
  set: (id: number) => ({ set, get }, newValue) => {
    set(
      storyListSelector,
      newValue instanceof DefaultValue
        ? get(storyListSelector)
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
