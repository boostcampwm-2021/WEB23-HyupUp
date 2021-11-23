import { logIn } from '@/lib/api/user';
import { Button } from '@/lib/design';
import React, { useState } from 'react';
import user from '@/recoil/user';
import { useSetRecoilState } from 'recoil';
import * as S from './style';
import { taskSortByUpdate } from '@/lib/utils/sort';
import { UserState } from '@/contexts/userContext';

export const LogInForm = () => {
  const setUserState = useSetRecoilState(user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = (await logIn(email, password)) as UserState;
    if (userData.id) {
      userData.privateTasks!.sort((a, b) => taskSortByUpdate(a, b));
      userData.projectTasks!.sort((a, b) => taskSortByUpdate(a, b));
    }
    setUserState(userData);
  };
  return (
    <S.LogInFormContainer onSubmit={onLoginSubmit}>
      <S.InputBox
        type="email"
        placeholder="이메일을 입력해주세요"
        value={email}
        onChange={onChangeEmail}
      />
      <S.InputBox
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={onChangePassword}
      />
      <Button category="confirm" size="large">
        HyupUp 시작하기
      </Button>
    </S.LogInFormContainer>
  );
};
