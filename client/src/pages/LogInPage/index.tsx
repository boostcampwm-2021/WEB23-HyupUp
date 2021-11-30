import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';

import Button from '@/lib/design/Button';
import { Styled } from './style';
import { LogInForm } from '@/components/LogInForm';
import Logo from '@/lib/design/Logo';
import { sudoLogIn } from '@/lib/api/user';
import { UserState } from '@/contexts/userContext';
import userAtom from '@/recoil/user';

const LogInPage = () => {
  const history = useHistory();
  const setUserState = useSetRecoilState(userAtom);

  const onClickSignIn = () => {
    history.push('/signup');
  };

  const onClickSudoSignIn = async () => {
    const userData = (await sudoLogIn()) as UserState;
    if (userData.projects && userData.projects?.length > 0) {
      userData.currentProjectId = userData.projects[0].id;
      userData.currentProjectName = userData.projects[0].name;
    }
    setUserState(userData);
  };

  return (
    <Styled.Container>
      <Styled.LogoContainer>
        <Logo to="/" />
      </Styled.LogoContainer>
      <Styled.ContentContainer>
        <LogInForm />
        <Button category="default" size="large" type="button" onClick={onClickSignIn}>
          HyupUp 회원가입
        </Button>
        <Styled.SudoLogin type="button" onClick={onClickSudoSignIn}>
          TEST 계정으로 시작하기
        </Styled.SudoLogin>
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default LogInPage;
