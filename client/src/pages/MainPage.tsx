import React from 'react';
import styled from 'styled-components';
import Header from '@/lib/common/Header';
import TodoInputBar from '@/components/TodoInputBar';
import CoworkerStatus from '@/components/CoworkerStatus';

const MainPage = () => {
  return (
    <>
      <Header />
      <ContentContainer>
        <TodoInputBar />
        <CoworkerStatus />
      </ContentContainer>
    </>
  );
};

export default MainPage;

const ContentContainer = styled.div`
  width: 1140px;
  height: 883px;

  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
