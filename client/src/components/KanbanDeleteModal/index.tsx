import React, { useState, createContext } from 'react';
import { Modal } from '@/lib/design';
import { deleteStoryWithId } from '@/lib/api/story';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';

export type ModalContextType = {
  setShowModal: (args: boolean) => void;
  setDeleteItem: (arg: number) => void;
};

export const KanbanModalContext = createContext<ModalContextType | null>(null);

const KanbanDeleteModal = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [shouldDeleteKey, setDeleteItem] = useState(0);

  const dispatchStory = useStoryDispatch();
  const deleteStory = async () => {
    dispatchStory({ type: 'REMOVE_STORY', id: shouldDeleteKey });
    await deleteStoryWithId(shouldDeleteKey);
  };

  return (
    <KanbanModalContext.Provider value={{ setShowModal, setDeleteItem }}>
      <Modal
        shouldConfirm
        title={'스토리를 삭제하시겠습니까?'}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onClickCancel={() => setShowModal(false)}
        onClickOk={deleteStory}
      />
      {children}
    </KanbanModalContext.Provider>
  );
};

export default KanbanDeleteModal;
