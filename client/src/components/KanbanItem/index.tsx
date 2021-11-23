import React, { useContext, useState } from 'react';
import Styled from '@/components/KanbanItem/style';
import { KanbanItemType } from '@/types/story';
import { KanbanModalContext } from '@/components/KanbanDeleteModal';
import { KanbanItemInput } from '@/components';
import { handleDragStart, handleDragEnter } from '@/lib/utils/drag';

const KanbanItem = ({
  story,
  dragRef,
  dragCategory,
  dragOverRef,
  dragOverCategory,
  handleDragDrop,
}: KanbanItemType) => {
  const modalConsumer = useContext(KanbanModalContext);
  const [isDragEnter, setDragEnter] = useState(false);

  return (
    <Styled.KanBanItem
      data-key={story.id}
      onDragStart={(e) => {
        handleDragStart(e, story.order as number, story.status, dragRef, dragCategory);
        setDragEnter(false);
      }}
      onDragEnter={(e) => {
        handleDragEnter(e, story.order as number, story.status, dragOverRef, dragOverCategory);
        setDragEnter((isDragEnter) => !isDragEnter);
      }}
      onDrop={() => {
        handleDragDrop(story.status);
        setDragEnter(false);
      }}
      onDragLeave={() => setDragEnter((isDragEnter) => !isDragEnter)}
      onDragOver={(e) => e.preventDefault()}
      isDragEnter={isDragEnter}
      draggable
    >
      <KanbanItemInput story={story} />
      <Styled.CancelIcon
        onClick={() => {
          modalConsumer?.setShowModal(true);
          modalConsumer?.setDeleteItem(story.id as number);
        }}
      />
    </Styled.KanBanItem>
  );
};

export default KanbanItem;
