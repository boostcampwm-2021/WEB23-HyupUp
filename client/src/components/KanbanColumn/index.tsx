import React from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { StoryType } from '@/types/story';
interface KanbanProps {
  storyList: Array<StoryType>;
  handleDragStart: (e: React.SyntheticEvent<HTMLElement>, position: number) => void;
  handleDragEnter: (e: React.SyntheticEvent<HTMLElement>, position: number) => void;
  projectId?: number;
}

const KanbanColumn = ({ storyList, handleDragStart, handleDragEnter, projectId }: KanbanProps) => {
  return (
    <Styled.Column>
      <h4>To do</h4>
      {storyList?.map((story, index) => (
        <KanbanItem
          key={story.id}
          index={index}
          story={story}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
        />
      ))}
      <KanbanAddBtn projectId={projectId} />
    </Styled.Column>
  );
};

export default KanbanColumn;
