import React, { useContext } from 'react';
import Styled from '@/components/KanbanItem/style';
import { StoryType } from '@/types/story';
import { KanbanModalContext } from '@/components/KanbanModal';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { useInput } from '@/lib/hooks';
import { updateStoryWithName } from '@/lib/api/story';
import { KanbanDefaultType } from '@/layers/Kanban';

interface KanbanItemType extends KanbanDefaultType {
  index: number;
  story: StoryType;
}

const KanbanItem = ({ index, story, handleDragStart, handleDragEnter }: KanbanItemType) => {
  const modalConsumer = useContext(KanbanModalContext);

  const { key, value, onChange } = useInput('');
  const dispatchStory = useStoryDispatch();

  const useUpdateStoryName = () => {
    dispatchStory({ type: 'UPDATE_STORY', story: { status: 'TODO', id: key, name: value } });
    updateStoryWithName({ status: 'TODO', id: key, name: value });
  };

  return (
    <Styled.KanBanItem
      data-key={story.id}
      onDragStart={(e) => handleDragStart(e, index, story.status)}
      onDragEnter={(e) => handleDragEnter(e, index, story.status)}
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
