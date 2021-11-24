import React, { useState, useEffect } from 'react';
import { Modal, Button } from '@/lib/design';
import ContentWrapper from '@/components/KanbanModal/style';
import { BackLogTaskProps } from '@/types/task';
import { StoryType } from '@/types/story';
import { getTasksByStoryId } from '@/lib/api/task';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import KanbanTask from './KanbanTask/index';

interface KanbanModalType {
  story: StoryType;
  isItemModalOpen: boolean;
  setModalOpen: (arg: boolean) => void;
}

type ResultType = undefined | Array<BackLogTaskProps>;

const KanbanModal = ({ story, isItemModalOpen, setModalOpen }: KanbanModalType) => {
  const user = useRecoilValue(userAtom);
  const [tasks, setTasks] = useState<ResultType>([]);

  const handleCloseClick = () => {
    setModalOpen(!isItemModalOpen);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isItemModalOpen) return;
      const result: ResultType = await getTasksByStoryId(story.id as number);
      setTasks(result);
    };
    fetchTasks();
  }, [story.id, isItemModalOpen]);

  return (
    <Modal shouldConfirm={false} visible={isItemModalOpen} onClose={handleCloseClick} size="LARGE">
      <ContentWrapper>
        <h3>{story.name}</h3>
        <Button category={'default'} size={'small'}>
          ADD TASK
        </Button>
        {tasks?.map((task) => (
          <KanbanTask key={task.id} task={task} />
        ))}
      </ContentWrapper>
    </Modal>
  );
};

export default KanbanModal;
