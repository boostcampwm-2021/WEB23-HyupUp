import React, { useState } from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { updateStoryWithId } from '@/lib/api/story';
import { StatusType, KanbanType, dragCategoryType } from '@/types/story';
import { useStoryDispatch, useStoryState } from '@/lib/hooks/useContextHooks';
import { dragToDiffBetween, dragToEqualBetween, dragToEqualTop } from '@/lib/utils/story';

const isEqualCategory = (dragCategory: dragCategoryType, dropCategory: StatusType) => {
  return dragCategory.current === dropCategory;
};

const KanbanColumn = ({
  category,
  dragRef,
  dragOverRef,
  dragCategory,
  dragOverCategory,
}: KanbanType) => {
  const [isTopEnter, setTopEnter] = useState(false);
  const dispatchStory = useStoryDispatch();
  const storyList = useStoryState();
  const filterList = storyList
    .filter((item) => item.status === category)
    .sort((a, b) => Number(a.order) - Number(b.order));

  const isMoveToSameTop = () => isTopEnter && isEqualCategory(dragCategory, category);
  const isMoveToSameBetween = () => !isTopEnter && isEqualCategory(dragCategory, category);
  const isMoveToDiffBetween = () => !isTopEnter && !isEqualCategory(dragCategory, category);
  const handleDragDrop = async (category: StatusType) => {
    if (isMoveToSameTop()) {
      const { firstItem, secondItem } = dragToEqualTop(filterList, dragRef);
      dispatchStory({ type: 'UPDATE_STORY', story: firstItem });
      dispatchStory({ type: 'UPDATE_STORY', story: secondItem });
      await updateStoryWithId(firstItem);
      await updateStoryWithId(secondItem);
      setTopEnter((isTopEnter) => !isTopEnter);
    } else if (isMoveToSameBetween()) {
      const item = dragToEqualBetween(filterList, dragRef, dragOverRef);
      dispatchStory({ type: 'UPDATE_STORY', story: item });
      await updateStoryWithId(item);
    } else if (isMoveToDiffBetween()) {
      const item = dragToDiffBetween(storyList, category, dragCategory, dragRef, dragOverRef);
      dispatchStory({ type: 'UPDATE_STORY', story: item });
      await updateStoryWithId(item);
    }

    // 다른 칼럼 내애 Item 위치 && 최상단 위치
    if (isTopEnter && !isEqualCategory(dragCategory, category)) {
      const toBeChangeItem = storyList
        .filter((v) => v.status === dragCategory.current)
        .find((v) => v.order === dragRef.current);
      const firstnSecondItem = filterList
        .sort((a, b) => Number(a.order) - Number(b.order))
        .slice(0, 2);
      const averageOrder = firstnSecondItem.length > 1 ? Number(firstnSecondItem[1].order) / 2 : 1;

      if (!toBeChangeItem) return;
      dispatchStory({
        type: 'UPDATE_STORY',
        story: { ...toBeChangeItem, status: category, order: 0 },
      });
      await updateStoryWithId({ ...toBeChangeItem, status: category, order: 0 });

      setTopEnter((isTopEnter) => !isTopEnter);
      dragRef.current = null;
      dragOverRef.current = null;

      if (firstnSecondItem.length < 1) return;
      dispatchStory({
        type: 'UPDATE_STORY',
        story: { ...firstnSecondItem[0], order: averageOrder },
      });
      await updateStoryWithId({ ...firstnSecondItem[0], order: averageOrder });
      return;
    }

    dragRef.current = null;
    dragOverRef.current = null;
  };

  return (
    <Styled.Column>
      <Styled.KanBanColumnTitle
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setTopEnter((isTopEnter) => !isTopEnter)}
        onDragLeave={() => setTopEnter(false)}
        onDrop={() => handleDragDrop(category)}
        isTopEnter={isTopEnter}
      >
        {category}
      </Styled.KanBanColumnTitle>
      {filterList?.map((story) => (
        <KanbanItem
          key={story.id}
          story={story}
          handleDragDrop={handleDragDrop}
          dragRef={dragRef}
          dragCategory={dragCategory}
          dragOverRef={dragOverRef}
          dragOverCategory={dragOverCategory}
        />
      ))}
      {category === 'TODO' && <KanbanAddBtn />}
    </Styled.Column>
  );
};

export default KanbanColumn;
