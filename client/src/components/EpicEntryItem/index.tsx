import React from 'react';
import S from './style';

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
  return (
    <S.Container draggable="true" {...props}>
      {props.name}
    </S.Container>
  );
};

export default EpicEntryItem;
