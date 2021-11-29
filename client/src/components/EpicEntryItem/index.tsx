import React, { useState } from 'react';
import S from './style';
import deleteIcon from '@public/icons/delete-icon-red.svg';
import draggableIcon from '@public/icons/draggable.svg';
import { EpicType } from '@/types/epic';
import EpicEditModal from '../EpicEditModal';
import { Modal } from '@/lib/design';
import { deleteEpicById, updateEpicById } from '@/lib/api/epic';
import { useSocketSend } from '@/lib/hooks';
import { useEpicDispatch, useEpicState } from '@/lib/hooks/useContextHooks';
import { getOrderMedian } from '@/lib/utils/epic';

interface EpicEntryItemProps {
  handleDragStart: (epicId: number) => void;
  handleDrop: (epicId: number) => void;
  epicData: EpicType;
}

const EpicEntryItem = (props: EpicEntryItemProps) => {
  const [showDraggable, setShowDraggable] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [value, setValue] = useState(props.epicData.name);
  const emitDeleteEpic = useSocketSend('DELETE_EPIC');
  const dispatchEpic = useEpicDispatch();
  const [isDragEntered, setDragEntered] = useState(false);

  const handleChange = (ev: React.ChangeEvent) => {
    setValue((ev.target as HTMLInputElement).value);
  };

  const handleDelete = () => {
    deleteEpicById(props.epicData.id);
    emitDeleteEpic(props.epicData.id);
    dispatchEpic({
      type: 'REMOVE_EPIC',
      id: props.epicData.id,
    });
  };

  return (
    <>
      <S.Container
        activated={isDragEntered}
        draggable="true"
        onMouseOver={() => setShowDraggable(true)}
        onMouseOut={() => setShowDraggable(false)}
        onDragStart={() => props.handleDragStart(props.epicData.id)}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDragEntered(true)}
        onDragLeave={() => setDragEntered(false)}
        onDrop={() => {
          setDragEntered(false);
          props.handleDrop(props.epicData.order);
        }}
      >
        <S.DeleteIcon
          src={deleteIcon}
          alt="deleteicon"
          showDelete={showDraggable}
          onClick={() => setShowDeleteModal(true)}
        />
        <S.DragIndicator src={draggableIcon} alt="draggableicon" showDraggable={showDraggable} />
        <div onClick={() => setShowEditModal(true)}>{props.epicData.name}</div>
      </S.Container>
      <Modal
        shouldConfirm
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onClickOk={handleDelete}
      >
        <S.DeleteConfirm>에픽을 삭제하시겠습니까?</S.DeleteConfirm>
      </Modal>
      <EpicEditModal
        showEditModal={showEditModal}
        setShowModal={setShowEditModal}
        epicData={props.epicData}
        value={value}
        handleChange={handleChange}
      />
    </>
  );
};

export default EpicEntryItem;
