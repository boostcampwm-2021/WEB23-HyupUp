import React, { useState } from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { updateStoryWithId } from '@/lib/api/story';
import { StatusType, KanbanType, dragCategoryType } from '@/types/story';
import { useStoryDispatch, useStoryState } from '@/lib/hooks/useContextHooks';

const isEqualCategory = (draggingCategory: dragCategoryType, dropCategory: StatusType) => {
  return draggingCategory.current === dropCategory;
};

const KanbanColumn = ({
  category,
  draggingRef,
  dragOverRef,
  draggingCategory,
  dragOverCategory,
}: KanbanType) => {
  const [isTopEnter, setTopEnter] = useState(false);
  const dispatchStory = useStoryDispatch();
  const storyList = useStoryState();
  const filterList = storyList
    .filter((item) => item.status === category)
    .sort((a, b) => Number(a.order) - Number(b.order));

  const handleDragDrop = async (category: StatusType) => {
    // 동일한 칼럼 내의 최상단
    if (isTopEnter && isEqualCategory(draggingCategory, category)) {
      const toBeChangeItem = filterList.find((v) => v.order === draggingRef.current);
      const firstnSecondItem = filterList
        .sort((a, b) => Number(a.order) - Number(b.order))
        .slice(0, 2);
      const averageOrder = firstnSecondItem.length > 1 ? Number(firstnSecondItem[1].order) / 2 : 1;

      if (!toBeChangeItem) return;
      dispatchStory({
        type: 'UPDATE_STORY',
        story: { ...toBeChangeItem, order: 0 },
      });
      dispatchStory({
        type: 'UPDATE_STORY',
        story: { ...firstnSecondItem[0], order: averageOrder },
      });
      await updateStoryWithId({ ...toBeChangeItem, order: 0 });
      await updateStoryWithId({ ...firstnSecondItem[0], order: averageOrder });
      setTopEnter((isTopEnter) => !isTopEnter);
      draggingRef.current = null;
      dragOverRef.current = null;
      return;
    }

    // 동일한 컬럼 내의 Item 사이 또는 최하단
    if (!isTopEnter && isEqualCategory(draggingCategory, category)) {
      const toBeChangeItem = filterList.find((v) => v.order === draggingRef.current);
      const dragOverOrderList = filterList
        .map((v) => Number(v.order))
        .filter((v) => v >= Number(dragOverRef.current))
        .slice(0, 2);
      const orderSum = dragOverOrderList.reduce((prev, cur) => prev + cur, 0);
      const avgOrderSum = dragOverOrderList.length > 1 ? orderSum / 2 : orderSum + 1;

      if (!toBeChangeItem) return;
      dispatchStory({ type: 'UPDATE_STORY', story: { ...toBeChangeItem, order: avgOrderSum } });
      await updateStoryWithId({ ...toBeChangeItem, order: avgOrderSum });
      draggingRef.current = null;
      dragOverRef.current = null;
      return;
    }

    // 다른 칼럼 내에 Item 이 위치 && Item 사이 또는 최하단
    if (!isTopEnter && !isEqualCategory(draggingCategory, category)) {
      const toBeChangeItem = storyList
        .filter((v) => v.status === draggingCategory.current)
        .find((v) => v.order === draggingRef.current);
      const dragOverOrderList = filterList
        .map((v) => Number(v.order))
        .filter((v) => v >= Number(dragOverRef.current))
        .slice(0, 2);
      const orderSum = dragOverOrderList.reduce((prev, cur) => prev + cur, 0);
      const avgOrderSum = dragOverOrderList.length > 1 ? orderSum / 2 : orderSum + 1;
      if (!toBeChangeItem) return;
      dispatchStory({
        type: 'UPDATE_STORY',
        story: { ...toBeChangeItem, status: category, order: avgOrderSum },
      });
      await updateStoryWithId({ ...toBeChangeItem, status: category, order: avgOrderSum });
      draggingRef.current = null;
      dragOverRef.current = null;
      return;
    }

    // 다른 칼럼 내애 Item 위치 && 최상단 위치
    if (isTopEnter && !isEqualCategory(draggingCategory, category)) {
      const toBeChangeItem = storyList
        .filter((v) => v.status === draggingCategory.current)
        .find((v) => v.order === draggingRef.current);
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
      draggingRef.current = null;
      dragOverRef.current = null;

      if (firstnSecondItem.length < 1) return;
      dispatchStory({
        type: 'UPDATE_STORY',
        story: { ...firstnSecondItem[0], order: averageOrder },
      });
      await updateStoryWithId({ ...firstnSecondItem[0], order: averageOrder });
      return;
    }
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
          draggingRef={draggingRef}
          draggingCategory={draggingCategory}
          dragOverRef={dragOverRef}
          dragOverCategory={dragOverCategory}
        />
      ))}
      {category === 'TODO' && <KanbanAddBtn />}
    </Styled.Column>
  );
};

export default KanbanColumn;
