import React, { useState } from 'react';
import Styled from '@/components/KanbanColumn/style';
import { KanbanItem, KanbanAddBtn } from '@/components';
import { updateStoryWithId } from '@/lib/api/story';
import { StatusType, KanbanType, dragCategoryType } from '@/types/story';
import { useStoryDispatch, useStoryState, useEpicState } from '@/lib/hooks/useContextHooks';
import { useRecoilValue } from 'recoil';
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
  const dispatchStory = useStoryDispatch();
  const epicState = useEpicState();
  const storyList = useStoryState();
  const recoilStoryList = useRecoilValue(storyListAtom);
  //TODO 만약 해당 기능이 필요하다면 recoilStoryList 를 storyList 로 변경하시면 사용가능합니다.
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
      dispatchStory({ type: 'UPDATE_STORY', story: firstItem });
      dispatchStory({ type: 'UPDATE_STORY', story: secondItem });
      await updateStoryWithId(firstItem);
      await updateStoryWithId(secondItem);
      setTopEnter((isTopEnter) => !isTopEnter);
      return;
    }

    if (isMoveToSameBetween()) {
      const item = dragToEqualBetween(filterList, dragRef, dragOverRef);
      dispatchStory({ type: 'UPDATE_STORY', story: item });
      await updateStoryWithId(item);
      return;
    }

    if (isMoveToDiffBetween()) {
      const item = dragToDiffBetween(storyList, category, dragCategory, dragRef, dragOverRef);
      dispatchStory({ type: 'UPDATE_STORY', story: item });
      await updateStoryWithId(item);
      return;
    }

    if (isMoveToDiffTop()) {
      const { firstItem, secondItem } = dragToDiffTop(storyList, category, dragCategory, dragRef);
      dispatchStory({ type: 'UPDATE_STORY', story: firstItem });
      await updateStoryWithId(firstItem);
      setTopEnter((isTopEnter) => !isTopEnter);
      if (Object.keys(secondItem).length < 2) return;
      dispatchStory({ type: 'UPDATE_STORY', story: secondItem });
      await updateStoryWithId(secondItem);
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
