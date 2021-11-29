import React, { useRef } from 'react';
import { InputContainer, Input } from './style';
import { useSetRecoilState } from 'recoil';
import { useInput } from '@/lib/hooks';
import { updateStoryWithName } from '@/lib/api/story';
import { StoryType } from '@/types/story';
import { EpicType } from '@/types/epic';
import storyListAtom from '@/recoil/story';
import { useSocketSend } from '@/lib/hooks';

const KanbanInput = ({ story, epic }: { story: StoryType; epic: EpicType | undefined }) => {
  const setStoryListState = useSetRecoilState(storyListAtom);
  const { key, value, onChange } = useInput('');
  const emitUpdateStory = useSocketSend('UPDATE_STORY');
  const inputRef = useRef<HTMLInputElement>(null);

  const useUpdateStoryName = async () => {
    if (key < 0) return;
    setStoryListState((prev) => [
      ...prev.filter((v) => v.id !== key),
      { status: 'TODO', id: key, order: story.order, name: value },
    ]);
    await updateStoryWithName({ status: 'TODO', id: key, order: story.order, name: value });
    emitUpdateStory(key);
  };

  React.useEffect(() => {
    if (inputRef.current === null) return;
    inputRef.current.focus();
  }, []);

  return (
    <InputContainer>
      <Input
        type="text"
        placeholder={story.name ? story.name : 'Type a Todo ...'}
        {...value}
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
