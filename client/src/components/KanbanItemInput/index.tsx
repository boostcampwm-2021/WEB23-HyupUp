import React from 'react';
import { InputContainer, Input } from './style';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { useInput } from '@/lib/hooks';
import { updateStoryWithName } from '@/lib/api/story';
import { StoryType } from '@/types/story';
import { EpicType } from '@/types/epic';

const KanbanInput = ({ story, epic }: { story: StoryType; epic: EpicType | undefined }) => {
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
    <InputContainer>
      <Input
        type="text"
        placeholder={'type a Story...'}
        value={story.name}
        data-key={story.id}
        onChange={onChange}
        onBlur={useUpdateStoryName}
      />
      <p>{epic ? epic.name : 'Epic 을 등록해주세요'}</p>
    </InputContainer>
  );
};

export default KanbanInput;
