import React from 'react';
import styled from 'styled-components';
import Header from '@/layers/Header';
import TodoInputBar from '@/components/TodoInputBar';
import ListView from '@/layers/ListView';
import CoworkerStatus from '@/layers/CoworkerStatus';

const MainPage = () => {
  return (
    <>
      <Header />
      <ContentContainer>
        <div>
          <TodoInputBar />
          <ListView />
        </div>
        <CoworkerStatus />
      </ContentContainer>
    </>
  );
};

export default MainPage;

const ContentContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;