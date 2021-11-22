import React, { useContext, useState } from 'react';
import Styled from '@/components/KanbanItem/style';
import { StoryType } from '@/types/story';
import { KanbanModalContext } from '@/components/KanbanModal';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { useInput } from '@/lib/hooks';
import { updateStoryWithName } from '@/lib/api/story';
import { KanbanDefaultType } from '@/layers/Kanban';

interface KanbanItemType extends KanbanDefaultType {
  story: StoryType;
}

const KanbanItem = ({ story, handleDragStart, handleDragEnter }: KanbanItemType) => {
  const modalConsumer = useContext(KanbanModalContext);
  const dispatchStory = useStoryDispatch();
  const { key, value, onChange } = useInput('');
  const [isDragEnter, setDragEnter] = useState(false);

  const useUpdateStoryName = () => {
    dispatchStory({
      type: 'UPDATE_STORY',
      story: { status: 'TODO', id: key, order: story.order, name: value },
    });
    updateStoryWithName({ status: 'TODO', id: key, order: story.order, name: value });
  };

  return (
    <Styled.KanBanItem
      data-key={story.id}
      onDragStart={(e) => handleDragStart(e, story.order as number, story.status)}
      onDragEnter={(e) => {
        handleDragEnter(e, story.order as number, story.status);
        setDragEnter((isDragEnter) => !isDragEnter);
      }}
      onDragLeave={(e) => setDragEnter((isDragEnter) => !isDragEnter)}
      onDragOver={(e) => e.preventDefault()}
      isDragEnter={isDragEnter}
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
          modalConsumer?.setDeleteItem(story.id as number);
        }}
      ></Styled.CancelIcon>
    </Styled.KanBanItem>
  );
};

export default KanbanItem;
