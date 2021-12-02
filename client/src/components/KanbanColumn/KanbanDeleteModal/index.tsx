import React, { useState, createContext } from 'react';
import { Modal } from '@/lib/design';
import { deleteStoryWithId } from '@/lib/api/story';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import storyListAtom from '@/recoil/story';
import { useSocketSend } from '@/lib/hooks';
import produce from 'immer';
import userAtom from '@/recoil/user';

export type ModalContextType = {
  setShowModal: (args: boolean) => void;
  setDeleteItem: (arg: number) => void;
};

export const KanbanModalContext = createContext<ModalContextType | null>(null);

const KanbanDeleteModal = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [shouldDeleteKey, setDeleteItem] = useState(0);
  const setStoryList = useSetRecoilState(storyListAtom);
  const emitDeleteStory = useSocketSend('DELETE_STORY');
  const userState = useRecoilValue(userAtom);

  const deleteStory = async () => {
    setStoryList((prev) => produce(prev, (draft) => draft.filter((v) => v.id !== shouldDeleteKey)));
    await deleteStoryWithId(shouldDeleteKey);
    emitDeleteStory(shouldDeleteKey, userState.currentProjectId);
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
