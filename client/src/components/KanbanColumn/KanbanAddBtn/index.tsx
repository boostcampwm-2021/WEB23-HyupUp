import React from 'react';
import { useRecoilValue } from 'recoil';
import userAtom from '@/recoil/user';
import { postStory } from '@/lib/api/story';
import { Button } from '@/lib/design';
import { useRecoilState } from 'recoil';
import storyListAtom from '@/recoil/story/atom';
import { useSocketSend } from '@/lib/hooks';
import StyledButtonWrapper from './style';
import produce from 'immer';

const initialItem = {
  order: 0,
  name: '',
  status: 'TODO',
  projectId: null,
  epicId: null,
};

const KanbanAddBtn = () => {
  const [storyList, setStoryList] = useRecoilState(storyListAtom);
  const userState = useRecoilValue(userAtom);
  const emitNewStory = useSocketSend('NEW_STORY');
  const orderList = storyList.filter((item) => item.status === 'TODO').map((v) => Number(v.order));
  const listLargestOrder = orderList.length ? Math.max(...orderList) + 1 : 0;

  const addStory = async () => {
    const id = await postStory({
      ...initialItem,
      order: listLargestOrder,
      projectId: userState.currentProjectId,
    });

    setStoryList((prev) =>
      produce(prev, (draft) => {
        draft.push({
          ...initialItem,
          order: listLargestOrder,
          projectId: userState.currentProjectId,
          id: id,
        });
      }),
    );

    emitNewStory(id);
  };

  return (
    <StyledButtonWrapper>
      <Button size={'large'} category={'cancel'} onClick={addStory}>
        + Add Todo
      </Button>
    </StyledButtonWrapper>
  );
};

export default KanbanAddBtn;
