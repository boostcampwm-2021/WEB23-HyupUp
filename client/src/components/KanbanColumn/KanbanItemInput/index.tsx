import React, { useRef } from 'react';
import Styled from './style';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useInput } from '@/lib/hooks';
import { updateStoryWithName } from '@/lib/api/story';
import { StoryType } from '@/types/story';
import { EpicType } from '@/types/epic';
import { useSocketSend } from '@/lib/hooks';
import { storyState } from '@/recoil/story';
import userAtom from '@/recoil/user';

const KanbanInput = ({
  story,
  epic,
  isHover,
}: {
  story: StoryType;
  epic: EpicType | undefined;
  isHover: boolean;
}) => {
  const { key, value, onChange } = useInput('');
  const updateStoryName = useSetRecoilState(storyState(key));
  const emitUpdateStory = useSocketSend('UPDATE_STORY');
  const userState = useRecoilValue(userAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlurUpdateName = async () => {
    if (key < 0) return;
    updateStoryName({ status: 'TODO', id: key, order: story.order, name: value });
    await updateStoryWithName({ status: 'TODO', id: key, order: story.order, name: value });
    emitUpdateStory(key, userState.currentProjectId);
  };

  React.useEffect(() => {
    if (inputRef.current === null) return;
    inputRef.current.focus();
  }, []);

  return (
    <Styled.InputContainer>
      <Styled.Input
        type="text"
        placeholder={story.name ? story.name : 'Type a Todo ...'}
        {...value}
        data-key={story.id}
        onChange={onChange}
        onBlur={onBlurUpdateName}
        isHover={isHover}
        ref={inputRef}
      />
      <p>{epic ? epic.name : '클릭 후 Epic을 등록하세요'}</p>
    </Styled.InputContainer>
  );
};

export default KanbanInput;
