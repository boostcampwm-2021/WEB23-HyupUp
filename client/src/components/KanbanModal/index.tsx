import React, { useState, useEffect } from 'react';
import { Modal } from '@/lib/design';
import { StoryType } from '@/types/story';
import { getTasksByStoryId } from '@/lib/api/task';
import { BackLogTaskProps } from '@/types/task';
interface KanbnaModalType {
  isItemClick: boolean;
  story: StoryType;
}

type ResultType = undefined | Array<BackLogTaskProps>;

const KanbanModal = ({ isItemClick, story }: KanbnaModalType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Array<BackLogTaskProps>>([]);

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
    };
    fetchTasks();
  }, [story.id, isItemClick]);

  return (
    <Modal shouldConfirm={false} visible={isOpen} onClose={handleCloseClick} size="LARGE">
      {story.name}
    </Modal>
  );
};

export default KanbanModal;
