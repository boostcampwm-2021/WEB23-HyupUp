import React, { useState } from 'react';
import { useStoryState, useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { createStory, updateStoryWithName } from '@/lib/api/story';
import useInput from '@/lib/hooks/useInput';
import Styled from '@/components/KanbanTodo/style';
import Button from '@/lib/design/Button';
import Modal from '@/lib/design/Modal';
import { StoryType } from '@/types/story';

interface KanbanProps {
  projectId?: number;
}

const extractLastID = (array: Array<StoryType>) => {
  if (array.length === 0) return 0;
  return array.sort((a, b) => b.id - a.id)[0].id;
};

const KanbanTodo = ({ projectId }: KanbanProps) => {
  const storyArray = useStoryState();
  const useDispatch = useStoryDispatch();
  const [key, value, handleChange] = useInput();
  const [showModal, setShowModal] = useState(false);

  const lastStoryId = extractLastID(storyArray);

  console.log(lastStoryId);
  const StoryObject: StoryType = {
    id: lastStoryId + 1,
    name: '',
    status: 'TODO',
  };

  const useAddStory = () => {
    useDispatch({ type: 'ADD_STORY', story: StoryObject });
    createStory({ ...StoryObject, projectId });
  };

  const useUpdateStoryName = () => {
    useDispatch({ type: 'UPDATE_STORY', story: { ...StoryObject, id: key, name: value } });
    updateStoryWithName({ ...StoryObject, id: key, name: value });
  };

  return (
    <Styled.Column>
      <h4>To do</h4>
      {storyArray?.map((story) => {
        return (
          <Styled.KanBanItem key={story.id}>
            <input
              type="text"
              placeholder={story.name ? story.name : 'type a todo...'}
              data-key={story.id}
              onChange={handleChange}
              onBlur={useUpdateStoryName}
            />
            <Styled.CancelIcon onClick={() => setShowModal(true)}></Styled.CancelIcon>
          </Styled.KanBanItem>
        );
      })}
      <Button size={'large'} category={'cancel'} onClick={useAddStory}>
        Add Todo
      </Button>
      <Modal
        shouldConfirm
        title={'스토리를 삭제하시겠습니까?'}
        visible={showModal}
        onClickCancel={() => console.log('cancel!')}
        onClickOk={() => console.log('ok!')}
        onClose={() => setShowModal(false)}
      ></Modal>
    </Styled.Column>
  );
};

export default KanbanTodo;
