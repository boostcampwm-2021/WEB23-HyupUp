import React, { useState, useRef } from 'react';
import Styled from '@/components/KanbanTodo/style';
import { StoryType } from '@/types/story';
import { deleteStoryWitId } from '@/lib/api/story';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { Modal } from '@/lib/design';
import { KanbanItem, KanbanAddBtn } from '@/components';

type KanbanProps = {
  projectId?: number;
};

const extractLastID = (array: Array<StoryType>): number => {
  if (!array?.length) return 0;
  return Math.max(...array.map((v) => v.id));
};

const KanbanTodo = ({ projectId }: KanbanProps) => {
  const storyArray = useStoryState();
  const dispatchStory = useStoryDispatch();
  const lastStoryId = extractLastID(storyArray);
  const [showModal, setShowModal] = useState(false);
  const [shouldDeleteKey, setDeleteKey] = useState(0);
  const draggingItem = useRef(0);
  const dragoverItem = useRef(0);

  const deleteStory = async () => {
    dispatchStory({ type: 'REMOVE_STORY', id: shouldDeleteKey });
    await deleteStoryWitId(shouldDeleteKey);
  };

  const handleDragStart = (e: React.SyntheticEvent<HTMLElement>, position: number) => {
    draggingItem.current = position;
    console.log(e);
  };

  const handleDragEnter = (e: React.SyntheticEvent<HTMLElement>, position: number) => {
    dragoverItem.current = position;
    const listCopy = [...storyArray];
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragoverItem.current, 0, draggingItemContent);

    draggingItem.current = dragoverItem.current;
    dispatchStory({ type: 'LOAD_STORY', stories: listCopy });
    // dragoverItem.current = null;
  };

  return (
    <Styled.Column>
      <h4>To do</h4>
      {storyArray?.map((story) => (
        <KanbanItem
          key={story.id}
          story={story}
          setDeleteKey={setDeleteKey}
          setShowModal={setShowModal}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
        />
      ))}
      <KanbanAddBtn lastStoryId={lastStoryId} projectId={projectId} />
      <Modal
        shouldConfirm
        title={'스토리를 삭제하시겠습니까?'}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onClickCancel={() => setShowModal(false)}
        onClickOk={deleteStory}
      />
    </Styled.Column>
  );
};

export default KanbanTodo;
