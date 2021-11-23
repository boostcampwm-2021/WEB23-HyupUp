import React, { useState } from 'react';
import * as S from './style';
import { Modal } from '@/lib/design';

import { deleteUserById, modifyUserAdminById } from '@/lib/api/user';
import TeamInviteBar from '@/components/TeamInviteBar';
import { TeamItemViewer } from '@/components/TeamItemViewer';

const ADMIN = true;
const TEAMMATE = false;

const generateMessage = (message: string) => {
  return message === '팀원에서 제외' ? (
    <S.ModalText>정말로 팀원에서 제외하겠습니까?</S.ModalText>
  ) : message === '팀원으로 변경' ? (
    <S.ModalText>정말 팀원으로 변경하시겠습니까?</S.ModalText>
  ) : (
    <S.ModalText>정말 관리자로 변경하시겠습니까?</S.ModalText>
  );
};

// TODO: 함수 분리하기
export const GroupManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [forceRender, setForceRender] = useState({ flag: false });
  const [adminState, setAdminState] = useState<{ message: string; index: number }>({
    message: '',
    index: -1,
  });

  const onModalButtonClick = () => {
    const newShowModal = !showModal;
    setShowModal(newShowModal);
  };

  const showEditModal = (e: React.MouseEvent, index: number) => {
    const text = (e.target as HTMLLIElement).innerText;

    if (text === '팀원에서 제외') {
      setAdminState({ message: '팀원에서 제외', index: index });
    } else if (text === '팀원으로 변경') {
      setAdminState({ message: '팀원으로 변경', index: index });
    } else if (text === '관리자로 변경') {
      setAdminState({ message: '관리자로 변경', index: index });
    }
  };

  const modifyAdminState = async () => {
    if (adminState.index === -1) return;
    if (adminState.message === '팀원에서 제외') {
      await deleteUserById(adminState.index);
      setAdminState({ message: '', index: -1 });
    } else if (adminState.message === '팀원으로 변경') {
      await modifyUserAdminById(adminState.index, TEAMMATE);
      setAdminState({ message: '', index: -1 });
    } else if (adminState.message === '관리자로 변경') {
      await modifyUserAdminById(adminState.index, ADMIN);
      setAdminState({ message: '', index: -1 });
    }
    // TeamItemViewer 강제 렌더링
    setForceRender({ ...forceRender });
  };

  return (
    <S.Container>
      {showModal && (
        <Modal
          shouldConfirm={false}
          title="초대할 사람의 이메일을 입력해주세요."
          visible={true}
          onClose={onModalButtonClick}
        >
          <TeamInviteBar onCloseClick={onModalButtonClick} />
        </Modal>
      )}
      <S.ItemListViewer>
        <TeamItemViewer
          onModalButtonClick={onModalButtonClick}
          showEditModal={showEditModal}
          forceRender={forceRender}
        />
      </S.ItemListViewer>
      {adminState.message !== '' && (
        <Modal
          shouldConfirm={true}
          visible={true}
          onClose={() => setAdminState({ message: '', index: -1 })}
          onClickOk={modifyAdminState}
        >
          {generateMessage(adminState.message)}
        </Modal>
      )}
    </S.Container>
  );
};
