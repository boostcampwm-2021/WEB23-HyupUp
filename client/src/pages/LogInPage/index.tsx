import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@/lib/design/Button';
import { Styled } from './style';
import { LogInForm } from '@/components/LogInForm';
import Logo from '@/lib/design/Logo';

const LogInPage = () => {
  const history = useHistory();
  const onClickSignIn = () => {
    history.push('/signup');
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
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default LogInPage;
