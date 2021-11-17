import React from 'react';
import Styled from '@/components/KanbanItem/style';
import { StoryType } from '@/types/story';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { useInput } from '@/lib/hooks';
import { updateStoryWithName } from '@/lib/api/story';

interface KanbanItem {
  story: StoryType;
  index: number;
  setDeleteKey(arg: number): void;
  setShowModal(arg: boolean): void;
  handleDragStart(e: React.SyntheticEvent<HTMLElement>, position: number): void;
  handleDragEnter(e: React.SyntheticEvent<HTMLElement>, position: number): void;
}

const KanbanItem = (props: KanbanItem) => {
  const { index, story, setDeleteKey, setShowModal, handleDragStart, handleDragEnter } = props;
  const { key, value, onChange } = useInput('');
  const dispatchStory = useStoryDispatch();

  const useUpdateStoryName = () => {
    dispatchStory({ type: 'UPDATE_STORY', story: { status: 'TODO', id: key, name: value } });
    updateStoryWithName({ status: 'TODO', id: key, name: value });
  };

  return (
    <Styled.KanBanItem draggable>
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
