import React from 'react';
import Styled from '@/components/Kanban/style';

const Kanban = () => {
  return (
    <Styled.Container>
      <Styled.Title>프로젝트 칸반보드</Styled.Title>
      <Styled.ColumnContainer>
        <Styled.Column></Styled.Column>
        <Styled.Column></Styled.Column>
        <Styled.Column></Styled.Column>
      </Styled.ColumnContainer>
    </Styled.Container>
  );
};

export default Kanban;
