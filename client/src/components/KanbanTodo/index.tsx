import React from 'react';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { useUserState } from '@/lib/hooks/useContextHooks';
import { createStory } from '@/lib/api/story';
import useInput from '@/lib/hooks/useInput';
import Styled from '@/components/KanbanTodo/style';
import Button from '@/lib/design/Button';

enum StatusType {
  TODO,
  IN_PRGORESS,
  DONE,
}
interface StoryObject {
  id: number;
  name: string;
  status: StatusType;
}

const KanbanTodo = () => {
  const storyArray = useStoryState();
  const useDispatch = useStoryDispatch();
  const userState = useUserState();

  const [value, onChange] = useInput();
  const lastStoryId = storyArray.length > 0 ? storyArray[storyArray.length - 1]?.id : 0;
  const StoryObject: StoryObject = {
    id: lastStoryId + 1,
    name: '',
    status: 'TODO',
  };
  console.log(userState);

  const addStory = () => {
    useDispatch({ type: 'ADD_STORY', story: StoryObject });
    createStory(StoryObject.id, StoryObject.status, userState.currentProjectId as number, '', '');
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
