import React from 'react';
import Styled from '@/components/Kanban/style';
import Button from '@/lib/design/Button';

const Kanban = () => {
  return (
    <Styled.Container>
      <Styled.Title>프로젝트 칸반보드</Styled.Title>
      <Styled.ColumnContainer>
        <Styled.Column>
          <h4>To do</h4>
          <Styled.KanBanItem>
            <input type="text" placeholder="type a todo..." />
          </Styled.KanBanItem>
          <Button size={'large'} category={'cancel'} onClick={() => undefined}>
            Add Todo
          </Button>
        </Styled.Column>
        <Styled.Column>
          <h4>In Progress</h4>
        </Styled.Column>
        <Styled.Column>
          <h4>Done</h4>
        </Styled.Column>
      </Styled.ColumnContainer>
    </Styled.Container>
  );
};

export default Kanban;
