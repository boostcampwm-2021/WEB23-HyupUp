import React from 'react';
import { createStory } from '@/lib/api/story';
import { Button } from '@/lib/design';
import { useStoryDispatch, useStoryState } from '@/lib/hooks/useContextHooks';
import { StoryType } from '@/types/story';
interface KanbanAddBtnType {
  projectId?: number;
}

const extractLastID = (array: Array<StoryType>): number => {
  if (!array?.length) return 0;
  return Math.max(...array.map((v) => v.id));
};

const KanbanAddBtn = ({ projectId }: KanbanAddBtnType) => {
  const storyList = useStoryState();
  const dispatchStory = useStoryDispatch();
  const lastStoryId = extractLastID(storyList);
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
