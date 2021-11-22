import React, { useRef } from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanModal from '@/components/KanbanModal';
import { StoryType, StatusType } from '@/types/story';
import { useStoryState } from '@/lib/hooks/useContextHooks';

export interface KanbanDefaultType {
  handleDragStart(e: React.DragEvent<HTMLElement>, order: number, category: StatusType): void;
  handleDragEnter(e: React.DragEvent<HTMLElement>, order: number, category: StatusType): void;
}

const Kanban = () => {
  const draggingRef = useRef<number | null>(0);
  const dragOverRef = useRef<number | null>(0);
  const cateogryRef = useRef<StatusType>('TODO');
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
            draggingRef={draggingRef}
            dragOverRef={dragOverRef}
            categoryRef={cateogryRef}
            category={'TODO'}
            storyList={todoList}
          />
          <KanbanColumn category={'IN_PROGRESS'} storyList={onGoingList} />
          <KanbanColumn category={'DONE'} storyList={finishList} />
        </Styled.ColumnContainer>
      </Styled.Container>
    </KanbanModal>
  );
};

export default Kanban;
