import React, { useState } from 'react';
import S from './style';
import draggableIcon from '@public/icons/draggable.svg';
import { Modal } from '@/lib/design';
import { EpicType } from '@/types/epic';
import EpicEditModal from '../EpicEditModal';
import { useEpicDispatch } from '@/lib/hooks/useContextHooks';
import { updateEpicById } from '@/lib/api/epic';

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

  const dispatchEpic = useEpicDispatch();

  const handleChange = (ev: React.ChangeEvent) => {
    setValue((ev.target as HTMLInputElement).value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedEpic = { ...props.epicData, name: value };
    updateEpicById(props.epicData.id, updatedEpic);
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic,
    });
    setShowModal(false);
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
      <Modal
        shouldConfirm
        title="에픽 제목 수정"
        visible={showEditModal}
        onClose={() => setShowModal(false)}
        onClickOk={handleFormSubmit}
      >
        <EpicEditModal
          epicData={props.epicData}
          value={value}
          handleChange={handleChange}
          handleFormSubmit={handleFormSubmit}
        />
      </Modal>
    </>
  );
};

export default EpicEntryItem;
