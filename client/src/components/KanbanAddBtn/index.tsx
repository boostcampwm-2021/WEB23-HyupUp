import React from 'react';
import { postStory } from '@/lib/api/story';
import { Button } from '@/lib/design';
import { useStoryDispatch, useStoryState, useUserState } from '@/lib/hooks/useContextHooks';
import { StoryType } from '@/types/story';

//TODO projectID, epicId 주입 예정
const initialItem = {
  id: 0,
  order: 0,
  name: '',
  status: 'TODO',
  projectId: 1,
  epicId: 1,
};

const KanbanAddBtn = () => {
  const userState = useUserState();
  const storyList = useStoryState();
  const dispatchStory = useStoryDispatch();
  const listLargestOrder = storyList
    .filter((item) => item.status === 'TODO')
    .map((v) => Number(v.order))
    .find((v) => v === Math.max(v));

  const addStory = async () => {
    const newStoryItem = await postStory({
      ...initialItem,
      order: storyList.length > 0 ? listLargestOrder : 0,
      projectId: userState.currentProjectId,
    });
    dispatchStory({ type: 'ADD_STORY', story: newStoryItem as StoryType });
  };

  return (
    <Button size={'large'} category={'cancel'} onClick={addStory}>
      Add Todo
    </Button>
  );
};

export default KanbanAddBtn;
