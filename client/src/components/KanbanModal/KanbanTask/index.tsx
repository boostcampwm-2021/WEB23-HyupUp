import React, { useState } from 'react';
import Styled from './style';
import { useInput } from '@/lib/hooks';
import { updateTask } from '@/lib/api/task';
import { useRecoilValue } from 'recoil';
import { userListAtom } from '@/recoil/user';
import { KanbanTaskType } from '@/types/story';
import { Modal } from '@/lib/design';
import { useSocketSend } from '@/lib/hooks';
import TaskItemWithoutUser from '@/components/KanbanModal/TaskItemWithoutUser';
import TaskItemWithUser from '@/components/KanbanModal/TaskItemWithUser';
import deleteIcon from '@public/icons/delete-icon-red.svg';

type handleDeleteType = (arg: number) => void;
interface KanbanTaskProps {
  task: KanbanTaskType;
  handleDelete: handleDeleteType;
}

const KanbanTask = ({ task, handleDelete }: KanbanTaskProps) => {
  const { value, onChange } = useInput(task?.name);
  const [taskState, setTask] = useState<KanbanTaskType>(task);
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const userListState = useRecoilValue(userListAtom);
  const userListWithId = userListState.map((value) => {
    return { ...value, id: value.index };
  });
  const emitNewTask = useSocketSend('NEW_TASK');

  const handleInput = async () => {
    if (!taskState) return;
    await updateTask(taskState.id as number, value, false, taskState.userId);
    if (taskState.userId) emitNewTask(taskState.userId);
    setTask((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleUserSelect = async (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName !== 'LI' || !taskState) return;
    const selectedUser = userListWithId.find((v) => v.index === target.value);
    if (!selectedUser) return;
    await updateTask(Number(taskState.id), value, false, selectedUser.id);
    emitNewTask(selectedUser.id);
    setTask((prev) => ({
      ...prev,
      user: selectedUser.name,
      userImage: selectedUser.imageURL,
      userId: target.value,
    }));
  };

  return (
    <Styled.KanbanTaskWrapper>
      <input
        type="text"
        onBlur={handleInput}
        placeholder={task?.name ? task.name : 'Type A Task'}
        onChange={onChange}
      />
      {taskState.user || task.user ? (
        <TaskItemWithUser taskState={taskState} task={task} handleUserSelect={handleUserSelect} />
      ) : (
        <TaskItemWithoutUser handleUserSelect={handleUserSelect} />
      )}
      <Styled.DeleteIcon
        onMouseEnter={() => setShowDelete(true)}
        onMouseLeave={() => setShowDelete(false)}
        showDelete={showDelete}
        src={deleteIcon}
        alt="deleteicon"
        onClick={() => setShowDeleteModal(true)}
      />
      <Modal
        shouldConfirm
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onClickOk={() => handleDelete(Number(task.id))}
      >
        <Styled.DeleteConfirm>테스크를 삭제하시겠습니까?</Styled.DeleteConfirm>
      </Modal>
    </Styled.KanbanTaskWrapper>
  );
};

export default KanbanTask;
