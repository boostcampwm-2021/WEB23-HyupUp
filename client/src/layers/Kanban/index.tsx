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

type StoryAction = Dispatch<{ type: 'UPDATE_STORY'; story: StoryType }>;

// 길이가 2 일 때, 마지막 id 를 1 로 바꿔준다
// 길이가 2 가 넘을 때 마지막을 1 로, 마지막 - 1 을(마지막 - 2) 번째 요소 + 1 // 2 한 값으로 order 를 초기화
const sortListByOrder = (todoList: StoryType[], dispatchStory: StoryAction) => {
  if (todoList.length === 2) {
    dispatchStory({ type: 'UPDATE_STORY', story: { ...todoList[1], order: 1 } });
    return;
  } else {
    dispatchStory({
      type: 'UPDATE_STORY',
      story: { ...todoList[todoList.length - 2], order: todoList[todoList.length - 3] + 1 / 2 },
    });
    dispatchStory({
      type: 'UPDATE_STORY',
      story: { ...todoList[todoList.length - 1], order: 1 },
    });
  }
};

// 새로운 아이템을 추가할 때 활용되기 위한 함수
// 길이가 0 또는 1 이라면 그대로 반환
// 길이가 2 인데 둘 다 0 이라면 마지막 요소의 order 를 1 로 변경
const isOrdered = (storyList: StoryType[]) => {
  if (storyList.length < 2) return false;
  if (storyList.length === 2 && storyList.filter((v) => v.order > 0).length !== 0) return true;
  // 소수점을 0 과 같다고 할 수 있을지?
  if (storyList.length > 2 && storyList.map((v) => v.order).filter((v) => v === 0).length > 1)
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

  if (isOrdered(todoList)) sortListByOrder(todoList, dispatchStory);
  console.log(todoList);
  // shouldSort
  // const
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
