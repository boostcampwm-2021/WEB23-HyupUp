import React, { useContext } from 'react';
import Styled from '@/components/KanbanItem/style';
import { StoryType } from '@/types/story';
import { KanbanModalContext } from '@/components/KanbanModal';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { useInput } from '@/lib/hooks';
import { updateStoryWithName } from '@/lib/api/story';

interface KanbanItem {
  story: StoryType;
  index: number;
  handleDragStart(e: React.SyntheticEvent<HTMLElement>, position: number): void;
  handleDragEnter(e: React.SyntheticEvent<HTMLElement>, position: number): void;
}

const KanbanItem = (props: KanbanItem) => {
  const { index, story, handleDragStart, handleDragEnter } = props;
  //TODO null 이 assign 되지 않음
  const modalConsumer = useContext(KanbanModalContext);

  const { key, value, onChange } = useInput('');
  const dispatchStory = useStoryDispatch();

  const useUpdateStoryName = () => {
    dispatchStory({ type: 'UPDATE_STORY', story: { status: 'TODO', id: key, name: value } });
    updateStoryWithName({ status: 'TODO', id: key, name: value });
  };

  return (
    <Styled.KanBanItem
      data-status={story.status}
      data-key={story.id}
      onDragStart={(e) => handleDragStart(e, index)}
      onDragEnter={(e) => handleDragEnter(e, index)}
      onDragOver={(e) => e.preventDefault()}
      draggable
    >
      <input
        type="text"
        placeholder={story.name ? story.name : 'type a todo...'}
        data-key={story.id}
        onChange={onChange}
        onBlur={useUpdateStoryName}
      />
      <Styled.CancelIcon
        onClick={() => {
          modalConsumer?.setShowModal(true);
          modalConsumer?.setDeleteItem(story.id);
        }}
      ></Styled.CancelIcon>
    </Styled.KanBanItem>
  );
};

export default KanbanItem;
