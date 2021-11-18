import React from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { StatusType, StoryType } from '@/types/story';

interface KanbanProps {
  storyList: Array<StoryType>;
  category: StatusType;
  draggingItem: React.MutableRefObject<number | null>;
}

const KanbanColumn = ({ category, storyList, draggingItem }: KanbanProps) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLElement>,
    position: number,
    category: StatusType,
  ) => {
    draggingItem.current = position;
    console.log(draggingItem.current);
    // dragStartItem.current = category;
    // test.current = Number(e.currentTarget.dataset.key);
  };

  return (
    <Styled.Column>
      <h4>{category}</h4>
      {storyList?.map((story, index) => (
        <KanbanItem
          key={story.id}
          index={index}
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
