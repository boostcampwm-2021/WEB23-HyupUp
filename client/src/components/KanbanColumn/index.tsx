import React, { useState } from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { StatusType, KanbanType } from '@/types/story';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';

const KanbanColumn = ({
  category,
  storyList,
  draggingRef,
  dragOverRef,
  categoryRef,
}: KanbanType) => {
  const [isTopEnter, setTopEnter] = useState(false);
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
    // 바닥에 파란색 선이 나타나도록 작성
    const dragOverItem = storyList.find((v) => v.id === dragOverRef.current);
    // TODO immerJS 를 통해서 새로운 배열을 만들고, 이에 대해서 update 하는 함수
    draggingRef.current = dragOverRef.current;
    dragOverRef.current = null;
  };

  return (
    <Styled.Column>
      <h4
        onDragEnter={() => setTopEnter((isTopEnter) => !isTopEnter)}
        onDragLeave={() => setTopEnter(false)}
      >
        {category}
      </h4>
      {storyList?.map((story) => (
        <KanbanItem
          key={story.id}
          story={story}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
        />
      ))}
      <KanbanAddBtn />
    </Styled.Column>
  );
};

export default KanbanColumn;
