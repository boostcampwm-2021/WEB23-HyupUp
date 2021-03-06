import React from 'react';
import KanbanModalTitleWrapper from './style';
import { useInput } from '@/lib/hooks';
import { StoryType } from '@/types/story';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updateStoryWithId } from '@/lib/api/story';
import storyListAtom from '@/recoil/story';
import { useSocketSend } from '@/lib/hooks';
import producer from 'immer';
import userAtom from '@/recoil/user';
import { checkStringInput } from '@/lib/utils/bytes';
import { errorMessage } from '@/lib/common/message';
import { toast } from 'react-toastify';

const KanbanModalTitle = ({ story }: { story: StoryType }) => {
  const { value, onChange } = useInput(story?.name);
  const setStoryListState = useSetRecoilState(storyListAtom);
  const emitUpdateStory = useSocketSend('UPDATE_STORY');
  const userState = useRecoilValue(userAtom);

  const handleInputChange = async () => {
    if (!checkStringInput(value)) {
      toast.error(errorMessage.STORY_TITLE_LENGTH_LIMIT);
      return;
    }

    setStoryListState((prev) =>
      producer(prev, (draft) => [
        ...draft.filter((v) => v.id !== story.id),
        { ...story, name: value },
      ]),
    );

    await updateStoryWithId({ ...story, name: value });
    emitUpdateStory(story.id, userState.currentProjectId);
  };

  return (
    <KanbanModalTitleWrapper>
      <input
        type="text"
        value={value}
        placeholder={'클릭하여 스토리 이름을 작성하세요'}
        onBlur={() => handleInputChange()}
        onChange={onChange}
      />
    </KanbanModalTitleWrapper>
  );
};

export default KanbanModalTitle;
