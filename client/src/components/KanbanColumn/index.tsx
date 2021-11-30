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
import { useSocketSend } from '@/lib/hooks';
import produce from 'immer';

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
  const [storyList, setStoryList] = useRecoilState(storyListAtom);
  const filterList = storyList
    ?.filter((item) => item.status === category)
    .sort((a, b) => Number(a.order) - Number(b.order));

  const epicState = useEpicState();
  const [isTopEnter, setTopEnter] = useState(false);

  const emitUpdateStory = useSocketSend('UPDATE_STORY');
  const isMoveToSameTop = () => isTopEnter && isEqualCategory(dragCategory, category);
  const isMoveToSameBetween = () => !isTopEnter && isEqualCategory(dragCategory, category);
  const isMoveToDiffTop = () => isTopEnter && !isEqualCategory(dragCategory, category);
  const isMoveToDiffBetween = () => !isTopEnter && !isEqualCategory(dragCategory, category);

  const handleDragDrop = async (category: StatusType) => {
    if (!filterList) return;

    if (isMoveToSameTop()) {
      const { firstItem, secondItem } = dragToEqualTop(filterList, dragRef);
      // setStoryList((prev) =>
      //   produce(prev, (draft) => {
      //     [
      //       ...draft.filter((v) => v.id !== firstItem.id && v.id !== secondItem.id),
      //       firstItem,
      //       secondItem,
      //     ];
      //   }),
      // );
      setStoryList((prev) => [
        ...prev.filter((v) => v.id !== firstItem.id && v.id !== secondItem.id),
        firstItem,
        secondItem,
      ]);

      await updateStoryWithId(firstItem);
      await updateStoryWithId(secondItem);
      emitUpdateStory(firstItem.id);
      emitUpdateStory(secondItem.id);
      setTopEnter((isTopEnter) => !isTopEnter);

      return;
    }

    if (isMoveToSameBetween()) {
      const item = dragToEqualBetween(filterList, dragRef, dragOverRef);
      // setStoryList((prev) =>
      //   produce(prev, (draft) => {
      //     [...draft.filter((v) => v.id !== item.id), item];
      //   }),
      // );
      setStoryList((prev) => [...prev.filter((v) => v.id !== item.id), item]);

      await updateStoryWithId(item);
      emitUpdateStory(item.id);
      setTopEnter(false);
      return;
    }

    if (isMoveToDiffBetween()) {
      const item = dragToDiffBetween(storyList, category, dragCategory, dragRef, dragOverRef);
      // setStoryList((prev) =>
      //   produce(prev, (draft) => {
      //     [...draft.filter((v) => v.id !== item.id), item];
      //   }),
      // );
      setStoryList((prev) => [...prev.filter((v) => v.id !== item.id), item]);
      await updateStoryWithId(item);
      emitUpdateStory(item.id);
      setTopEnter(false);
      return;
    }

    if (isMoveToDiffTop()) {
      const { firstItem, secondItem } = dragToDiffTop(storyList, category, dragCategory, dragRef);

      if (Object.keys(secondItem).length > 1) {
        // setStoryList((prev) =>
        //   produce(prev, (draft) => {
        //     [
        //       ...draft.filter((v) => v.id !== firstItem.id && v.id !== secondItem.id),
        //       firstItem,
        //       secondItem,
        //     ];
        //   }),
        // );

        setStoryList((prev) => [
          ...prev.filter((v) => v.id !== firstItem.id && v.id !== secondItem.id),
          firstItem,
          secondItem,
        ]);

        await updateStoryWithId(firstItem);
        await updateStoryWithId(secondItem);
        emitUpdateStory(firstItem.id);
        emitUpdateStory(secondItem.id);
        setTopEnter(false);
      } else {
        // setStoryList((prev) =>
        //   produce(prev, (draft) => {
        //     [...draft.filter((v) => v.id !== firstItem.id), firstItem];
        //   }),
        // );
        setStoryList((prev) => [...prev.filter((v) => v.id !== firstItem.id), firstItem]);
        await updateStoryWithId(firstItem);
        emitUpdateStory(firstItem.id);
        setTopEnter(false);
      }
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
