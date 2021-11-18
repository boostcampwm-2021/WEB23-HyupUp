import React, { useState, useEffect } from 'react';
import { createStory } from '@/lib/api/story';
import { Button } from '@/lib/design';
import { useStoryDispatch, useStoryState, useUserState } from '@/lib/hooks/useContextHooks';
import { StoryType } from '@/types/story';

const extractLastID = (array: Array<StoryType>): number => {
  if (!array?.length) return 0;
  return Math.max(...array.map((v) => v.id));
};

const KanbanAddBtn = () => {
  const userState = useUserState();
  const storyList = useStoryState();
  const dispatchStory = useStoryDispatch();
  const lastStoryId = extractLastID(storyList);
  const todoList = storyList.filter((item) => item.status === 'TODO');
  const [isInitial, setIsInitial] = useState(true);
  const initialItem = {
    id: lastStoryId + 1,
    name: '',
    status: 'TODO',
    order: 1,
  };

  useEffect(() => {
    if (isInitial && todoList.length > 1) {
      if (todoList.length === 2) {
        dispatchStory({ type: 'UPDATE_STORY', story: { ...todoList[0], order: 0 } });
      } else {
        dispatchStory({
          type: 'UPDATE_STORY',
          story: {
            ...todoList[todoList.length - 2],
            order: (todoList[todoList.length - 3]?.order + 1) / 2,
          },
        });
      }
      setIsInitial((prev) => !prev);
    }
  }, [todoList, dispatchStory, isInitial]);

  const addStory = () => {
    dispatchStory({ type: 'ADD_STORY', story: initialItem });
    createStory({ ...initialItem, projectId: userState.currentProjectId });
    setIsInitial((prev) => !prev);
  };

  return (
    <Button size={'large'} category={'cancel'} onClick={addStory}>
      Add Todo
    </Button>
  );
};

export default KanbanAddBtn;
