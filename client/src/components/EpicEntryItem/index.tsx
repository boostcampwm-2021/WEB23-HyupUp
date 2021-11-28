import React, { useState } from 'react';
import S from './style';
import draggableIcon from '@public/icons/draggable.svg';
import { EpicType } from '@/types/epic';
import EpicEditModal from '../EpicEditModal';

interface EpicEntryItemProps {
  activated: boolean;
  onDragStart?: React.DragEventHandler;
  onDragOver: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave?: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  epicData: EpicType;
}

const EpicEntryItem = (props: EpicEntryItemProps) => {
  const [showDraggable, setShowDraggable] = useState(false);
  const [showEditModal, setShowModal] = useState(false);
  const [value, setValue] = useState(props.epicData.name);

  const handleChange = (ev: React.ChangeEvent) => {
    setValue((ev.target as HTMLInputElement).value);
  };

  return (
    <>
      <S.Container
        draggable="true"
        {...props}
        onMouseOver={() => setShowDraggable(true)}
        onMouseOut={() => setShowDraggable(false)}
        onClick={() => setShowModal(true)}
      >
        <S.DragIndicator src={draggableIcon} alt="draggableicon" showDraggable={showDraggable} />
        <div>{props.epicData.name}</div>
      </S.Container>
      <EpicEditModal
        showEditModal={showEditModal}
        setShowModal={setShowModal}
        epicData={props.epicData}
        value={value}
        handleChange={handleChange}
      />
    </>
  );
};

export default EpicEntryItem;
