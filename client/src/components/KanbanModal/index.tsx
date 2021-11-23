import React from 'react';
import { Modal } from '@/lib/design';

const KanbanModal = () => {
  const handleClick = () => console.log('closed');
  return <Modal shouldConfirm={false} visible={true} onClose={handleClick} size="LARGE"></Modal>;
};

export default KanbanModal;
