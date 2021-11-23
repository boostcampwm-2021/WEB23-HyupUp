import React, { useState, useEffect } from 'react';
import { Modal } from '@/lib/design';

interface KanbnaModalType {
  isItemClick: boolean;
}

const KanbanModal = ({ isItemClick }: KanbnaModalType) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(isItemClick);
  }, [isItemClick]);

  return (
    <Modal shouldConfirm={false} visible={isOpen} onClose={handleCloseClick} size="LARGE"></Modal>
  );
};

export default KanbanModal;
