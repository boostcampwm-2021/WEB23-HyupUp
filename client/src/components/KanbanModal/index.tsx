import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from '@/lib/design';
import Styled from '@/components/KanbanModal/style';
import { BackLogTaskProps } from '@/types/task';
import { StatusType } from '@/types/story';
import { getTasksByStoryId } from '@/lib/api/task';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import KanbanTask from './KanbanTask/index';
import { getEpicById } from '@/lib/api/epic';
import { EpicType } from '@/types/epic';

//TODO 분리예정..
type ResultType = undefined | Array<BackLogTaskProps>;
type EpicStateType = undefined | EpicType;
type StoryType = {
  name?: string;
  status?: StatusType;
  id?: number;
  order?: number;
  project?: number;
  epic?: number;
};

interface KanbanModalType {
  story: StoryType;
  isItemModalOpen: boolean;
  setModalOpen: (arg: boolean) => void;
}

const KanbanModal = ({ story, isItemModalOpen, setModalOpen }: KanbanModalType) => {
  const user = useRecoilValue(userAtom);
  const [tasks, setTasks] = useState<ResultType>();
  const [epic, setEpic] = useState<EpicStateType>();
  const storyStateRef = useRef<StoryType>(story);

  const handleCloseClick = () => {
    setModalOpen(!isItemModalOpen);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isItemModalOpen) return;
      const { id } = story;
      const result: ResultType = await getTasksByStoryId(id as number);
      setTasks(result);
    };

    const fetchEpic = async () => {
      if (!isItemModalOpen) return;
      const { epic } = storyStateRef.current;
      const result = await getEpicById(epic as number);
      setEpic(result);
    };
    fetchTasks();
    fetchEpic();
  }, [story, isItemModalOpen]);

  return (
    <Modal shouldConfirm={false} visible={isItemModalOpen} onClose={handleCloseClick} size="LARGE">
      <Styled.ContentWrapper>
        <h3>{story.name}</h3>
        <Styled.ControlWrapper>
          <p>{epic?.name}</p>
          <Button category={'default'} size={'small'}>
            ADD TASK
          </Button>
        </Styled.ControlWrapper>
        {tasks?.map((task) => (
          <KanbanTask key={task.id} task={task} />
        ))}
      </Styled.ContentWrapper>
    </Modal>
  );
};

export default KanbanModal;
