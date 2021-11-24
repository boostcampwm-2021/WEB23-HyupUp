import React, { useState, useEffect } from 'react';
import { Modal } from '@/lib/design';
import Styled from '@/components/KanbanModal/style';
import { BackLogTaskProps } from '@/types/task';
import { StoryType } from '@/types/story';
import { getTasksByStoryId } from '@/lib/api/task';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import KanbanTask from './KanbanTask/index';

interface KanbnaModalType {
  isItemClick: boolean;
  story: StoryType;
}

type ResultType = undefined | Array<BackLogTaskProps>;

const KanbanModal = ({ isItemClick, story }: KanbnaModalType) => {
  const user = useRecoilValue(userAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<ResultType>([]);

  const handleCloseClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(isItemClick);
  }, [isItemClick]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!isItemClick) return;
      const result: ResultType = await getTasksByStoryId(story.id as number);
      setTasks(result);
    };
    fetchTasks();
  }, [story.id, isItemClick]);

  return (
    <Styled.Wrapper>
      <Modal shouldConfirm={false} visible={isOpen} onClose={handleCloseClick} size="LARGE">
        <h4>{story.name}</h4>
        {tasks?.map((task) => (
          <KanbanTask key={task.id} task={task} />
        ))}
      </Modal>
    </Styled.Wrapper>
  );
};

export default KanbanModal;
