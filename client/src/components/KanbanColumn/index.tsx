import React, { useState } from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { updateStoryWithId } from '@/lib/api/story';
import { StatusType, KanbanType, dragCategoryType } from '@/types/story';
import { useEpicState } from '@/lib/hooks/useContextHooks';
import { useRecoilState } from 'recoil';
import storyListAtom from '@/recoil/story/atom';
import {
  dragToDiffBetween,
  dragToEqualBetween,
  dragToEqualTop,
  dragToDiffTop,
} from '@/lib/utils/story';

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
  const epicState = useEpicState();
  const [recoilStoryList, setStoryList] = useRecoilState(storyListAtom);

  const filterList = recoilStoryList
    ?.filter((item) => item.status === category)
    .sort((a, b) => Number(a.order) - Number(b.order));

  const isMoveToSameTop = () => isTopEnter && isEqualCategory(dragCategory, category);
  const isMoveToSameBetween = () => !isTopEnter && isEqualCategory(dragCategory, category);
  const isMoveToDiffTop = () => isTopEnter && !isEqualCategory(dragCategory, category);
  const isMoveToDiffBetween = () => !isTopEnter && !isEqualCategory(dragCategory, category);

  const handleDragDrop = async (category: StatusType) => {
    if (!filterList) return;

    if (isMoveToSameTop()) {
      const { firstItem, secondItem } = dragToEqualTop(filterList, dragRef);
      setStoryList((prev) => [
        ...prev.filter((v) => v.id !== firstItem.id && v.id !== secondItem.id),
        firstItem,
        secondItem,
      ]);
      await updateStoryWithId(firstItem);
      await updateStoryWithId(secondItem);
      setTopEnter((isTopEnter) => !isTopEnter);
      return;
    }

    if (isMoveToSameBetween()) {
      const item = dragToEqualBetween(filterList, dragRef, dragOverRef);
      setStoryList((prev) => [...prev.filter((v) => v.id !== item.id), item]);
      await updateStoryWithId(item);
      return;
    }

    if (isMoveToDiffBetween()) {
      const item = dragToDiffBetween(recoilStoryList, category, dragCategory, dragRef, dragOverRef);
      setStoryList((prev) => [...prev.filter((v) => v.id !== item.id), item]);
      await updateStoryWithId(item);
      return;
    }

    if (isMoveToDiffTop()) {
      const { firstItem, secondItem } = dragToDiffTop(
        recoilStoryList,
        category,
        dragCategory,
        dragRef,
      );
      setTopEnter((isTopEnter) => !isTopEnter);
      if (Object.keys(secondItem).length > 1) {
        setStoryList((prev) => [
          ...prev.filter((v) => v.id !== firstItem.id && v.id !== secondItem.id),
          firstItem,
          secondItem,
        ]);
        await updateStoryWithId(firstItem);
        await updateStoryWithId(secondItem);
      } else {
        setStoryList((prev) => [...prev.filter((v) => v.id !== firstItem.id), firstItem]);
        await updateStoryWithId(firstItem);
      }
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
          epic={epicState.find((v) => v.id === story.epicId)}
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
