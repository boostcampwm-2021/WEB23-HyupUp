import React, { useContext } from 'react';
import Button from '@/lib/design/Button';
import { UserContext } from '@/contexts/User';
import { getUser } from '@/lib/api';
import { Body, Container, Logo, TextContainer, Title } from './style';

const LandingPage = () => {
  const { dispatch } = useContext(UserContext);

  const onClickLogin = async (email: string) => {
    // App 의 useEffect로 들어가야할 로직
    const user = await getUser(email);
    dispatch({ type: 'GET_USER', data: user });
  };

  return (
    <Container>
      <Logo>HyupUp</Logo>
      <img src="https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg?size=626&ext=jpg" />
      <TextContainer>
        <Title>일 잘하는 사람들을 위한</Title>
        <Title>가장 간편한 협업 툴</Title>
      </TextContainer>
      <Button
        size="large"
        category="default"
        onClick={() => {
          onClickLogin('test1@gmail.com');
        }}
      >
        Login as Test1
      </Button>
      <Button
        size="large"
        category="default"
        onClick={() => {
          onClickLogin('test2@gmail.com');
        }}
      >
        Login as Test2
      </Button>
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
