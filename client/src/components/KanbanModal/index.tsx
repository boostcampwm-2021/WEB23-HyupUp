import React, { useState, useEffect } from 'react';
import { Modal } from '@/lib/design';
import { StoryType } from '@/types/story';

interface KanbnaModalType {
  isItemClick: boolean;
  story: StoryType;
}

const KanbanModal = ({ isItemClick, story }: KanbnaModalType) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(isItemClick);
  }, [isItemClick]);

  return (
    <Modal shouldConfirm={false} visible={isOpen} onClose={handleCloseClick} size="LARGE">
      {story.name}
    </Modal>
  );
};

export default KanbanModal;
