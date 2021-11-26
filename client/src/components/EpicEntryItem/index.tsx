import React, { useState } from 'react';
import S from './style';
import draggableIcon from '@public/icons/draggable.svg';
import { Modal, Button } from '@/lib/design';
import { updateEpicById } from '@/lib/api/epic';
import { EpicType } from '@/types/epic';
import { useEpicDispatch } from '@/lib/hooks/useContextHooks';

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
      <Modal
        shouldConfirm={false}
        title="에픽 제목 수정"
        visible={showEditModal}
        onClose={() => setShowModal(false)}
      >
        <S.Form onSubmit={handleFormSubmit}>
          <S.Input
            type="text"
            placeholder={props.epicData.name}
            value={value}
            onChange={handleChange}
          />
          <Button category="default" size="small" onClick={handleFormSubmit}>
            OK
          </Button>
        </S.Form>
      </Modal>
    </>
  );
};

export default EpicEntryItem;
