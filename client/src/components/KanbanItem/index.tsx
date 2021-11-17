import React from 'react';
import Styled from '@/components/KanbanItem/style';
import { StoryType } from '@/types/story';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';
import useInput from '@/lib/hooks/useInput';
import { updateStoryWithName } from '@/lib/api/story';

type KanbanItem = {
  story: StoryType;
  storyObj: StoryType;
  setDeleteKey(arg: number): void;
  setShowModal(arg: boolean): void;
};

const KanbanItem = ({ story, storyObj, setDeleteKey, setShowModal }: KanbanItem) => {
  const { key, value, onChange } = useInput('');
  const useDispatch = useStoryDispatch();

  const useUpdateStoryName = () => {
    useDispatch({ type: 'UPDATE_STORY', story: { ...storyObj, id: key, name: value } });
    updateStoryWithName({ ...storyObj, id: key, name: value });
  };

  return (
    <Styled.KanBanItem>
      <input
        type="text"
        placeholder={story.name ? story.name : 'type a todo...'}
        data-key={story.id}
        onChange={onChange}
        onBlur={useUpdateStoryName}
      />
      <Styled.CancelIcon
        onClick={() => {
          setShowModal(true);
          setDeleteKey(story.id);
        }}
      ></Styled.CancelIcon>
    </Styled.KanBanItem>
  );
};

export default KanbanItem;
