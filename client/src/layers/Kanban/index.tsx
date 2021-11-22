import React, { useRef } from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanModal from '@/components/KanbanModal';
import { StoryType, StatusType } from '@/types/story';
import { useStoryState } from '@/lib/hooks/useContextHooks';

const Kanban = () => {
  const draggingRef = useRef<number | null>(0);
  const dragOverRef = useRef<number | null>(0);
  const draggingCategory = useRef<StatusType>('TODO');
  const dragOverCateogry = useRef<StatusType>('TODO');
  const storyList: StoryType[] = useStoryState();

  const todoList = storyList
    .filter((item) => item.status === 'TODO')
    .sort((a, b) => Number(a.order) - Number(b.order));
  const onGoingList = storyList
    .filter((item) => item.status === 'IN_PROGRESS')
    .sort((a, b) => Number(a.order) - Number(b.order));
  const finishList = storyList
    .filter((item) => item.status === 'DONE')
    .sort((a, b) => Number(a.order) - Number(b.order));

  return (
    <KanbanModal>
      <Styled.Container>
        <Styled.Title>프로젝트 칸반보드</Styled.Title>
        <Styled.ColumnContainer>
          <KanbanColumn
            category={'TODO'}
            storyList={todoList}
            draggingRef={draggingRef}
            dragOverRef={dragOverRef}
            draggingCategory={draggingCategory}
            dragOverCategory={dragOverCateogry}
          />
          <KanbanColumn
            category={'IN_PROGRESS'}
            storyList={onGoingList}
            draggingRef={draggingRef}
            dragOverRef={dragOverRef}
            draggingCategory={draggingCategory}
            dragOverCategory={dragOverCateogry}
          />
          <KanbanColumn
            category={'DONE'}
            storyList={finishList}
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
