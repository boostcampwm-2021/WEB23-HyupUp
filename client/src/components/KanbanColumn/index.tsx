import React from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { StatusType, StoryType } from '@/types/story';

interface KanbanType {
  storyList: Array<StoryType>;
  category: StatusType;
  draggingItem: React.MutableRefObject<number | null>;
  dragOverItem: React.MutableRefObject<number | null>;
  categoryRef: React.MutableRefObject<StatusType>;
}

const KanbanColumn = ({
  category,
  storyList,
  draggingItem,
  dragOverItem,
  categoryRef,
}: KanbanType) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLElement>,
    order: number,
    category: StatusType,
  ) => {
    draggingItem.current = order;
    categoryRef.current = category;
    // test.current = Number(e.currentTarget.dataset.key);
  };

  return (
    <Styled.Column>
      <h4>{category}</h4>
      {storyList?.map((story) => (
        <KanbanItem
          key={story.id}
          story={story}
          handleDragStart={handleDragStart}
          // handleDragEnter={handleDragEnter}
        />
      ))}
      <KanbanAddBtn />
    </Styled.Column>
  );
};

export default KanbanColumn;
