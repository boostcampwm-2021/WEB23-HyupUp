import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { Modal } from '@/lib/design';
import * as S from './style';
import userAtom from '@/recoil/user';
import { errorMessage } from '@/lib/common/message';
import { NewUser, signUp } from '@/lib/api/user';
import { UserState } from '@/contexts/userContext';
import { taskSortByUpdate } from '@/lib/utils/sort';
import { searchOrganizationByName } from '@/lib/api/organization';
import AvatarForm from '@/components/AvatarForm';
import SignUpForm from '@/components/SignUpForm';

const SignUpPage = ({ token }: { token: string }) => {
  const { room, email }: { room: string; email: string } =
    token !== '' ? jwt_decode(token) : { room: '', email: '' };
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    job: '',
    email: email,
    password: '',
    checkPassword: '',
    organization: room,
    imageURL: '',
  });
  const setUserState = useSetRecoilState(userAtom);

  const [gender, setGender] = useState('Boy');
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [context, setContext] = useState('');

  const createUserByInput = async () => {
    if (newUser.password !== newUser.checkPassword) {
      setNewUser(() => ({ ...newUser, checkPassword: '', password: '' }));
      toast.error(errorMessage.CREATE_USER_PW);
      return;
    }

    const nowShowModal = showModal;
    setShowModal(!nowShowModal);

    if (!nowShowModal) return;
    const userData = (await signUp({
      ...newUser,
      imageURL: `${gender}${avatarIndex}`,
    })) as UserState;
    if (userData.id) {
      userData.privateTasks!.sort((a, b) => taskSortByUpdate(a, b));
      userData.projectTasks!.sort((a, b) => taskSortByUpdate(a, b));
    }
    setUserState(userData);
  };

  const checkOrganizationByName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await searchOrganizationByName(newUser.organization);
    status === 200
      ? setContext(`${newUser.organization}에 참여하시겠습니까?`)
      : setContext(`${newUser.organization}을 만드시겠습니까?`);
    setShowModal(true);
  };

  return (
    <S.Container>
      <Modal
        shouldConfirm={true}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onClickCancel={() => setShowModal(false)}
        onClickOk={() => createUserByInput()}
      >
        <S.Text> {context}</S.Text>
      </Modal>
      <S.Title to="/">HyupUp</S.Title>
      <AvatarForm
        gender={gender}
        avatarIndex={avatarIndex}
        setGender={setGender}
        setAvatarIndex={setAvatarIndex}
      />
      <SignUpForm
        token={token}
        checkOrganizationByName={checkOrganizationByName}
        newUser={newUser}
        setNewUser={setNewUser}
      />
    </S.Container>
  );
};

export default SignUpPage;
