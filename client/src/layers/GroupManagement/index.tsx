import React, { useEffect, useState } from 'react';
import * as S from './style';
import { Modal } from '@/lib/design';

import {
  deleteUserById,
  getUsersByOrganization,
  modifyUserAdminById,
  UserProfile,
} from '@/lib/api/user';
import TeamInviteBar from '@/components/TeamInviteBar';
import { TeamItemViewer } from '@/components/TeamItemViewer';
import userAtom from '@/recoil/user';
import { useRecoilValue } from 'recoil';

const ADMIN = true;
const TEAMMATE = false;

const generateMessage = (message: string) => {
  switch (message) {
    case '팀원에서 제외':
      return <S.ModalText>정말로 팀원에서 제외하겠습니까?</S.ModalText>;
    case '팀원으로 변경':
      return <S.ModalText>정말 팀원으로 변경하시겠습니까?</S.ModalText>;
    default:
      return <S.ModalText>정말 관리자로 변경하시겠습니까?</S.ModalText>;
  }
};

// TODO: 함수 분리하기
export const GroupManagement = () => {
  const userState = useRecoilValue(userAtom);
  const [showModal, setShowModal] = useState(false);
  const [userList, setUserList] = useState<Array<UserProfile>>([]);
  const [adminState, setAdminState] = useState<{ message: string; id: number }>({
    message: '',
    id: 0,
  });

  useEffect(() => {
    (async () => {
      const newUserList = await getUsersByOrganization(userState.organization as number);
      setUserList(newUserList.filter((el) => el.index !== userState.id));
    })();
  }, [userState.id, userState.organization]);

  const onModalButtonClick = () => {
    const newShowModal = !showModal;
    setShowModal(newShowModal);
  };

  const showEditModal = (e: React.MouseEvent, id: number) => {
    const text = (e.target as HTMLLIElement).innerText;
    switch (text) {
      case '팀원에서 제외':
        setAdminState({ message: '팀원에서 제외', id: id });
        break;
      case '팀원으로 변경':
        setAdminState({ message: '팀원으로 변경', id: id });
        break;
      default:
        setAdminState({ message: '관리자로 변경', id: id });
        break;
    }
  };

  const modifyAdminState = async () => {
    if (!adminState.id) return;
    switch (adminState.message) {
      case '팀원에서 제외':
        setUserList(userList.filter((el) => el.index === adminState.id));
        await deleteUserById(adminState.id);
        setAdminState({ message: '', id: 0 });
        break;
      case '팀원으로 변경':
        setUserList(
          userList.map((el) => (el.index === adminState.id ? { ...el, admin: false } : el)),
        );
        await modifyUserAdminById(adminState.id, TEAMMATE);
        setAdminState({ message: '', id: 0 });
        break;
      default:
        setUserList(
          userList.map((el) => (el.index === adminState.id ? { ...el, admin: true } : el)),
        );
        await modifyUserAdminById(adminState.id, ADMIN);
        setAdminState({ message: '', id: 0 });
        break;
    }
  };

  return (
    <S.Container>
      {
        <Modal
          shouldConfirm={false}
          title="초대할 사람의 이메일을 입력해주세요."
          visible={showModal}
          onClose={onModalButtonClick}
        >
          <TeamInviteBar onCloseClick={onModalButtonClick} />
        </Modal>
      }
      <S.ItemListViewer>
        <TeamItemViewer
          onModalButtonClick={onModalButtonClick}
          showEditModal={showEditModal}
          userProfileList={userList}
        />
      </S.ItemListViewer>
      {adminState.message !== '' && (
        <Modal
          shouldConfirm={true}
          visible={true}
          onClose={() => setAdminState({ message: '', id: 0 })}
          onClickOk={modifyAdminState}
        >
          {generateMessage(adminState.message)}
        </Modal>
      )}
    </S.Container>
  );
};
