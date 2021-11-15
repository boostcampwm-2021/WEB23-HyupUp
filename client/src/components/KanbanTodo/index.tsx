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

const KanbanTodo = ({ projectId }: KanbanProps) => {
  const storyArray = useStoryState();
  const useDispatch = useStoryDispatch();
  const [key, value, handleChange] = useInput();
  const [showModal, setShowModal] = useState(false);

  const lastStoryId = storyArray.length > 0 ? storyArray[storyArray.length - 1]?.id : 0;
  const StoryObject: StoryType = {
    id: lastStoryId + 1,
    name: '',
    status: 'TODO',
  };

  const useAddStory = () => {
    useDispatch({ type: 'ADD_STORY', story: StoryObject });
    createStory({ ...StoryObject, projectId });
  };

  const useUpdateStory = () => {
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
              onBlur={useUpdateStory}
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
