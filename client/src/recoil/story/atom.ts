import { atom } from 'recoil';
import { StoryListType } from '@/types/story';

const storyListAtom = atom<StoryListType>({
  key: 'storyListAtom',
  default: [],
});

export default storyListAtom;
