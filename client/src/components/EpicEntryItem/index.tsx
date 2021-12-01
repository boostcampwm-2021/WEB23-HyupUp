import React, { useState } from 'react';
import { toast } from 'react-toastify';
import S from './style';
import deleteIcon from '@public/icons/delete-icon-red.svg';
import draggableIcon from '@public/icons/draggable.svg';
import { EpicType } from '@/types/epic';
import EpicEditModal from '../EpicEditModal';
import { Modal } from '@/lib/design';
import { updateEpicById, deleteEpicById } from '@/lib/api/epic';
import { useSocketSend } from '@/lib/hooks';
import { useEpicDispatch } from '@/lib/hooks/useContextHooks';
import { errorMessage } from '@/lib/common/message';
import { checkStringInput } from '@/lib/utils/bytes';
import { isLatter, isSameDay } from '@/lib/utils/date';

interface EpicEntryItemProps {
  handleDragStart?: (epicId: number) => void;
  handleDrop: (epicId: number) => void;
  epicData: EpicType;
  isEmpty?: boolean;
}

const EpicEntryItem = ({ handleDragStart, handleDrop, epicData, isEmpty }: EpicEntryItemProps) => {
  const [showDraggable, setShowDraggable] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [value, setValue] = useState(epicData.name);
  const [isDragEntered, setDragEntered] = useState(false);
  const emitDeleteEpic = useSocketSend('DELETE_EPIC');
  const emitUpdateEpic = useSocketSend('UPDATE_EPIC_BAR');
  const dispatchEpic = useEpicDispatch();

  const handleChange = (ev: React.ChangeEvent) => {
    setValue((ev.target as HTMLInputElement).value);
  };

  const handleDelete = () => {
    deleteEpicById(epicData.id);
    emitDeleteEpic(epicData.id);
    dispatchEpic({
      type: 'REMOVE_EPIC',
      id: epicData.id,
    });
  };

  const handleEditSubmit = async (
    e: React.FormEvent,
    { startDate, endDate }: { startDate: Date; endDate: Date },
  ) => {
    e.preventDefault();
    if (!value.length || !checkStringInput(value)) {
      toast.error(errorMessage.EPIC_TITLE_LENGTH_LIMIT);
      return;
    }

    if (isLatter(startDate, endDate) && !isSameDay(startDate, endDate)) {
      toast.error(errorMessage.START_DATE_IS_LATTER);
      return;
    }
    const updatedEpic = { ...epicData, name: value, startAt: startDate, endAt: endDate };
    dispatchEpic({
      type: 'UPDATE_EPIC',
      epic: updatedEpic,
    });
    setShowEditModal(false);

    await updateEpicById(epicData.id, updatedEpic);
    emitUpdateEpic(epicData.id);
  };

  return (
    <>
      <S.Container
        isEmpty={isEmpty}
        activated={isDragEntered}
        draggable="true"
        onMouseOver={() => setShowDraggable(true)}
        onMouseOut={() => setShowDraggable(false)}
        onDragStart={() => handleDragStart && handleDragStart(epicData.id)}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDragEntered(true)}
        onDragLeave={() => setDragEntered(false)}
        onDrop={() => {
          setDragEntered(false);
          handleDrop(epicData.order);
        }}
      >
        {!isEmpty && (
          <>
            <S.DeleteIcon
              src={deleteIcon}
              alt="deleteicon"
              showDelete={showDraggable}
              onClick={() => setShowDeleteModal(true)}
            />
            <S.DragIndicator
              src={draggableIcon}
              alt="draggableicon"
              showDraggable={showDraggable}
            />
            <div onClick={() => setShowEditModal(true)}>{epicData.name}</div>
          </>
        )}
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
        epicData={epicData}
        value={value}
        handleChange={handleChange}
        handleFormSubmit={handleEditSubmit}
      />
    </>
  );
};

export default EpicEntryItem;
