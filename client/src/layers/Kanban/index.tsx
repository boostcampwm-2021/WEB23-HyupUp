import React, { useRef } from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanModal from '@/components/KanbanModal';
import { StoryType } from '@/types/story';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';

interface KanbanProps {
  projectId?: number;
}

const Kanban = ({ projectId }: KanbanProps) => {
  const storyList: Array<StoryType> = useStoryState();
  const dispatchStory = useStoryDispatch();
  const draggingItem = useRef<number | null>(0);
  const dragoverItem = useRef<number | null>(0);

  const handleDragStart = (e: React.SyntheticEvent<HTMLElement>, position: number) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (e: React.SyntheticEvent<HTMLElement>, position: number) => {
    dragoverItem.current = position;
    const listCopy = [...storyList] as [StoryType];

    const draggingItemContent = listCopy[draggingItem.current as number];
    listCopy.splice(draggingItem.current as number, 1);
    listCopy.splice(dragoverItem.current as number, 0, draggingItemContent);

    draggingItem.current = dragoverItem.current;
    dragoverItem.current = null;
    dispatchStory({ type: 'LOAD_STORY', stories: listCopy });
  };

  return (
    <KanbanModal>
      <Styled.Container>
        <Styled.Title>프로젝트 칸반보드</Styled.Title>
        <Styled.ColumnContainer>
          <KanbanColumn
            storyList={storyList}
            projectId={projectId}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
          />
          <KanbanColumn
            storyList={storyList}
            projectId={projectId}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
          />
          <KanbanColumn
            storyList={storyList}
            projectId={projectId}
            handleDragStart={handleDragStart}
            handleDragEnter={handleDragEnter}
          />
        </Styled.ColumnContainer>
      </Styled.Container>
    </KanbanModal>
  );
};

export default Kanban;
