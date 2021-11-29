import React, { useRef } from 'react';
import Styled from '@/layers/Kanban/style';
import KanbanColumn from '@/components/KanbanColumn';
import KanbanModal from '@/components/KanbanColumn/KanbanDeleteModal';
import { StatusType } from '@/types/story';
import { useSocketReceive } from '@/lib/hooks';
import { getStoryById } from '@/lib/api/story';
import { useRecoilState } from 'recoil';
import storyListAtom from '@/recoil/story/atom';

const Kanban = () => {
  const dragRef = useRef<number | null>(0);
  const dragOverRef = useRef<number | null>(0);
  const dragCategory = useRef<StatusType>('TODO');
  const dragOverCateogry = useRef<StatusType>('TODO');
  const [storyList, setStoryList] = useRecoilState(storyListAtom);

  //TODO StorySelector로 상태 수정
  useSocketReceive('NEW_STORY', async (storyId: number) => {
    const data = await getStoryById(storyId);
    if (!data) return;
    setStoryList((prev) => [...prev, data]);
  });

  useSocketReceive('DELETE_STORY', async (storyId: number) => {
    if (!storyList.find((story) => story.id === storyId)) {
      setStoryList(storyList);
    } else {
      setStoryList((prev) => [...prev.filter((story) => story.id !== storyId)]);
    }
  });

  useSocketReceive('UPDATE_STORY', async (storyId: number) => {
    const data = await getStoryById(storyId);
    console.log(data);
    if (!data) return;
    setStoryList((prev) => [...prev.filter((story) => story.id !== storyId), data]);
  });

  return (
    <KanbanModal>
      <Styled.Container>
        <Styled.Title>프로젝트 칸반보드</Styled.Title>
        <Styled.ColumnContainer>
          {[
            { category: 'TODO', id: 0 },
            { category: 'IN_PROGRESS', id: 1 },
            { category: 'DONE', id: 2 },
          ].map((value) => (
            <KanbanColumn
              key={value.id}
              category={value.category as StatusType}
              dragRef={dragRef}
              dragOverRef={dragOverRef}
              dragCategory={dragCategory}
              dragOverCategory={dragOverCateogry}
            />
          ))}
        </Styled.ColumnContainer>
      </Styled.Container>
    </KanbanModal>
  );
};

export default Kanban;
