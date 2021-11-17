import React, { MutableRefObject } from 'react';
import Styled from '@/components/KanbanItem/style';
import { StoryType } from '@/types/story';
import { useStoryDispatch } from '@/lib/hooks/useContextHooks';
import { useInput } from '@/lib/hooks';
import { updateStoryWithName } from '@/lib/api/story';

interface KanbanItem {
  story: StoryType;
  setDeleteKey(arg: number): void;
  setShowModal(arg: boolean): void;
}

const KanbanItem = (props: KanbanItem) => {
  const { story, setDeleteKey, setShowModal } = props;
  const { key, value, onChange } = useInput('');
  const dispatchStory = useStoryDispatch();

  const useUpdateStoryName = () => {
    dispatchStory({ type: 'UPDATE_STORY', story: { status: 'TODO', id: key, name: value } });
    updateStoryWithName({ status: 'TODO', id: key, name: value });
  };

  return (
    <Styled.KanBanItem draggable>
      <input
        type="text"
        placeholder={story.name ? story.name : 'type a todo...'}
        data-key={story.id}
        onChange={onChange}
        onBlur={useUpdateStoryName}
      />
      <Styled.CancelIcon
        onClick={() => {
          setShowModal(true);
          setDeleteKey(story.id);
        }}
      ></Styled.CancelIcon>
    </Styled.KanBanItem>
  );
};

export default KanbanItem;
