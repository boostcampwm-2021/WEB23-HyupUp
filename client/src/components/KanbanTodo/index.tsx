import React from 'react';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';
import useInput from '@/lib/hooks/useInput';
import Styled from '@/components/KanbanTodo/style';
import Button from '@/lib/design/Button';

const KanbanTodo = () => {
  const storyState = useStoryState();
  const useDispatcher = useStoryDispatch();
  const [value, onChange] = useInput();

  const storyArray = storyState[Object.keys(storyState)[0]];
  const storyLastId = storyArray ? storyArray[storyArray.length - 1].id : 0;

  const addStoryHandler = () => {
    useDispatcher({
      type: 'ADD_STORY',
      story: {
        id: storyLastId + 1,
        name: '',
        status: 'todo',
        // todo 필요한지 다시 고민해볼 필요가 있음
        projects: { id: 1, name: 'test' },
        epics: {
          id: 1,
          name: 'test',
          startAt: new Date(),
          endAt: new Date(),
          projects: { id: 1, name: 'test' },
        },
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
