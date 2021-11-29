import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import Styled from '@/components/KanbanModal/style';
import KanbanTask from './KanbanTask/index';
import { Modal, Button, DropDown } from '@/lib/design';

import { getTasksByStoryId } from '@/lib/api/task';
import { updateStoryWithId } from '@/lib/api/story';
import { EpicType } from '@/types/epic';
import { TaskProps, KanbanModalType } from '@/types/story';
import { useEpicState } from '@/lib/hooks/useContextHooks';
import storyListAtom from '@/recoil/story';
import { postTask } from '@/lib/api/task';

type TaskListType = Array<TaskProps>;
type EpicStateType = EpicType;

const defaultTaskItem = {
  name: '',
  id: '',
  user: '',
  userImage: '',
};

const KanbanModal = ({ story, isItemModalOpen, setModalOpen }: KanbanModalType) => {
  const epicListState = useEpicState();
  const setStoryListState = useSetRecoilState(storyListAtom);
  const [epic, setEpic] = useState<EpicStateType>();
  const [taskList, setTaskList] = useState<TaskListType>([]);

  useEffect(() => {
    const getTaskList = async (id: number) => {
      const taskResult = await getTasksByStoryId(id);
      if (!taskResult) return;
      setTaskList(taskResult);
    };

    if (isItemModalOpen) getTaskList(story.id as number);
  }, [isItemModalOpen, story.id]);

  useEffect(() => {
    setEpic(epicListState.find((v) => v.id === story.epicId));
  }, [epicListState, story.epicId]);

  const handleEpicSelect = async (e: React.MouseEvent) => {
    if ((e.target as HTMLLIElement).tagName !== 'LI') return;
    const epicId = epicListState.find((v) => v.id === (e.target as HTMLLIElement).value)?.id;
    setStoryListState((prev) => [...prev, { ...story, epicId: epicId }]);
    await updateStoryWithId({ ...story, epicId: epicId });
  };

  const handleCloseClick = () => setModalOpen(false);

  const handleAddBtn = async () => {
    const insertedId = await postTask({
      name: '',
      status: 1,
      storyId: Number(story.id),
      userId: null,
      projectId: null,
    });

    if (taskList)
      setTaskList((taskList) => [
        { ...defaultTaskItem, id: insertedId },
        ...(taskList as TaskListType),
      ]);
    else setTaskList([{ ...defaultTaskItem, id: insertedId }]);
  };

  return (
    <Modal shouldConfirm={false} visible={isItemModalOpen} onClose={handleCloseClick} size="LARGE">
      <Styled.ContentWrapper>
        <h3>{story.name}</h3>
        <Styled.ControlWrapper>
          <DropDown
            Title={<p>{epic?.name}</p>}
            list={epicListState}
            handleClick={handleEpicSelect}
          />
          <Button category={'default'} size={'small'} onClick={() => handleAddBtn()}>
            ADD TASK
          </Button>
        </Styled.ControlWrapper>
        {taskList
          ?.sort((a, b) => b.id - a.id)
          .map((task) => (
            <KanbanTask key={task.id} task={task} />
          ))}
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default KanbanModal;
