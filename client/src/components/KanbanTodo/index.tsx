import React, { useEffect } from 'react';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { createStory } from '@/lib/api/story';
import useInput from '@/lib/hooks/useInput';
import Styled from '@/components/KanbanTodo/style';
import Button from '@/lib/design/Button';
import { StoryType } from '@/types/story';

interface KanbanProps {
  projectId?: number;
}

const KanbanTodo = ({ projectId }: KanbanProps) => {
  const storyArray = useStoryState();
  const useDispatch = useStoryDispatch();
  const [key, value, handleChange] = useInput();

  const lastStoryId = storyArray.length > 0 ? storyArray[storyArray.length - 1]?.id : 0;
  const StoryObject: StoryType = {
    id: lastStoryId + 1,
    name: '',
    status: 'TODO',
  };

  const useAddStory = () => {
    useDispatch({ type: 'ADD_STORY', story: StoryObject });
    createStory({ ...StoryObject, projectId });
  };

  const useUpdateStory = () => {
    useDispatch({ type: 'UPDATE_STORY', story: { ...StoryObject, id: key, name: value } });
  };

  return (
    <Styled.Column>
      <h4>To do</h4>
      {storyArray?.map((story) => {
        return (
          <Styled.KanBanItem key={story.id}>
            <input
              type="text"
              placeholder="type a todo..."
              data-key={story.id}
              onChange={handleChange}
              onBlur={useUpdateStory}
            />
          </Styled.KanBanItem>
        );
      })}
      <Button size={'large'} category={'cancel'} onClick={useAddStory}>
        Add Todo
      </Button>
    </Styled.Column>
  );
};

export default KanbanTodo;
