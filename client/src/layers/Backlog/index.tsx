import React from 'react';
import BackLogItem from '@/components/BackLogItem';
import { useStoryState } from '@/lib/hooks/useContextHooks';
import * as S from './style';

const Backlog = () => {
  const stories = useStoryState();
  return (
    <S.Container>
      <S.Title>프로젝트 백로그</S.Title>
      <S.ItemContainer>
        {stories.map((el) => (
          <BackLogItem name={el.name} key={el.id} id={el.id} />
        ))}
      </S.ItemContainer>
    </S.Container>
  );
};

export default Backlog;
