import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import { postStory, getStoryById } from '@/lib/api/story';
import { Button } from '@/lib/design';
import { useRecoilState } from 'recoil';
import storyListAtom from '@/recoil/story/atom';
import { StoryType } from '@/types/story';
import { useSocketSend } from '@/lib/hooks';

const initialItem = {
  order: 0,
  name: '',
  status: 'TODO',
  projectId: null,
  epicId: null,
};

const KanbanAddBtn = () => {
  const [recoilStoryList, setStoryList] = useRecoilState(storyListAtom);
  const userState = useRecoilValue(userAtom);
  const emitNewStory = useSocketSend('NEW_STORY');
  const orderList = recoilStoryList
    .filter((item) => item.status === 'TODO')
    .map((v) => Number(v.order));
  const listLargestOrder = orderList.length ? Math.max(...orderList) + 1 : 0;

  const addStory = async () => {
    const id = await postStory({
      ...initialItem,
      order: listLargestOrder,
      projectId: userState.currentProjectId,
    });
    const storyItem = await getStoryById(id);
    setStoryList((prev) => [...prev, storyItem as StoryType]);
    emitNewStory(id);
  };

  return (
    <Button size={'large'} category={'cancel'} onClick={addStory}>
      Add Todo
    </Button>
  );
};

export default KanbanAddBtn;
