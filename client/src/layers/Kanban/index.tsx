import React, { useRef } from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanModal from '@/components/KanbanModal';
import { StatusType } from '@/types/story';

const Kanban = () => {
  const draggingRef = useRef<number | null>(0);
  const dragOverRef = useRef<number | null>(0);
  const draggingCategory = useRef<StatusType>('TODO');
  const dragOverCateogry = useRef<StatusType>('TODO');

  return (
    <KanbanModal>
      <Styled.Container>
        <Styled.Title>프로젝트 칸반보드</Styled.Title>
        <Styled.ColumnContainer>
          <KanbanColumn
            category={'TODO'}
            draggingRef={draggingRef}
            dragOverRef={dragOverRef}
            draggingCategory={draggingCategory}
            dragOverCategory={dragOverCateogry}
          />
          <KanbanColumn
            category={'IN_PROGRESS'}
            draggingRef={draggingRef}
            dragOverRef={dragOverRef}
            draggingCategory={draggingCategory}
            dragOverCategory={dragOverCateogry}
          />
          <KanbanColumn
            category={'DONE'}
            draggingRef={draggingRef}
            dragOverRef={dragOverRef}
            draggingCategory={draggingCategory}
            dragOverCategory={dragOverCateogry}
          />
        </Styled.ColumnContainer>
      </Styled.Container>
    </KanbanModal>
  );
};

export default Kanban;
