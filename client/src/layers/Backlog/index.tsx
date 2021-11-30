import React from 'react';
import BackLogItem from '@/components/BackLogItem';
import { useRecoilValue } from 'recoil';
import storyListAtom from '@/recoil/story';
import * as S from './style';

const Backlog = () => {
  const stories = useRecoilValue(storyListAtom);
  const filteredStories = stories.filter((el) => el.name !== '');
  return (
    <S.Container>
      <S.Title>프로젝트 백로그</S.Title>
      <S.ItemContainer>
        {filteredStories.map((el) => (
          <BackLogItem key={el.id} name={el.name as string} id={el.id as number} />
        ))}
      </S.ItemContainer>
    </S.Container>
  );
};

export default Backlog;
