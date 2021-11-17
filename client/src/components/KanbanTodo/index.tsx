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
  if (!array || array.length === 0) return 0;
  const id = Math.max(...array.map((v) => v.id));
  return id;
};

const KanbanTodo = ({ projectId }: KanbanProps) => {
  const storyArray = useStoryState();
  const useDispatch = useStoryDispatch();
  const lastStoryId: number = extractLastID(storyArray);

  const [showModal, setShowModal] = useState(false);
  const [shouldDeleteKey, setDeleteKey] = useState(0);
  const storyObj = { id: lastStoryId + 1, name: '', status: 'TODO' };

  const useAddStory = () => {
    useDispatch({ type: 'ADD_STORY', story: storyObj });
    createStory({ ...storyObj, projectId });
  };

  const useDeleteStory = async () => {
    useDispatch({ type: 'REMOVE_STORY', id: shouldDeleteKey });
    await deleteStoryWitId(shouldDeleteKey);
  };

  return (
    <Styled.Column>
      <h4>To do</h4>
      {storyArray?.map((story) => (
        <KanbanItem
          key={story.id}
          story={story}
          storyObj={storyObj}
          setDeleteKey={setDeleteKey}
          setShowModal={setShowModal}
        />
      ))}
      <Button size={'large'} category={'cancel'} onClick={useAddStory}>
        Add Todo
      </Button>
      <Modal
        shouldConfirm
        title={'스토리를 삭제하시겠습니까?'}
        visible={showModal}
        onClose={() => setShowModal(false)}
        onClickCancel={() => setShowModal(false)}
        onClickOk={useDeleteStory}
      ></Modal>
    </Styled.Column>
  );
};

export default KanbanTodo;
