import React from 'react';

import { NewUser } from '@/lib/api/user';
import * as S from './style';
import { Button } from '@/lib/design';

const SignUpForm = ({
  checkOrganizationByName,
  newUser,
  setNewUser,
}: {
  token: string;
  checkOrganizationByName: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  newUser: NewUser;
  setNewUser: React.Dispatch<React.SetStateAction<NewUser>>;
}) => {
  const setUser = (property: { [index: string]: string }) => {
    return setNewUser({ ...newUser, ...property });
  };
  return (
    <S.FormBox onSubmit={checkOrganizationByName}>
      <S.InputBox
        placeholder="이름"
        value={newUser.name}
        onChange={(e) => setUser({ name: e.target.value })}
      ></S.InputBox>
      <S.InputBox
        placeholder="직무"
        value={newUser.job}
        onChange={(e) => setUser({ job: e.target.value })}
      ></S.InputBox>
      <S.InputBox
        placeholder="이메일"
        type="email"
        value={newUser.email}
        onChange={(e) => setUser({ email: e.target.value })}
      ></S.InputBox>
      <S.InputBox
        placeholder="비밀번호"
        type="password"
        value={newUser.password}
        onChange={(e) => setUser({ password: e.target.value })}
      ></S.InputBox>
      <S.InputBox
        placeholder="비밀번호를 다시 입력해주세요"
        type="password"
        value={newUser.checkPassword}
        onChange={(e) => setUser({ checkPassword: e.target.value })}
      ></S.InputBox>
      <S.InputBox
        placeholder="조직 이름"
        value={newUser.organization}
        onChange={(e) => setUser({ organization: e.target.value })}
      ></S.InputBox>
      <Button category="default" size="large">
        HyupUp 시작하기
      </Button>
    </S.FormBox>
  );
};

export default SignUpForm;
