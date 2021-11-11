import React from 'react';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';
import useInput from '@/lib/hooks/useInput';
import Styled from '@/components/KanbanTodo/style';
import Button from '@/lib/design/Button';

const KanbanTodo = () => {
  const storyArray = useStoryState();
  const useDispatcher = useStoryDispatch();
  const [value, onChange] = useInput();

  const lastStoryId = storyArray ? storyArray[storyArray.length - 1]?.id : 1;

  const addStoryHandler = () => {
    useDispatcher({
      type: 'ADD_STORY',
      story: {
        id: lastStoryId + 1,
        name: '',
      },
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
      <Button size={'large'} category={'cancel'} onClick={addStoryHandler}>
        Add Todo
      </Button>
    </Styled.Column>
  );
};

export default KanbanTodo;
