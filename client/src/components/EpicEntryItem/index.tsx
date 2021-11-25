import React, { useState } from 'react';
import S from './style';
import draggableIcon from '@public/icons/draggable.svg';

interface EpicEntryItemProps {
  activated: boolean;
  onDragStart?: React.DragEventHandler;
  onDragOver: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave?: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  name?: string;
}

const EpicEntryItem = (props: EpicEntryItemProps) => {
  const [showDraggable, setShowDraggable] = useState(false);

  return (
    <S.Container
      draggable="true"
      {...props}
      onMouseOver={() => setShowDraggable(true)}
      onMouseOut={() => setShowDraggable(false)}
    >
      <S.DragIndicator src={draggableIcon} alt="draggableicon" showDraggable={showDraggable} />
      <div>{props.name}</div>
    </S.Container>
  );
};

export default EpicEntryItem;
