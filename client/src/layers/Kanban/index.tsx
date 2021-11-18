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
  const draggingItem = useRef<number | null>(0);
  const dragOverItem = useRef<number | null>(0);
  const cateogryRef = useRef<StatusType>('TODO');
  const test = useRef<number | null>(0);
  const storyList: StoryType[] = useStoryState();

  const todoList = storyList
    .filter((item) => item.status === 'TODO')
    .sort((a, b) => a.order - b.order);
  const onGoingList = storyList
    .filter((item) => item.status === 'IN_PROGRESS')
    .sort((a, b) => a.order - b.order);
  const finishList = storyList
    .filter((item) => item.status === 'DONE')
    .sort((a, b) => a.order - b.order);

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
            draggingItem={draggingItem}
            dragOverItem={dragOverItem}
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
