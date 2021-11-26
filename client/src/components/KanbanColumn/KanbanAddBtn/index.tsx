import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import { postStory, getStoryByid } from '@/lib/api/story';
import { Button } from '@/lib/design';
import { useStoryDispatch, useStoryState } from '@/lib/hooks/useContextHooks';
import { StoryType } from '@/types/story';

//TODO projectID, epicId 주입 예정
const initialItem = {
  order: 0,
  name: '',
  status: 'TODO',
  projectId: null,
  epicId: null,
};

const KanbanAddBtn = () => {
  const storyList = useStoryState();
  const dispatchStory = useStoryDispatch();
  const userState = useRecoilValue(userAtom);
  const orderList = storyList.filter((item) => item.status === 'TODO').map((v) => Number(v.order));
  const listLargestOrder = orderList.length ? Math.max(...orderList) + 1 : 0;

  const addStory = async () => {
    const id = await postStory({
      ...initialItem,
      order: listLargestOrder,
      projectId: userState.currentProjectId,
    });
    const storyItem = await getStoryByid(id);
    dispatchStory({ type: 'ADD_STORY', story: storyItem as StoryType });
  };

  return (
    <Button size={'large'} category={'cancel'} onClick={addStory}>
      Add Todo
    </Button>
  );
};

export default KanbanAddBtn;
