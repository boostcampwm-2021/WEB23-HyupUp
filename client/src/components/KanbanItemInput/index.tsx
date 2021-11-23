import React from 'react';
import Input from './style';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { useInput } from '@/lib/hooks';
import { updateStoryWithName } from '@/lib/api/story';
import { StoryType } from '@/types/story';

const KanbanInput = ({ story }: { story: StoryType }) => {
  const dispatchStory = useStoryDispatch();
  const { key, value, onChange } = useInput('');
  const useUpdateStoryName = () => {
    dispatchStory({
      type: 'UPDATE_STORY',
      story: { status: 'TODO', id: key, order: story.order, name: value },
    });
    updateStoryWithName({ status: 'TODO', id: key, order: story.order, name: value });
  };

  return (
    <Input
      type="text"
      placeholder={story.name ? story.name : 'type a todo...'}
      data-key={story.id}
      onChange={onChange}
      onBlur={useUpdateStoryName}
    />
  );
};

export default KanbanInput;
