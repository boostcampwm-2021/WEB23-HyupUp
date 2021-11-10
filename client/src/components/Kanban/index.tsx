import React from 'react';
import Styled from '@/components/Kanban/style';
import Button from '@/lib/design/Button';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';

const Kanban = () => {
  const storyState = useStoryState();
  const useDispatcher = useStoryDispatch();
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

  console.log(storyArray);
  return (
    <Styled.Container>
      <Styled.Title>프로젝트 칸반보드</Styled.Title>
      <Styled.ColumnContainer>
        <Styled.Column>
          <h4>To do</h4>
          {storyArray?.map((story) => {
            return (
              <Styled.KanBanItem key={story.id}>
                <input type="text" placeholder="type a todo..." />
              </Styled.KanBanItem>
            );
          })}
          <Button size={'large'} category={'cancel'} onClick={addStoryHandler}>
            Add Todo
          </Button>
        </Styled.Column>
        <Styled.Column>
          <h4>In Progress</h4>
        </Styled.Column>
        <Styled.Column>
          <h4>Done</h4>
        </Styled.Column>
      </Styled.ColumnContainer>
    </Styled.Container>
  );
};

export default Kanban;
