import React, { useState } from 'react';
import S from './style';
import draggableIcon from '@public/icons/draggable.svg';
import { Modal } from '@/lib/design';
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
      <Modal
        shouldConfirm={false}
        title="에픽 제목 수정"
        visible={showEditModal}
        onClose={() => setShowModal(false)}
      >
        <EpicEditModal setShowModal={setShowModal} epicData={props.epicData} />
      </Modal>
    </>
  );
};

export default EpicEntryItem;
