import React from 'react';
import Button from '@/lib/design/Button';
import { Styled } from './style';
import { LogInForm } from '@/components/LogInForm';
import { useHistory } from 'react-router-dom';

const LogInPage = () => {
  const history = useHistory();
  const onClickSignIn = () => {
    history.push('/signup');
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
      </Styled.ContentContainer>
    </Styled.Container>
  );
};

export default LogInPage;
