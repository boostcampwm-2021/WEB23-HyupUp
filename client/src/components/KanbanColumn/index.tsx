import React from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { StatusType, StoryType } from '@/types/story';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';
interface KanbanType {
  storyList: Array<StoryType>;
  category: StatusType;
  draggingRef: React.MutableRefObject<number | null>;
  dragOverRef: React.MutableRefObject<number | null>;
  categoryRef: React.MutableRefObject<StatusType>;
}

const KanbanColumn = ({
  category,
  storyList,
  draggingRef,
  dragOverRef,
  categoryRef,
}: KanbanType) => {
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
    const draggingItem = storyList.filter((v) => v.order === draggingRef.current)[0];
    const dragOverItem = storyList.filter((v) => v.order === dragOverRef.current)[0];
    dispatchStory({ type: 'UPDATE_STORY', story: { ...draggingItem, order: dragOverItem.order } });
    dispatchStory({ type: 'UPDATE_STORY', story: { ...dragOverItem, order: draggingItem.order } });
    draggingRef.current = dragOverRef.current;
    dragOverRef.current = null;
  };

  return (
    <Styled.Column>
      <h4>{category}</h4>
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
