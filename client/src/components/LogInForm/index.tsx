import { logIn } from '@/lib/api/user';
import { Button } from '@/lib/design';
import React from 'react';
import user from '@/recoil/user';
import { useSetRecoilState } from 'recoil';
import * as S from './style';
import { UserState } from '@/contexts/userContext';
import { useInput } from '@/lib/hooks';

export const LogInForm = () => {
  const setUserState = useSetRecoilState(user);

  const { value: email, onChange: onChangeEmail, onReset: onResetEmail } = useInput('');
  const { value: password, onChange: onChangePassword, onReset: onResetPassword } = useInput('');

  const onLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = (await logIn(email, password)) as UserState;
    setUserState(userData);
    onResetEmail();
    onResetPassword();
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
