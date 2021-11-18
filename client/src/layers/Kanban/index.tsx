import React, { useRef, Dispatch } from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanModal from '@/components/KanbanModal';
import { StoryType, StatusType } from '@/types/story';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';

export interface KanbanDefaultType {
  handleDragStart(e: React.DragEvent<HTMLElement>, position: number, category: StatusType): void;
  handleDragEnter(e: React.DragEvent<HTMLElement>, position: number, category: StatusType): void;
}

const Kanban = () => {
  const draggingItem = useRef<number | null>(0);
  const dragoverItem = useRef<number | null>(0);
  const dragStartItem = useRef<string | null>('');
  const test = useRef<number | null>(0);
  const dispatchStory = useStoryDispatch();
  const storyList: StoryType[] = useStoryState();

  const todoList = storyList.filter((item) => item.status === 'TODO');
  const onGoingList = storyList.filter((item) => item.status === 'IN_PROGRESS');
  const finishList = storyList.filter((item) => item.status === 'DONE');

  // const handleDragStart = (
  //   e: React.DragEvent<HTMLElement>,
  //   position: number,
  //   category: StatusType,
  // ) => {
  //   draggingItem.current = position;
  //   dragStartItem.current = category;
  //   test.current = Number(e.currentTarget.dataset.key);
  // };

  // const handleDragEnter = (
  //   e: React.DragEvent<HTMLElement>,
  //   position: number,
  //   category: StatusType,
  // ) => {
  //   dragoverItem.current = position;
  //   const listCopy = [...storyList] as [StoryType];
  //   const draggingItemContent = listCopy[draggingItem.current as number];

  //   if (category !== dragStartItem.current)
  //     dispatchStory({
  //       type: 'UPDATE_STORY',
  //       story: {
  //         id: test.current as number,
  //         name: storyList.filter((v) => v.id === test.current)[0]?.name,
  //         status: category,
  //       },
  //     });
  //   else {
  //     listCopy.splice(draggingItem.current as number, 1);
  //     listCopy.splice(dragoverItem.current as number, 0, draggingItemContent);

  //     draggingItem.current = dragoverItem.current;
  //     dragoverItem.current = null;
  //     dispatchStory({ type: 'LOAD_STORY', stories: listCopy });
  //   }
  // };

  return (
    <KanbanModal>
      <Styled.Container>
        <Styled.Title>프로젝트 칸반보드</Styled.Title>
        <Styled.ColumnContainer>
          <KanbanColumn
            category={'TODO'}
            storyList={todoList}
            // handleDragStart={handleDragStart}
            // handleDragEnter={handleDragEnter}
          />
          <KanbanColumn
            category={'IN_PROGRESS'}
            storyList={onGoingList}
            // handleDragStart={handleDragStart}
            // handleDragEnter={handleDragEnter}
          />
          <KanbanColumn
            category={'DONE'}
            storyList={finishList}
            // handleDragStart={handleDragStart}
            // handleDragEnter={handleDragEnter}
          />
        </Styled.ColumnContainer>
      </Styled.Container>
    </KanbanModal>
  );
};

export default Kanban;
