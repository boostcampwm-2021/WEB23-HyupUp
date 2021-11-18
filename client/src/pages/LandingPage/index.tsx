import React from 'react';
import Button from '@/lib/design/Button';
import { getUser } from '@/lib/api/user';
import { Styled } from './style';
import { useSetRecoilState } from 'recoil';
import user from '@/recoil/user';
import { taskSortByUpdate } from '@/lib/utils/sort';

const LandingPage = () => {
  const setUserState = useSetRecoilState(user);

  const onClickLogin = async (email: string) => {
    // App 의 useEffect로 들어가야할 로직
    const newUser = await getUser(email);
    if (newUser.id) {
      newUser.privateTasks!.sort((a, b) => taskSortByUpdate(a, b));
      newUser.projectTasks!.sort((a, b) => taskSortByUpdate(a, b));
    }
    setUserState(newUser);
  };

  return (
    <Styled.Container>
      <Styled.Logo>HyupUp</Styled.Logo>
      <img src="https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg?size=626&ext=jpg" />
      <Styled.TextContainer>
        <Styled.Title>일 잘하는 사람들을 위한</Styled.Title>
        <Styled.Title>가장 간편한 협업 툴</Styled.Title>
      </Styled.TextContainer>
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
