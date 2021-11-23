import React, { useContext, useState } from 'react';
import Styled from '@/components/KanbanItem/style';
import { KanbanItemType } from '@/types/story';
import { KanbanModalContext } from '@/components/KanbanDeleteModal';
import { KanbanItemInput, KanbanModal } from '@/components';
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
  const [isItemClick, setItemClick] = useState<boolean>(false);
  const handleItemClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.type === 'cancel') return;
    setItemClick((prev) => !prev);
  };
  return (
    <Styled.KanBanItem
      data-key={story.id}
      onClick={handleItemClick}
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
        data-type="cancel"
        onClick={() => {
          modalConsumer?.setShowModal(true);
          modalConsumer?.setDeleteItem(story.id as number);
        }}
      />
      <KanbanModal isItemClick={isItemClick} story={story} />
    </Styled.KanBanItem>
  );
};

export default KanbanItem;
