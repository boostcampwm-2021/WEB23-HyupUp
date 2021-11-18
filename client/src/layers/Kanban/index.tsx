import React, { useEffect, useRef, Dispatch } from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanModal from '@/components/KanbanModal';
import { StoryType, StatusType } from '@/types/story';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';

export interface KanbanDefaultType {
  handleDragStart(e: React.DragEvent<HTMLElement>, position: number, category: StatusType): void;
  handleDragEnter(e: React.DragEvent<HTMLElement>, position: number, category: StatusType): void;
}

type StoryAction = Dispatch<{ type: 'UPDATE_STORY'; story: StoryType }>;

const sortListByOrder = (todoList: StoryType[], dispatchStory: StoryAction) => {
  if (todoList.length === 2) {
    dispatchStory({ type: 'UPDATE_STORY', story: { ...todoList[0], order: 0 } });
    return;
  } else {
    dispatchStory({
      type: 'UPDATE_STORY',
      story: {
        ...todoList[todoList.length - 2],
        order: todoList[todoList.length - 3].order + 1 / 2,
      },
    });
  }
};

const isOrdered = (todoList: StoryType[]) => {
  if (todoList.length < 2 && todoList.filter((v) => v.status)) return false;
  if (todoList.length === 2 && todoList.filter((v) => Number(v.order) === 1).length == 2) {
    return true;
  }
  if (todoList.length > 2 && todoList.map((v) => v.order).filter((v) => v === 1).length > 1)
    return true;
  return false;
};

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

  useEffect(() => {
    const filteredList = storyList.filter((v) => v.status === 'TODO');
    if (isOrdered(filteredList)) sortListByOrder(filteredList, dispatchStory);
  }, [dispatchStory, storyList]);

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
