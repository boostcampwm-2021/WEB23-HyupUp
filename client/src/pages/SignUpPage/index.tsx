import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import whiteAdd from '@public/icons/white-add.svg';
import { Button } from '@/lib/design';
import * as S from './style';
import user from '@/recoil/user';
import { errorMessage } from '@/lib/common/message';
import { signUp } from '@/lib/api/user';
import { UserState } from '@/contexts/userContext';
import { taskSortByUpdate } from '@/lib/utils/sort';

export const SignUpPage = () => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const setUserState = useSetRecoilState(user);

  const createUserByInput = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== checkPassword) {
      setPassword('');
      setCheckPassword('');
      toast.error(errorMessage.CREATE_USER_PW);
      return;
    }
    const userData = (await signUp(name, job, email, password, organization)) as UserState;
    if (userData.id) {
      userData.privateTasks!.sort((a, b) => taskSortByUpdate(a, b));
      userData.projectTasks!.sort((a, b) => taskSortByUpdate(a, b));
    }
    setUserState(userData);
  };
  return (
    <S.Container>
      <S.Title to="/">HyupUp</S.Title>
      <S.AvatarContainer>
        <S.Avatar></S.Avatar>
        <S.AddBtn>
          <img src={whiteAdd} />
        </S.AddBtn>
      </S.AvatarContainer>
      <S.FormBox onSubmit={createUserByInput}>
        <S.InputBox
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></S.InputBox>
        <S.InputBox
          placeholder="직무"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        ></S.InputBox>
        <S.InputBox
          placeholder="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></S.InputBox>
        <S.InputBox
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></S.InputBox>
        <S.InputBox
          placeholder="비밀번호를 다시 입력해주세요"
          type="password"
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        ></S.InputBox>
        <S.InputBox
          placeholder="조직 이름"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        ></S.InputBox>
        <Button category="default" size="large">
          HyupUp 시작하기
        </Button>
      </S.FormBox>
    </S.Container>
  );
};
