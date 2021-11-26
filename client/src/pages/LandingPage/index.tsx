import React from 'react';
import Button from '@/lib/design/Button';
import { Styled } from './style';
import Logo from '@/lib/design/Logo';

const LandingPage = () => {
  return (
    <Styled.Container>
      <Logo to="/" />
      <img src="https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg?size=626&ext=jpg" />
      <Styled.TextContainer>
        <Styled.Title>일 잘하는 사람들을 위한</Styled.Title>
        <Styled.Title>가장 간편한 협업 툴</Styled.Title>
      </Styled.TextContainer>
      <Button size="large" category="default" onClick={() => (window.location.href = '/login')}>
        HyupUp 시작하기
      </Button>
      <Styled.TextContainer>
        <Styled.Body>
          로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,
        </Styled.Body>
        <Styled.Body>서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.</Styled.Body>
      </Styled.TextContainer>
      <a href="http://www.freepik.com">
        <Styled.Body>Designed by vectorjuice / Freepik</Styled.Body>
      </a>
    </Styled.Container>
  );
};

export default LandingPage;
