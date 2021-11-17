import React from 'react';
import { createStory } from '@/lib/api/story';
import { Button } from '@/lib/design';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';

type KanbanAddBtnType = {
  lastStoryId: number;
  projectId?: number;
};

const KanbanAddBtn = ({ lastStoryId, projectId }: KanbanAddBtnType) => {
  const dispatchStory = useStoryDispatch();
  const initStoryData = { id: lastStoryId + 1, name: '', status: 'TODO' };

  const addStory = () => {
    dispatchStory({ type: 'ADD_STORY', story: initStoryData });
    createStory({ ...initStoryData, projectId });
  };

  return (
    <Button size={'large'} category={'cancel'} onClick={addStory}>
      Add Todo
    </Button>
  );
};

export default KanbanAddBtn;
