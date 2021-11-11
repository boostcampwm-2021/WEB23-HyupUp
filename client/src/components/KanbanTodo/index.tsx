import React from 'react';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';
import useInput from '@/lib/hooks/useInput';
import Styled from '@/components/KanbanTodo/style';
import Button from '@/lib/design/Button';

type StatusType = 'todo' | 'progress' | 'done';

const KanbanTodo = () => {
  const storyArray = useStoryState();
  const useDispatch = useStoryDispatch();
  const [value, onChange] = useInput();

  const lastStoryId = storyArray.length > 0 ? storyArray[storyArray.length - 1]?.id : 0;
  const newStoryObj = {
    id: lastStoryId + 1,
    name: '',
    status: 'todo',
  };

  const addStory = () => {
    useDispatch({
      type: 'ADD_STORY',
      story: newStoryObj,
    });
  };

  return (
    <Styled.Column>
      <h4>To do</h4>
      {storyArray?.map((story) => {
        return (
          <Styled.KanBanItem key={story.id}>
            <input type="text" placeholder="type a todo..." onChange={onChange} />
          </Styled.KanBanItem>
        );
      })}
      <Button size={'large'} category={'cancel'} onClick={addStory}>
        Add Todo
      </Button>
    </Styled.Column>
  );
};

export default KanbanTodo;
