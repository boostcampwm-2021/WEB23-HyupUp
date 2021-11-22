import React, { useContext, useState } from 'react';
import Styled from '@/components/KanbanItem/style';
import { KanbanItemType } from '@/types/story';
import { KanbanModalContext } from '@/components/KanbanModal';
import { KanbanInput } from '@/components';

const KanbanItem = ({ story, handleDragStart, handleDragEnter }: KanbanItemType) => {
  const modalConsumer = useContext(KanbanModalContext);
  const [isDragEnter, setDragEnter] = useState(false);

  return (
    <Styled.KanBanItem
      data-key={story.id}
      onDragStart={(e) => {
        handleDragStart(e, story.order as number, story.status);
        setDragEnter(false);
      }}
      onDragEnter={(e) => {
        handleDragEnter(e, story.order as number, story.status);
        setDragEnter((isDragEnter) => !isDragEnter);
      }}
      onDragLeave={() => setDragEnter((isDragEnter) => !isDragEnter)}
      onDragOver={(e) => e.preventDefault()}
      isDragEnter={isDragEnter}
      draggable
    >
      <KanbanInput story={story} />
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
