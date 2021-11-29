import React, { useRef } from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanModal from '@/components/KanbanColumn/KanbanDeleteModal';
import { StatusType } from '@/types/story';
import { useSocketReceive } from '@/lib/hooks';
import { getStoryById, updateStoryWithId } from '@/lib/api/story';

const Kanban = () => {
  const dragRef = useRef<number | null>(0);
  const dragOverRef = useRef<number | null>(0);
  const dragCategory = useRef<StatusType>('TODO');
  const dragOverCateogry = useRef<StatusType>('TODO');

  useSocketReceive('NEW_STORY', async (storyId: number) => {
    console.log('잘 받았아요');
    const data = await getStoryById(storyId);
  });

  return (
    <KanbanModal>
      <Styled.Container>
        <Styled.Title>프로젝트 칸반보드</Styled.Title>
        <Styled.ColumnContainer>
          {[
            { category: 'TODO', id: 0 },
            { category: 'IN_PROGRESS', id: 1 },
            { category: 'DONE', id: 2 },
          ].map((value) => (
            <KanbanColumn
              key={value.id}
              category={value.category as StatusType}
              dragRef={dragRef}
              dragOverRef={dragOverRef}
              dragCategory={dragCategory}
              dragOverCategory={dragOverCateogry}
            />
          ))}
        </Styled.ColumnContainer>
      </Styled.Container>
    </KanbanModal>
  );
};

export default Kanban;
