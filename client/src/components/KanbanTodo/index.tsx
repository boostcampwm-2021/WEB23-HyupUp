import React, { useState } from 'react';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { createStory, deleteStoryWitId } from '@/lib/api/story';
import Styled from '@/components/KanbanTodo/style';
import { Button, Modal } from '@/lib/design';
import { KanbanItem } from '@/components';
import { StoryType } from '@/types/story';

interface KanbanProps {
  projectId?: number;
}

const extractLastID = (array: Array<StoryType>) => {
  if (!array?.length) return 0;
  return Math.max(...array.map((v) => v.id));
};

const KanbanTodo = ({ projectId }: KanbanProps) => {
  const storyArray = useStoryState();
  const dispatchStory = useStoryDispatch();
  const lastStoryId: number = extractLastID(storyArray);

  const [showModal, setShowModal] = useState(false);
  const [shouldDeleteKey, setDeleteKey] = useState(0);
  const initStoryData = { id: lastStoryId + 1, name: '', status: 'TODO' };

  const addStory = () => {
    dispatchStory({ type: 'ADD_STORY', story: initStoryData });
    createStory({ ...initStoryData, projectId });
  };

  const deleteStory = async () => {
    dispatchStory({ type: 'REMOVE_STORY', id: shouldDeleteKey });
    await deleteStoryWitId(shouldDeleteKey);
  };

  return (
    <Styled.Column>
      <h4>To do</h4>
      {storyArray?.map((story) => (
        <KanbanItem
          draggable
          key={story.id}
          story={story}
          initStoryData={initStoryData}
          setDeleteKey={setDeleteKey}
          setShowModal={setShowModal}
        />
      ))}
      <Button size={'large'} category={'cancel'} onClick={addStory}>
        Add Todo
      </Button>
      <Modal
        shouldConfirm
        title={'스토리를 삭제하시겠습니까?'}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onClickCancel={() => setShowModal(false)}
        onClickOk={deleteStory}
      ></Modal>
    </Styled.Column>
  );
};

export default KanbanTodo;
