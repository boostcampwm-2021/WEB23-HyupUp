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

type TaskListType = undefined | Array<TaskProps>;
type EpicStateType = undefined | EpicType;

const KanbanModal = ({ story, isItemModalOpen, setModalOpen }: KanbanModalType) => {
  const epicListState = useEpicState();
  const setStoryListState = useSetRecoilState(storyListAtom);
  const [epic, setEpic] = useState<EpicStateType>();
  const [tasks, setTasks] = useState<TaskListType>();

  const handleCloseClick = () => {
    setModalOpen(!isItemModalOpen);
  };

  const handleAddBtn = () => {
    const temporaryId = tasks ? Math.max(...tasks.map((v) => v.id)) + 1 : 0;
    if (tasks !== undefined) {
      setTasks([...tasks, { id: temporaryId, name: '', user: '', userImage: '', preExist: false }]);
    } else {
      setTasks([{ id: temporaryId, name: '', user: '', userImage: '', preExist: false }]);
    }
  };

  useEffect(() => {
    (async () => {
      if (!isItemModalOpen) return;
      const { epicId, id } = story;
      setEpic(epicListState.find((v) => v.id === epicId));
      const taskResult: TaskListType = await getTasksByStoryId(id as number);
      setTasks(taskResult?.map((v) => ({ ...v, preExist: true })));
    })();
  }, [story, isItemModalOpen, epicListState]);

  const handleEpicSelect = async (e: React.MouseEvent) => {
    const target = e.target as HTMLLIElement;
    if (target.tagName !== 'LI') return;

    const epicId = epicListState.find((v) => v.id === target.value)?.id;
    setStoryListState((prev) => [...prev, { ...story, epicId: epicId }]);
    await updateStoryWithId({ ...story, epicId: epicId });
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
          <Button category={'default'} size={'small'} onClick={handleAddBtn}>
            ADD TASK
          </Button>
        </Styled.ControlWrapper>
        {tasks
          ?.sort((a, b) => b.id - a.id)
          .map((task) => (
            <KanbanTask key={task.id} task={task} storyId={story.id as number} />
          ))}
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default KanbanModal;
