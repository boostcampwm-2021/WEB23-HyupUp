import React, { useState } from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { StatusType, KanbanType, StoryType } from '@/types/story';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';

const KanbanColumn = ({
  category,
  storyList,
  draggingRef,
  dragOverRef,
  categoryRef,
}: KanbanType) => {
  const [isTopEnter, setTopEnter] = useState(false);
  const dispatchStory = useStoryDispatch();
  const handleDragStart = (
    e: React.DragEvent<HTMLElement>,
    order: number,
    category: StatusType,
  ) => {
    draggingRef.current = order;
    categoryRef.current = category;
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLElement>,
    order: number,
    category: StatusType,
  ) => {
    dragOverRef.current = order;
    const dragOverItem = storyList.find((v) => v.id === dragOverRef.current);
    // TODO immerJS 를 통해서 새로운 배열을 만들고, 이에 대해서 update 하는 함수
    // draggingRef.current = dragOverRef.current;
  };

  console.log(storyList);
  const handleDragDrop = (
    e: React.DragEvent<HTMLElement>,
    order?: number,
    category: StatusType,
  ) => {
    const toBeChangeItem = storyList.find((v) => v.order === draggingRef.current);
    const dragOverOrderList = storyList
      .map((v) => Number(v.order))
      .filter((v) => v >= Number(dragOverRef.current))
      .slice(0, 2);
    const averageOrder = dragOverOrderList.reduce((prev, cur) => prev + cur, 0) / 2;
    if (!toBeChangeItem) return;
    dispatchStory({ type: 'UPDATE_STORY', story: { ...toBeChangeItem, order: averageOrder } });
    draggingRef.current = null;
    dragOverRef.current = null;
  };

  return (
    <Styled.Column
      onDragEnter={() => setTopEnter((isTopEnter) => !isTopEnter)}
      onDragLeave={() => setTopEnter(false)}
      onDrop={() => handleDragDrop}
    >
      <Styled.KanBanColumnTitle
        onDragEnter={() => setTopEnter((isTopEnter) => !isTopEnter)}
        onDragLeave={() => setTopEnter(false)}
        isTopEnter={isTopEnter}
      >
        {category}
      </Styled.KanBanColumnTitle>
      {storyList?.map((story) => (
        <KanbanItem
          key={story.id}
          story={story}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragDrop={handleDragDrop}
        />
      ))}
      {category === 'TODO' && <KanbanAddBtn />}
    </Styled.Column>
  );
};

export default KanbanColumn;
