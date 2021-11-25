import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@/lib/design';
import Styled from '@/components/KanbanModal/style';
import { BackLogTaskProps } from '@/types/task';
import { getTasksByStoryId } from '@/lib/api/task';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import KanbanTask from './KanbanTask/index';
import { EpicType } from '@/types/epic';
import { StoryType } from '@/types/story';
import { useEpicState } from '@/lib/hooks/useContextHooks';

//TODO 분리예정..
type ResultType = undefined | Array<BackLogTaskProps>;
type EpicStateType = undefined | EpicType;

interface KanbanModalType {
  story: StoryType;
  isItemModalOpen: boolean;
  setModalOpen: (arg: boolean) => void;
}

const KanbanModal = ({ story, isItemModalOpen, setModalOpen }: KanbanModalType) => {
  const user = useRecoilValue(userAtom);
  const epicListState = useEpicState();
  const [epic, setEpic] = useState<EpicStateType>();
  const [tasks, setTasks] = useState<ResultType>();

  const handleCloseClick = () => {
    setModalOpen(!isItemModalOpen);
  };

  const handleAddBtn = () => {
    const temporaryId = tasks ? Math.max(...tasks.map((v) => v.id)) + 1 : 0;
    if (tasks !== undefined) {
      setTasks([...tasks, { id: temporaryId, name: '', user: '', userImage: '' }]);
    } else {
      setTasks([{ id: temporaryId, name: '', user: '', userImage: '' }]);
    }
  };

  useEffect(() => {
    setEpic(epicListState.find((v) => v.id === story.epicId));
    const fetchTasks = async () => {
      if (!isItemModalOpen) return;
      const { id } = story;
      const result: ResultType = await getTasksByStoryId(id as number);
      setTasks(result);
    };

    fetchTasks();
  }, [story, isItemModalOpen, epicListState]);

  return (
    <Modal shouldConfirm={false} visible={isItemModalOpen} onClose={handleCloseClick} size="LARGE">
      <Styled.ContentWrapper>
        <h3>{story.name}</h3>
        <Styled.ControlWrapper>
          <p>{epic?.name}</p>
          <Button category={'default'} size={'small'} onClick={handleAddBtn}>
            ADD TASK
          </Button>
        </Styled.ControlWrapper>
        {tasks?.map((task) => (
          <KanbanTask key={task.id} task={task} storyId={story.id as number} />
        ))}
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default KanbanModal;
