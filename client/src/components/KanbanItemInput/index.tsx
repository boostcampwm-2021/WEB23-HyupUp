import React, { useRef } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current === null) return;
    inputRef.current.focus();
  }, []);

  return (
    <InputContainer>
      <Input
        type="text"
        placeholder={story.name ? story.name : 'Type a Todo ...'}
        data-key={story.id}
        onChange={onChange}
        onBlur={useUpdateStoryName}
        ref={inputRef}
      />
      <p>{epic ? epic.name : '클릭 후 Epic을 등록하세요'}</p>
    </InputContainer>
  );
};

export default KanbanInput;
