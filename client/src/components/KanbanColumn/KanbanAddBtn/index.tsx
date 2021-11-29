import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import { postStory, getStoryByid } from '@/lib/api/story';
import { Button } from '@/lib/design';
import { useRecoilState } from 'recoil';
import storyListAtom from '@/recoil/story/atom';
import { StoryType } from '@/types/story';

const initialItem = {
  order: 0,
  name: '',
  status: 'TODO',
  projectId: undefined,
  epicId: null,
};

const KanbanAddBtn = () => {
  const userState = useRecoilValue(userAtom);
  const [recoilStoryList, setStoryList] = useRecoilState(storyListAtom);

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
    const storyItem = await getStoryByid(id);
    setStoryList((prev) => [...prev, storyItem as StoryType]);
  };

  return (
    <Button size={'large'} category={'cancel'} onClick={addStory}>
      Add Todo
    </Button>
  );
};

export default KanbanAddBtn;
