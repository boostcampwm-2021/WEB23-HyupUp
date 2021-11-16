import React from 'react';
import BackLogItem from '@/components/BackLogItem';
import { useStoryState } from '@/lib/hooks/useContextHooks';
import * as S from './style';

const Backlog = () => {
  const stories = useStoryState();
  return (
    <S.ItemContainer>
      {stories.map((el) => (
        <BackLogItem name={el.name} key={el.id} />
      ))}
    </S.ItemContainer>
  );
};

export default Backlog;
