import React, { useState } from 'react';
import { createStory, updateStoryWithId } from '@/lib/api/story';
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
  //Todo 수정해야함
  const initialItem = {
    id: lastStoryId + 1,
    name: '',
    status: 'TODO',
    order: 1,
    projectId: 1,
    epicId: 1,
  };

  const addStory = async () => {
    const lastTodo = todoList?.length > 0 ? todoList[todoList.length - 1] : initialItem;
    const beforeLastTodo = todoList?.length > 1 ? todoList[todoList.length - 2] : initialItem;
    switch (todoList.length) {
      case 0:
        break;
      case 1:
        dispatchStory({ type: 'UPDATE_STORY', story: { ...lastTodo, order: 0 } });
        updateStoryWithId({ ...lastTodo, order: 0 });
        break;
      default:
        dispatchStory({
          type: 'UPDATE_STORY',
          story: { ...lastTodo, order: (1 + Number(beforeLastTodo.order)) / 2 },
        });
        updateStoryWithId({ ...lastTodo, order: (1 + Number(beforeLastTodo.order)) / 2 });
    }
    dispatchStory({ type: 'ADD_STORY', story: initialItem });
    createStory({ ...initialItem, projectId: userState.currentProjectId });
  };

  return (
    <Button size={'large'} category={'cancel'} onClick={addStory}>
      Add Todo
    </Button>
  );
};

export default KanbanAddBtn;
