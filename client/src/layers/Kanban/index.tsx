import React from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanModal from '@/components/KanbanModal';

interface KanbanProps {
  projectId?: number;
}

const Kanban = ({ projectId }: KanbanProps) => {
  return (
    <KanbanModal>
      <Styled.Container>
        <Styled.Title>프로젝트 칸반보드</Styled.Title>
        <Styled.ColumnContainer>
          <KanbanColumn projectId={projectId} />
          <KanbanColumn projectId={projectId} />
          <KanbanColumn projectId={projectId} />
        </Styled.ColumnContainer>
      </Styled.Container>
    </KanbanModal>
  );
};

export default Kanban;
