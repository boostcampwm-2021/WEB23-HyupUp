import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  height: 100vh;
`;

const Logo = styled.p`
  font: ${theme.font.display_medium};
`;

const Title = styled.p`
  margin: 5px;

  font: ${theme.font.display_large};
`;

const Body = styled.p`
  margin: 5px;

  color: #8993a1;

  font: ${theme.font.body_regular};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const LandingPage = () => {
  return (
    <Container>
      <Logo>HyupUp</Logo>
      <img src="https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg?size=626&ext=jpg" />
      <TextContainer>
        <Title>일 잘하는 사람들을 위한</Title>
        <Title>가장 간편한 협업 툴</Title>
      </TextContainer>
      <button></button>
      <TextContainer>
        <Body>로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,</Body>
        <Body>서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.</Body>
      </TextContainer>
      <a href="http://www.freepik.com">
        <Body>Designed by vectorjuice / Freepik</Body>
      </a>
    </Container>
  );
};

export default LandingPage;
