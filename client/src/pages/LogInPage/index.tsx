import React from 'react';
import Button from '@/lib/design/Button';
import { Styled } from './style';
import { LogInForm } from '@/components/LogInForm';
import { useHistory } from 'react-router-dom';
import { sudoLogIn } from '@/lib/api/user';
import { UserState } from '@/contexts/userContext';
import { taskSortByUpdate } from '@/lib/utils/sort';
import userAtom from '@/recoil/user';
import { useSetRecoilState } from 'recoil';

const LogInPage = () => {
  const history = useHistory();
  const setUserState = useSetRecoilState(userAtom);

  const onClickSignIn = () => {
    history.push('/signup');
  };

  const onClickSudoSignIn = async () => {
    const userData = (await sudoLogIn()) as UserState;
    if (userData.id) {
      userData.privateTasks!.sort((a, b) => taskSortByUpdate(a, b));
      userData.projectTasks!.sort((a, b) => taskSortByUpdate(a, b));
    }
    setUserState(userData);
  };

  return (
    <Styled.Container>
      <Styled.LogoContainer>
        <Styled.Logo to="/">HyupUp</Styled.Logo>
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
