import React from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { StatusType, StoryType } from '@/types/story';
import { KanbanDefaultType } from '@/layers/Kanban';
interface KanbanProps extends KanbanDefaultType {
  storyList: Array<StoryType>;
  category: StatusType;
}

const KanbanColumn = ({ category, storyList, handleDragStart, handleDragEnter }: KanbanProps) => {
  return (
    <Styled.Column>
      <h4>{category}</h4>
      {storyList?.map((story, index) => (
        <KanbanItem
          key={story.id}
          index={index}
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
