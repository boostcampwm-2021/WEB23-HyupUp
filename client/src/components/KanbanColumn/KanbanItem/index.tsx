import React, { useContext, useState } from 'react';
import Styled from '@/components/KanbanColumn/KanbanItem/style';
import { KanbanItemType } from '@/types/story';
import { KanbanModalContext } from '@/components/KanbanColumn/KanbanDeleteModal';
import { KanbanItemInput, KanbanModal } from '@/components';
import { handleDragStart, handleDragEnter } from '@/lib/utils/drag';

const KanbanItem = ({
  story,
  epic,
  dragRef,
  dragCategory,
  dragOverRef,
  dragOverCategory,
  handleDragDrop,
}: KanbanItemType) => {
  const modalConsumer = useContext(KanbanModalContext);
  const [isDragEnter, setDragEnter] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isItemModalOpen, setModalOpen] = useState<boolean>(false);
  const handleItemClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).dataset.type === 'cancel') return;
    if (!story.name) return;
    if (isItemModalOpen) return;
    setModalOpen((prev) => !prev);
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
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      isHover={isHover}
      isDragEnter={isDragEnter}
      draggable={true}
    >
      <KanbanItemInput isHover={isHover} story={story} epic={epic} />
      <Styled.CancelIcon
        data-type="cancel"
        isHover={isHover}
        onClick={() => {
          modalConsumer?.setShowModal(true);
          modalConsumer?.setDeleteItem(story.id as number);
        }}
      />
      <KanbanModal setModalOpen={setModalOpen} isItemModalOpen={isItemModalOpen} story={story} />
    </Styled.KanBanItem>
  );
};

export default KanbanItem;
