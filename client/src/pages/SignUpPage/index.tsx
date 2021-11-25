import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { Button, Modal } from '@/lib/design';
import rightArrow from '@public/icons/arrow-right.svg';
import * as S from './style';
import userAtom from '@/recoil/user';
import { errorMessage } from '@/lib/common/message';
import { NewUser, signUp } from '@/lib/api/user';
import { UserState } from '@/contexts/userContext';
import { taskSortByUpdate } from '@/lib/utils/sort';
import { searchOrganizationByName } from '@/lib/api/organization';
import avatar, { ImageType } from '@/lib/common/avatar';

const MAXINDEX = 16;

const SignUpPage = ({ roomName }: { roomName: string }) => {
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    job: '',
    email: '',
    password: '',
    checkPassword: '',
    organization: roomName,
    imageURL: '',
  });
  const setUserState = useSetRecoilState(userAtom);

  const [gender, setGender] = useState('Boy');
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [context, setContext] = useState('');
  const changeGender = () => (gender === 'Boy' ? setGender('Girl') : setGender('Boy'));

  const clickLeft = () =>
    !avatarIndex ? setAvatarIndex(MAXINDEX) : setAvatarIndex(() => avatarIndex - 1);

  const clickRight = () =>
    avatarIndex === MAXINDEX ? setAvatarIndex(0) : setAvatarIndex(() => avatarIndex + 1);

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
      <S.AvatarSelectContainer>
        <button onClick={clickLeft}>
          <S.LeftArrow src={rightArrow} color="red" />
        </button>
        <S.AvatarContainer>
          <S.Avatar src={avatar[`${gender}${avatarIndex}` as unknown as ImageType]}></S.Avatar>
          <Button type="button" category="default" size="small" onClick={changeGender}>
            {gender}
          </Button>
        </S.AvatarContainer>
        <button onClick={clickRight}>
          <S.RightArrow src={rightArrow} alt="" />
        </button>
      </S.AvatarSelectContainer>
      <S.FormBox onSubmit={checkOrganizationByName}>
        <S.InputBox
          placeholder="이름"
          value={newUser.name}
          onChange={(e) => setNewUser(() => ({ ...newUser, name: e.target.value }))}
        ></S.InputBox>
        <S.InputBox
          placeholder="직무"
          value={newUser.job}
          onChange={(e) => setNewUser(() => ({ ...newUser, job: e.target.value }))}
        ></S.InputBox>
        <S.InputBox
          placeholder="이메일"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser(() => ({ ...newUser, email: e.target.value }))}
        ></S.InputBox>
        <S.InputBox
          placeholder="비밀번호"
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser(() => ({ ...newUser, password: e.target.value }))}
        ></S.InputBox>
        <S.InputBox
          placeholder="비밀번호를 다시 입력해주세요"
          type="password"
          value={newUser.checkPassword}
          onChange={(e) => setNewUser(() => ({ ...newUser, checkPassword: e.target.value }))}
        ></S.InputBox>
        <S.InputBox
          placeholder="조직 이름"
          value={newUser.organization}
          onChange={(e) => setNewUser(() => ({ ...newUser, organization: e.target.value }))}
        ></S.InputBox>
        <Button category="default" size="large">
          HyupUp 시작하기
        </Button>
      </S.FormBox>
    </S.Container>
  );
};

export default SignUpPage;
