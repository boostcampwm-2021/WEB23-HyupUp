import React from 'react';
import { postStory, getStoryByid } from '@/lib/api/story';
import { Button } from '@/lib/design';
import { useStoryDispatch, useStoryState, useUserState } from '@/lib/hooks/useContextHooks';
import { StoryType } from '@/types/story';

//TODO projectID, epicId 주입 예정
const initialItem = {
  order: 0,
  name: '',
  status: 'TODO',
  projectId: 1,
  epicId: 1,
};

const KanbanAddBtn = () => {
  const storyList = useStoryState();
  const dispatchStory = useStoryDispatch();
  const orderList = storyList.filter((item) => item.status === 'TODO').map((v) => Number(v.order));
  const listLargestOrder = orderList.length ? Math.max(...orderList) + 1 : 0;

  const addStory = async () => {
    const id = await postStory({ ...initialItem, order: listLargestOrder });
    const storyItem = await getStoryByid(id);
    //TODO ProjectId, EpicId 를 Dispatch 함수에 작성해야함
    dispatchStory({ type: 'ADD_STORY', story: storyItem as StoryType });
  };

  return (
    <Button size={'large'} category={'cancel'} onClick={addStory}>
      Add Todo
    </Button>
  );
};

export default KanbanAddBtn;
